import { callAsync } from '@/hooks/useAsync';
import { apiPaths } from "@/utils/apiPaths";
import { useQuery } from '@tanstack/react-query';
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

export const useSbus = () => {
  return useQuery<number>({
    queryKey: ["sbus"],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<number>>(() => api.get(apiPaths.sbus()));
      return response.data
    },
  });
}