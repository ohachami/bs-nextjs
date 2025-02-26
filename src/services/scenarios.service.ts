import { Scenario } from '@/types/scenario';
import { apiPaths } from '@/utils/apiPaths';
import { useQuery } from '@tanstack/react-query';
import { callApi } from '@/hooks/useApi';

export const useScenarios = () => {
  return useQuery<Scenario[]>({
    queryKey: ['scenarios'],
    queryFn: async () => {
      return await callApi<Scenario[]>({
        method: 'GET',
        url: apiPaths.scenarios(),
      });
    },
  });
};
