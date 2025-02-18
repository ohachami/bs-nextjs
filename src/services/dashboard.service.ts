import { callAsync } from '@/hooks/useAsync';
import { apiPaths } from '@/utils/apiPaths';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import api from '@/api';
import { SubSteps } from '@/types/exercise';
import { ChartIF } from '@/types/dashboard';

export const useSections = (stepId: string | undefined) => {
  return useQuery<SubSteps[]>({
    queryKey: ['sections', stepId],
    queryFn: async () => {
      if (!stepId) {
        throw new Error('stepId is required'); // Prevents unnecessary API calls
      }
      const response = await callAsync<AxiosResponse<SubSteps[]>>(() =>
        api.get(apiPaths.dashboardSections(stepId))
      );
      return response.data;
    },
    enabled: Boolean(stepId), // Ensures query runs only when stepId is available
  });
};

export const useChartList = (sectionId: string | undefined) => {
  return useQuery<ChartIF[]>({
    queryKey: ['steps', sectionId],

    queryFn: async () => {
      if (!sectionId) {
        throw new Error('stepId is required'); // Prevents unnecessary API calls
      }
      const response = await callAsync<AxiosResponse<ChartIF[]>>(() =>
        api.get(apiPaths.chartList(sectionId))
      );
      return response.data;
    },
    enabled: Boolean(sectionId), // Ensures query runs only when stepId is available
  });
};
