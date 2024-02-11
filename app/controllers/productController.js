import * as ProductModel from "../models/productModels.js";

export const createProduct = async (req, res) => {
  try {
    const newProduct = await ProductModel.createProduct(req.body);
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    const product = await ProductModel.getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const updatedProduct = await ProductModel.updateProduct(
      productId,
      req.body
    );
    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const deletedProduct = await ProductModel.deleteProduct(productId);
    res.json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
