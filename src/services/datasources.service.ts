import { callApi } from '@/hooks/useApi';
import { DataSourceIF } from '@/types/collect/datasources';
import { apiPaths } from '@/utils/apiPaths';
import { useQuery } from '@tanstack/react-query';

/**
 * Fetching the list of datasources for a given sbuId
 * @param sbuId: a string representing the sbu ID
 * @returns the list of datasources for a given sbu ID
 */
export const useDataSourceHierarchy = (sbuId: string) => {
  return useQuery<DataSourceIF[]>({
    queryKey: ['datasources', sbuId],
    queryFn: async () => {
      return await callApi<DataSourceIF[]>({
        method: 'GET',
        url: apiPaths.datasources(sbuId),
      });
    },
    // only run the query if the sbuId is provided
    enabled: !!sbuId,
  });
};
