import * as CartModel from "../models/cartModels.js";

export const createCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const newCart = await CartModel.createCart(userId);
    res
      .status(201)
      .json({ message: "Cart created successfully", cart: newCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create cart" });
  }
};

export const getCartByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await CartModel.getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

export const deleteCartByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const deletedCart = await CartModel.deleteCartByUserId(userId);
    if (!deletedCart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete cart" });
  }
};
