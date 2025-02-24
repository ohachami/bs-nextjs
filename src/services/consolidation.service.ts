import api from '@/api';
import { callAsync } from '@/hooks/useAsync';
import { ConsolidationVersionsIF, ExerciseConsolidationVersionsIF } from '@/types/consolidation';
import { apiPaths } from '@/utils/apiPaths';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

/**
 * Fetching the list of ConsolidationVersions for a given sbuId
 * PS: if no sbuId is given, we return consolidated data of the current user
 * @param sbuId: a string representing the sbu ID
 * @returns the list of ConsolidationVersions for a given sbu ID
 */
export const useConsolidationVersions = (sbuId?: string) => {
  return useQuery<ConsolidationVersionsIF[]>({
    queryKey: ['consolidation-versions', sbuId],
    queryFn: async () => {
      const response = await callAsync<
        AxiosResponse<ConsolidationVersionsIF[]>
      >(() => api.get(apiPaths.consolidationVersions(sbuId)));
      return response.data;
    },
    enabled: !!sbuId,
  });
};

/**
 * Fetching the list of ExerciseConsolidationVersions for a given sbuId
 * PS: if no exerciseId is given, we return all exercises hierarchy
 * @param sbuId: a string representing the sbu ID
 * @param sbuId: a string representing the exercise ID
 * @returns the list of ExerciseConsolidationVersions for a given sbu ID
 */
export const useExerciseConsolidationVersions = (sbuId: string, exerciseId?: string) => {
  return useQuery<ExerciseConsolidationVersionsIF[]>({
    queryKey: ['exercise-consolidation-versions', sbuId, exerciseId],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<ExerciseConsolidationVersionsIF[]>>(() =>
        api.get(apiPaths.consolidationHierarchy(sbuId, exerciseId))
      );
      return response.data;
    },
    // only run the query if the sbuId is provided
    enabled: !!sbuId,
  });
};
