import prisma from "../prisma.js";

export const createUser = async (userData) => {
  return prisma.user.create({ data: userData });
};

export const getUserById = async (userId) => {
  return prisma.user.findUnique({ where: { id: userId } });
};

export const getAllUsers = async () => {
  return prisma.user.findMany();
};

export const getUserByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email: email } });
};

export const updateUserToken = async (userId, token) => {
  return prisma.user.update({
    where: { id: userId },
    data: { token },
  });
};
