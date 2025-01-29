import { callAsync } from "@/hooks/useAsync";
import { Period } from "@/types/config";
import { BASE_API } from "@/utils/routes";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const usePeriodsTree = () => {
    return useQuery({
      queryKey: ["periods", "tree"],
      queryFn: async () => {
        const response = await callAsync<AxiosResponse<Period[]>>(() => axios.get(`${BASE_API}/config/periods`));
        return response.data && response.data.length > 0 ? response.data[0] : null
      },
    });
  };