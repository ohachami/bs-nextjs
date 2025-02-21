import api from "@/api";
import { callAsync } from "@/hooks/useAsync";
import { User } from "@/types/user";
import { apiPaths } from "@/utils/apiPaths";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<User>>(() => api.get(apiPaths.currentUser()));
      return response.data;
    },
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await callAsync(() => api.get(`/users`));
      return response.data;
    },
  });
};
