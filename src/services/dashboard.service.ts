import { DashboardWrapperItem } from '@/components/sections/DashboardWrapper';
import { callAsync } from '@/hooks/useAsync';
import { apiPaths } from '@/utils/apiPaths';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '@/api';

export const useSections = (stepId: string | undefined) => {
  return useQuery<DashboardWrapperItem[]>({
    queryKey: ['sections', stepId],
    queryFn: async () => {
      if (!stepId) {
        throw new Error('stepId is required'); // Prevents unnecessary API calls
      }
      const response = await callAsync<AxiosResponse<DashboardWrapperItem[]>>(
        () => api.get(apiPaths.dashboardSections(stepId))
      );
      return response.data;
    },
    enabled: Boolean(stepId), // Ensures query runs only when stepId is available
  });
};

export const useChartList = (sectionId: string | undefined) => {
  return useQuery<DashboardWrapperItem[]>({
    queryKey: ['sections', sectionId],
    queryFn: async () => {
      if (!sectionId) {
        throw new Error('stepId is required'); // Prevents unnecessary API calls
      }
      const response = await callAsync<AxiosResponse<DashboardWrapperItem[]>>(
        () => api.get(apiPaths.dashboardSections(sectionId))
      );
      return response.data;
    },
    enabled: Boolean(sectionId), // Ensures query runs only when stepId is available
  });
};
