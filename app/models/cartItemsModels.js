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

export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const updatedCartItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: quantity },
    });
    return updatedCartItem;
  } catch (error) {
    throw error;
  }
};
