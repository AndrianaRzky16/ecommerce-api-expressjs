import prisma from "../prisma.js";

export const createCartItem = async (cartId, productId, quantity) => {
  try {
    const newCartItem = await prisma.cartItem.create({
      data: {
        cartId: cartId,
        productId: productId,
        quantity: quantity,
      },
    });

    return newCartItem;
  } catch (error) {
    throw error;
  }
};

export const getCartItemById = async (cartItemId) => {
  return prisma.cartItem.findUnique({ where: { id: cartItemId } });
};

export const deleteCartItemById = async (cartItemId) => {
  return prisma.cartItem.delete({ where: { id: cartItemId } });
};
