import { callApi } from '@/hooks/useApi';
import { GroupedData, QueryDefinition } from '@/types/dashboard';
import { apiPaths } from '@/utils/apiPaths';
import { useQuery } from '@tanstack/react-query';

export const useAggregations = (aggQuery: QueryDefinition) => {
  return useQuery<GroupedData>({
    queryKey: ['aggregations', aggQuery],
    queryFn: async () => {
      return await callApi<GroupedData>({
        method: 'POST',
        url: apiPaths.aggregations(),
        data: aggQuery,
      });
    },
    enabled: Boolean(aggQuery && Object.keys(aggQuery).length > 0),
  });
};
