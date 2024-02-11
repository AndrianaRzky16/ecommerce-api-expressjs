import prisma from "../prisma.js";

export const createProduct = async (productData) => {
  try {
    const newProduct = await prisma.product.create({ data: productData });
    return newProduct;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async () => {
  return prisma.product.findMany();
};

export const getProductById = async (productId) => {
  return prisma.product.findUnique({ where: { id: productId } });
};

export const updateProduct = async (productId, productData) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: productData,
    });
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });
    return deletedProduct;
  } catch (error) {
    throw error;
  }
};
