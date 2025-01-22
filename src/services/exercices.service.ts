import { callAsync } from "@/hooks/useAsync";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useExercicesCount = () => {
  return useQuery({
    queryKey: ["exercises", "count"],
    queryFn: async () => {
      const response = await callAsync(() => axios.get(`/api/exercices/count`));
      return response.data
    },
  });
};
