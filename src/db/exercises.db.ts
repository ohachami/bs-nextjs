import { Prisma } from "@prisma/client";
import { prisma } from "./baseDbService";

export const getCount = () => {
    return prisma.exercise.count()
};

export const getExercises = () => {
    return prisma.exercise.findMany({
        include: {
            user: true,
            period: true,
            exercise_step: {
                include: {
                    step_config: true,
                },
                orderBy: {
                    step_config: {
                        sorted_by: 'asc'
                    }
                }
            },
        },
    })
}

export type ExerciseDetailsPayload = Prisma.PromiseReturnType<typeof getExercises>