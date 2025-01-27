import { ExerciseDetailsPayload } from "@/db/exercises.db";
import { callAsync } from "@/hooks/useAsync";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  return useQuery<ExerciseDetailsPayload>({
    queryKey: ["exercises"],
    queryFn: async () => {
      const response = await callAsync(() => axios.get(`/api/exercises`));
      return response.data
    }
  })
}