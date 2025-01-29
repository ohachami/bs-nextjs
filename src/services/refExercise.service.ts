import { callAsync } from "@/hooks/useAsync";
import { ExerciseTypeIF, PeriodConfigIF } from "@/types/refExercise";
import { apiPaths } from "@/utils/apiPaths";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Fetching the list of exercise Types
 * @returns a list of exercise Types
 */
export const useExerciseTypes = () => {
    return useQuery<ExerciseTypeIF[]>({
        queryKey: ["exerciseTypes"],
        queryFn: async () => {
            const response = await callAsync(() => axios.get(apiPaths.exerciceTypes()));
            return response.data;
        }
    })
}

/**
 * Fetching the list of config for a given exercise
 * @param exerciseTypeId: a string representing the exercise ID
 * @returns the list of config for a given exercise ID
 */
export const usePeriodConfig = (exerciseTypeId: string) => {
    return useQuery<PeriodConfigIF[]>({
        queryKey: ["periodConfig", exerciseTypeId],
        queryFn: async () => {
            const response = await callAsync(() => axios.get(apiPaths.periodConfig(), {
                params: {
                    exerciseType: exerciseTypeId
                }
            }));
            return response.data;
        },
        // only run the query if the exerciseTypeId is provided
        enabled: !!exerciseTypeId,
    })
}