import api from "@/api";
import { callAsync } from "@/hooks/useAsync";
import { Exercise } from "@/types/exercise";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useExercisesCount = () => {
  return useQuery<number>({
    queryKey: ["exercises", "count"],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<number>>(() => api.get(`/exercises/count`));
      return response.data
    },
  });
};

export const useExercises = () => {
  return useQuery<{ closed: Exercise[], open: Exercise[] }>({
    queryKey: ["exercises"],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<Exercise[]>>(() => api.get(`/exercises`));
      return { closed: response.data.filter(ex => ex.status === 'CLOSED'), open: response.data.filter(ex => ex.status === 'IN_PROGRESS') }
    }
  })
}