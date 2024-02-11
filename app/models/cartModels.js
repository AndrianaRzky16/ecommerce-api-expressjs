import prisma from "../prisma.js";

export const createCart = async (userId) => {
  return prisma.cart.create({
    data: { userId },
  });
};

export const getCartByUserId = async (userId) => {
  return prisma.cart.findFirst({
    where: { userId },
    include: { cartItems: { include: { product: true } } },
  });
};

export const deleteCartByUserId = async (userId) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      return null;
    }

    await prisma.cart.delete({
      where: { id: cart.id },
    });

    return cart;
  } catch (error) {
    throw error;
  }
};
