import { ExerciseDetailsPayload } from '@/db/exercises.db';
import { callAsync } from '@/hooks/useAsync';
import { ExercisePayload } from '@/types/exercises/createExercise';
import { apiPaths } from '@/utils/apiPaths';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

export const useExercisesCount = () => {
  return useQuery({
    queryKey: ['exercises', 'count'],
    queryFn: async () => {
      const response = await callAsync(() => axios.get(`/api/exercises/count`));
      return response.data;
    },
  });
};

export const useExercises = () => {
  return useQuery<{
    closed: ExerciseDetailsPayload;
    open: ExerciseDetailsPayload;
  }>({
    queryKey: ['exercises'],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<ExerciseDetailsPayload>>(
        () => axios.get(`/api/exercises`)
      );
      return {
        closed: response.data.filter((ex) => ex.status === 'CLOSED'),
        open: response.data.filter((ex) => ex.status === 'IN_PROGRESS'),
      };
    },
  });
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
