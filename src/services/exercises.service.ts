import api from "@/api";
import { callAsync } from "@/hooks/useAsync";
import { Exercise } from "@/types/exercise";
import { apiPaths } from "@/utils/apiPaths";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

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
}