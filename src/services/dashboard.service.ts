import { callAsync } from '@/hooks/useAsync';
import { apiPaths } from "@/utils/apiPaths";
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from "@/api";

export const useSections = (stepId: string) => {
  return useQuery<number>({
    queryKey: ["sections"],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<number>>(() => api.get(apiPaths.dashboardSections(stepId)));
      return response.data
    },
  });
};
