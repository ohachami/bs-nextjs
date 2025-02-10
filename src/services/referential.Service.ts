import { callAsync } from '@/hooks/useAsync';
import { ExercisePayload } from '@/types/exercises/createExercise';
import { Exercise } from "@/types/exercise";
import { apiPaths } from "@/utils/apiPaths";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from "@/api";

export const useRegions = () => {
  return useQuery<number>({
    queryKey: ["regions"],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<number>>(() => api.get(apiPaths.regions()));
      return response.data
    },
  });
};

export const useProducts = () => {
  return useQuery<number>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<number>>(() => api.get(apiPaths.products()));
      return response.data
    },
  });
};
