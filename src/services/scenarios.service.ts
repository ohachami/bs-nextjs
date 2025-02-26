import { Scenario } from '@/types/scenario';

import api from '@/api';
import { callAsync } from '@/hooks/useAsync';
import { apiPaths } from '@/utils/apiPaths';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const useScenarios = () => {
  return useQuery<Scenario[]>({
    queryKey: ['scenarios'],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<Scenario[]>>(() =>
        api.get(apiPaths.scenarios())
      );
      return response.data;
    },
  });
};
