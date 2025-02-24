import { callApi } from '@/hooks/useApi';
import { Exercise } from "@/types/exercise";
import { ExercisePayload } from '@/types/exercises/createExercise';
import { apiPaths } from "@/utils/apiPaths";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useExercisesCount = () => {
  return useQuery<number>({
    queryKey: ["exercises", "count"],
    queryFn: async () => {
      return await callApi<number>({
        method: 'GET',
        url: apiPaths.exercisesCount(),
      });
    },
  });
};

export const useExercises = () => {
  return useQuery<Exercise[]>({
    queryKey: ["exercises"],
    queryFn: async () => {
      return await callApi<Exercise[]>({
        method: 'GET',
        url: apiPaths.exercises(),
      });
    }
  })
};

// create an exercise post request
export const useCreateExercise = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ExercisePayload>({
    mutationFn: async (exerciseData) => {
      return callApi<void>({
        method: 'POST',
        url: apiPaths.exercises(),
        data: exerciseData,
      });
    },
    onSuccess: () => {
      // Invalidate and refetch exercises query after successful creation
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
    onError: (error) => {
      // Optional: Add error handling logic
      console.error('Exercise creation failed:', error);
    },
  });
};