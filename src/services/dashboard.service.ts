import { callApi } from '@/hooks/useApi';
import { ChartIF } from '@/types/dashboard';
import { Section } from '@/types/exercise';
import { apiPaths } from '@/utils/apiPaths';
import { useQuery } from '@tanstack/react-query';

export const useSections = (stepId: string | undefined) => {
  return useQuery<Section[]>({
    queryKey: ['sections', stepId],
    queryFn: async () => {
      if (!stepId) {
        throw new Error('stepId is required'); // Prevents unnecessary API calls
      }
      return await callApi<Section[]>({
        method: 'GET',
        url: apiPaths.dashboardSections(stepId),
      });
    },
    enabled: Boolean(stepId), // Ensures query runs only when stepId is available
  });
};

export const useChartList = (sectionId: string | undefined) => {
  return useQuery<ChartIF[]>({
    queryKey: ['steps', sectionId],

    queryFn: async () => {
      if (!sectionId) {
        throw new Error('sectionId is required'); // Prevents unnecessary API calls
      }
      return await callApi<ChartIF[]>({
        method: 'GET',
        url: apiPaths.chartList(sectionId),
      });
    },
    enabled: Boolean(sectionId), // Ensures query runs only when stepId is available
  });
};
