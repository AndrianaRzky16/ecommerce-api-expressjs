import prisma from "../prisma.js";

export const createCart = async (userId) => {
  return prisma.cart.create({
    data: { userId },
  });
};

export const getCartByUserId = async (userId) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: { userId: userId },
      include: {
        cartItems: {
          include: { product: true },
        },
      },
    });
    return cart;
  } catch (error) {
    throw error;
  }
};

export const deleteCartByUserId = async (userId) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: { cartItems: true }, // Load cartItems along with cart
    });

    if (!cart) {
      return null;
    }

    if (!cart.cartItems) {
      // Return null if cartItems not found
      return null;
    }

    // Delete all cart items associated with this cart first
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    // Then, delete the cart itself
    await prisma.cart.delete({
      where: { id: cart.id },
    });

    return cart;
  } catch (error) {
    throw error;
  }
};
