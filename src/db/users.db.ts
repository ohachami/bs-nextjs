import { prisma } from "./baseDbService";

export const getUsers = () => {
  return prisma.user.findMany();
};
