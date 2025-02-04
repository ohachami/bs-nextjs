import { ExerciseDetailsPayload } from '@/db/exercises.db';
import { callAsync } from '@/hooks/useAsync';
import { ExercisePayload } from '@/types/exercises/createExercise';
import { Exercise } from "@/types/exercise";
import { apiPaths } from "@/utils/apiPaths";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import api from "@/api";

export const useExercisesCount = () => {
  return useQuery<number>({
    queryKey: ["exercises", "count"],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<number>>(() => api.get(apiPaths.exercisesCount()));
      return response.data
    },
  });
};

export const useExercises = () => {
  return useQuery<Exercise[]>({
    queryKey: ["exercises"],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<Exercise[]>>(() => api.get(apiPaths.exercises()));
      return response.data;
    }
  })
};

// create an exercise post request
export const useCreateExercise = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, Error, ExercisePayload>({
    mutationFn: async (exerciseData) => {
      return callAsync<AxiosResponse>(() =>
        axios.post(apiPaths.exercises(), exerciseData)
      );
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