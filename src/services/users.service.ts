import api from "@/api";
import { callAsync } from "@/hooks/useAsync";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await callAsync(() => api.get(`/users`));
      return response.data;
    },
  });
};
