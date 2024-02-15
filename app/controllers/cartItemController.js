import prisma from "../prisma.js";
import * as CartItemModel from "../models/cartItemsModels.js";

export const createCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartId = req.user.cartId;
    const newCartItem = await CartItemModel.createCartItem(
      cartId,
      productId,
      quantity
    );
    res.status(201).json({
      message: "Cart item created successfully",
      cartItem: newCartItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create cart item" });
  }
};

export const getCartItemsByCartId = async (req, res) => {
  try {
    const cartId = req.user.cartId;
    const cartItems = await CartItemModel.getCartItemsByCartId(cartId);
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};

// Fungsi untuk menghapus item keranjang berdasarkan cartItemId
export const deleteCartItem = async (req, res) => {
  try {
    const cartItemId = parseInt(req.params.id);
    const deletedCartItem = await CartItemModel.deleteCartItem(cartItemId);
    res.json({
      message: "Cart item deleted successfully",
      cartItem: deletedCartItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete cart item" });
  }
};

// Middleware untuk menetapkan cartId pada req.user
export const setCartId = (req, res, next) => {
  const getCartIdFromSomeSource = () => {
    if (req.body.cartId) {
      return req.body.cartId;
    }
    if (req.user) {
      return req.user.cartId;
    }
    return null;
  };
  let cartId = getCartIdFromSomeSource();

  // Tambahkan penanganan kesalahan jika cartId tidak valid
  if (!cartId) {
    return res.status(400).json({ error: "Cart ID is missing or invalid" });
  }

  req.user = { cartId };
  next();
};
