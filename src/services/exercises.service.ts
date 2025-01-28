import { ExerciseDetailsPayload } from "@/db/exercises.db";
import { callAsync } from "@/hooks/useAsync";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const useExercisesCount = () => {
  return useQuery({
    queryKey: ["exercises", "count"],
    queryFn: async () => {
      const response = await callAsync(() => axios.get(`/api/exercises/count`));
      return response.data
    },
  });
};

export const useExercises = () => {
  return useQuery<{ closed: ExerciseDetailsPayload, open: ExerciseDetailsPayload }>({
    queryKey: ["exercises"],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<ExerciseDetailsPayload>>(() => axios.get(`/api/exercises`));
      return { closed: response.data.filter(ex => ex.status === 'CLOSED'), open: response.data.filter(ex => ex.status === 'IN_PROGRESS') }
    }
  })
}