import { prisma } from "./baseDbService";

export const getCount = () => {
    return prisma.exercise.count()
};
