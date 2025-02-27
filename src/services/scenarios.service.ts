import { Scenario } from '@/types/scenario';
import { apiPaths } from '@/utils/apiPaths';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useCloneScenario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      scenarioId,
      name,
    }: {
      scenarioId: string;
      name: string;
    }) => {
      return callApi<void>({
        method: 'POST',
        url: apiPaths.cloneScenario(scenarioId),
        data: { name },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scenarios'] });
    },
    onError: (error) => {
      // TODO: Add error handling logic
      console.error('Failed to clone scenario:', error);
    },
  });
};
