import { callApi } from "@/hooks/useApi";
import { User } from "@/types/user";
import { apiPaths } from "@/utils/apiPaths";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      return await callApi<User>({
        method: "GET",
        url: apiPaths.currentUser(),
      });
    },
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await callApi<User[]>({
        method: "GET",
        url: apiPaths.users(),
      });
    },
  });
};
