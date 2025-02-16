import { callAsync } from '@/hooks/useAsync';
import { apiPaths } from "@/utils/apiPaths";
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from "@/api";
import { ProductTypeIF, RefSbu, RegionTypeIF } from '@/types/refExercise/config';

export const useRegions = () => {
  return useQuery<RegionTypeIF[]>({
    queryKey: ["regions"],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<RegionTypeIF[]>>(() => api.get(apiPaths.regions()));
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

export const useProductTypes = () => {
  return useQuery<ProductTypeIF[]>({
    queryKey: ["productTypes"],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<ProductTypeIF[]>>(() => api.get(apiPaths.productTypes()));
      return response.data
    },
  });
};


export const useSbus = () => {
  return useQuery<RefSbu[]>({
    queryKey: ["sbus"],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<RefSbu[]>>(() => api.get(apiPaths.sbus()));
      return response.data
    },
  });
}