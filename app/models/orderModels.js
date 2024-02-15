import prisma from "../prisma.js";

export const create = async (userId, orderItems) => {
  try {
    const newOrder = await prisma.order.create({
      data: {
        user: {
          connect: { id: userId },
        },
        orderItems: {
          create: orderItems,
        },
        status: "Pending",
      },
    });

    return newOrder;
  } catch (error) {
    throw error;
  }
};

export const historyOrder = async (userId) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
    });

    return orders;
  } catch (error) {
    throw error;
  }
};

export const historyOrdersItems = async (userId) => {
  try {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        order: {
          userId: userId,
        },
      },
      include: {
        order: true,
      },
    });

    return orderItems;
  } catch (error) {
    throw error;
  }
};

export const historyPayment = async (userId) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        AND: [{ userId: userId }, { paymentStatus: "Paid" }],
      },
    });

    return orders;
  } catch (error) {
    throw error;
  }
};

export const getActiveOrder = async (userId) => {
  try {
    const activeOrder = await prisma.order.findFirst({
      where: {
        userId: userId,
        status: "Pending",
      },
    });

    return activeOrder;
  } catch (error) {
    throw error;
  }
};

export const updateOrderItemPaymentStatus = async (orderId) => {
  try {
    const orderItems = await historyOrdersItems(orderId);
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

export const getOrderById = async (orderId) => {
  try {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    return order;
  } catch (error) {
    throw error;
  }
};
