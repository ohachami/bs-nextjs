import { callApi } from '@/hooks/useApi';
import {
  ConsolidationVersionsIF,
  ExerciseConsolidationVersionsIF,
} from '@/types/consolidation';
import { apiPaths } from '@/utils/apiPaths';
import { useMutation, useQuery } from '@tanstack/react-query';

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
      return await callApi<ConsolidationVersionsIF[]>({
        method: 'GET',
        url: apiPaths.consolidationVersions(sbuId),
      });
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
export const useExerciseConsolidationVersions = (
  sbuId: string,
  exerciseId?: string
) => {
  return useQuery<ExerciseConsolidationVersionsIF[]>({
    queryKey: ['exercise-consolidation-versions', sbuId, exerciseId],
    queryFn: async () => {
      return await callApi<ExerciseConsolidationVersionsIF[]>({
        method: 'GET',
        url: apiPaths.consolidationHierarchy(sbuId, exerciseId),
      });
    },
    // only run the query if the sbuId is provided
    enabled: !!sbuId,
  });
};

/**
 * Mutation hook for consolidating sales data
 * @returns a mutation hook with the following properties:
 * - `mutate`: a function that takes an array of version strings as an argument and calls the API to consolidate sales data
 * - `isLoading`: a boolean that indicates whether the mutation is in progress
 * - `isError`: a boolean that indicates whether the mutation resulted in an error
 * - `error`: an error object that contains the error message
 * - `data`: the response data from the API
 */
export const useConsolidateSales = () => {
  return useMutation<any, Error, string[]>({
    /**
     * The mutation function that will be called when the hook is invoked
     * @param versions an array of version strings to be consolidated
     */
    mutationFn: async (versions: string[]) => {
      if (!versions || versions.length === 0) {
        throw new Error('Versions are required'); // Prevents unnecessary API calls
      }
      return await callApi<any>({
        method: 'POST',
        url: apiPaths.consolidationSales(), // API endpoint for consolidating sales
        data: versions, // Versions data to be sent in the request body
      });
    },
  });
};
