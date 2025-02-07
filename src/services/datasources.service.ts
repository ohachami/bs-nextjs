import api from '@/api';
import { callAsync } from '@/hooks/useAsync';
import { DataSourceIF } from '@/types/collect/datasources';
import { apiPaths } from '@/utils/apiPaths';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

/**
 * Fetching the list of datasources for a given sbuId
 * @param sbuId: a string representing the sbu ID
 * @returns the list of datasources for a given sbu ID
 */
export const useDataSource = (sbuId: string) => {
  return useQuery<DataSourceIF[]>({
    queryKey: ['datasources', sbuId],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<DataSourceIF[]>>(() =>
        api.get(apiPaths.datasources(), {
          params: {
            sbuId,
          },
        })
      );
      return response.data;
    },
    // only run the query if the sbuId is provided
    enabled: !!sbuId,
  });
};