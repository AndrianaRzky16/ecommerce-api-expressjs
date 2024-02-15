import prisma from "../prisma.js";
import * as OrderModel from "../models/orderModels.js";
import * as CartModel from "../models/cartModels.js";
import * as CartItemModel from "../models/cartItemsModels.js";
import { processPayment } from "../middleware/validatePayment.js";
import { getProductById } from "../models/productModels.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id; // Dapatkan ID pengguna dari objek permintaan
    const cartId = req.body.cartId; // Dapatkan cartId dari objek permintaan

    // Periksa apakah cartId ada dalam permintaan
    if (!cartId) {
      return res
        .status(400)
        .json({ error: "CartId tidak ada dalam body permintaan" });
    }

    // Cek apakah keranjang ada dan milik pengguna yang sesuai
    const cart = await CartModel.getCartByUserId(userId);

    if (!cart) {
      return res.status(400).json({ error: "Keranjang tidak ditemukan" });
    }

    // Pastikan cartId yang diminta sesuai dengan cartId yang dimiliki oleh pengguna
    if (cart.id !== cartId) {
      return res.status(400).json({ error: "CartId tidak valid" });
    }

    // Periksa apakah keranjang memiliki item
    if (cart.cartItems.length === 0) {
      return res.status(400).json({ error: "Keranjang kosong" });
    }

    // Buat pesanan dengan item-item dari keranjang
    const orderItems = cart.cartItems.map((cartItem) => ({
      productId: cartItem.productId,
      quantity: cartItem.quantity,
    }));

    const newOrder = await OrderModel.create(userId, orderItems);

    // Berhasil membuat pesanan, kembalikan respons sukses
    res.status(201).json({ message: "Pesan berhasil dibuat", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal membuat pesanan" });
  }
};

export const createOrderItem = async (req, res) => {
  try {
    const { orderId, productId, quantity } = req.body;
    const userId = req.user.id;

    const cart = await CartModel.getCartByUserId(userId);

    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      return res.status(400).json({ error: "Cart items is empty" });
    }

    const existingCartItem = cart.cartItems.find(
      (item) => item.productId === productId
    );

    if (!existingCartItem) {
      const newOrderItem = await OrderItem.create(orderId, productId, quantity);
      return res.status(201).json({
        message: "Order item created successfully",
        orderItem: newOrderItem,
      });
    } else {
      existingCartItem.quantity -= quantity;

      if (existingCartItem.quantity <= 0) {
        await CartItemModel.deleteCartItemById(existingCartItem.id);
      } else {
        existingCartItem.quantity = Math.max(existingCartItem.quantity, 0);
        await CartItemModel.updateCartItem(
          existingCartItem.id,
          existingCartItem.quantity
        );
      }

      return res.status(200).json({
        message: "Order item Created successfully",
        cartItem: existingCartItem,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "ProductId not found in cart item" });
  }
};

export const createPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.body; // Ambil orderId dari body request

    // Periksa apakah orderId ada dalam permintaan
    if (!orderId) {
      return res
        .status(400)
        .json({ error: "OrderId tidak ada dalam body permintaan" });
    }

    // Dapatkan order berdasarkan orderId
    const order = await OrderModel.getOrderById(orderId);

    // Periksa apakah order ditemukan
    if (!order) {
      return res.status(400).json({ error: "Pesanan tidak ditemukan" });
    }

    // Periksa apakah order tersebut milik pengguna yang sesuai
    if (order.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Anda tidak memiliki akses untuk pesanan ini" });
    }

    // Proses pembayaran
    const paymentResult = processPayment(
      req.body.amount,
      req.body.cardNumber,
      req.body.cvv,
      req.body.expiryMonth,
      req.body.expiryYear
    );

    // Periksa apakah pembayaran berhasil
    if (!paymentResult.success) {
      throw new Error(paymentResult.error);
    }

    // Update status pembayaran order items menjadi "Paid"
    await OrderModel.updateOrderItemPaymentStatus(orderId);

    // Kembalikan respons sukses
    res.status(201).json({ message: "Pembayaran berhasil" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: error.message || "Gagal memproses pembayaran" });
  }
};

export const reduceCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await CartModel.getCartByUserId(userId);
    if (!cart) {
      return res.status(400).json({ error: "Keranjang tidak ditemukan" });
    }
    await CartItemModel.deleteCartItemById(cart.id);
    next(); // Melewatkan kendali ke middleware atau handler berikutnya
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengurangi cart item" });
  }
};

export const updateOrderItemPaymentStatus = async (orderId) => {
  try {
    const orderItems = await OrderModel.historyOrdersItems(orderId);
    for (const orderItem of orderItems) {
      await prisma.orderItem.update({
        where: { id: orderItem.id },
        data: { paymentStatus: "Paid" },
      });
    }
  } catch (error) {
    throw error;
  }
};

export const updateCartItemQuantity = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    const cart = await CartModel.getCartByUserId(userId);

    const existingCartItem = cart.cartItems.find(
      (item) => item.productId === productId
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await CartItemModel.updateCartItem(
        existingCartItem.id,
        existingCartItem.quantity
      );
      return res.status(200).json({
        message: "Cart item quantity updated successfully",
        cartItem: existingCartItem,
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update cart item quantity" });
  }
};

export const checkProductStock = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const product = await getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to validate stock" });
  }
};

export const updateOrderItemsStatus = async (userId) => {
  try {
    const orderItems = await OrderModel.historyOrdersItems(userId);

    for (const orderItem of orderItems) {
      await prisma.orderItem.update({
        where: { id: orderItem.id },
        data: { paymentStatus: "Paid" },
      });
    }
  } catch (error) {
    throw error;
  }
};

export const historyOrdersItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await OrderModel.historyOrder(userId);
    const orderItems = await OrderModel.historyOrdersItems(userId);

    const orderItemsWithPaymentStatus = orderItems.map((item) => ({
      ...item,
      paymentStatus: item.paymentStatus === "Paid" ? "Paid" : "Not Paid",
    }));

    res.status(200).json({
      success: "History order items success",
      orders: orders.map((order) => ({
        id: order.id,
        userId: order.userId,
      })),
      orderItems: orderItemsWithPaymentStatus,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch order items" });
  }
};

export const historyPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await OrderModel.historyPayment(userId);
    res.status(200).json({ success: "History payment success", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
