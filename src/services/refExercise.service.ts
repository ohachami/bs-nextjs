import { callAsync } from '@/hooks/useAsync';
import { ExerciseTypeIF, PeriodConfigIF, PeriodIF } from '@/types/refExercise/config';
import { apiPaths } from '@/utils/apiPaths';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

/**
 * Fetching the list of exercise Types
 * @returns a list of exercise Types
 */
export const useExerciseTypes = () => {
  return useQuery<ExerciseTypeIF[]>({
    queryKey: ['exerciseTypes'],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<ExerciseTypeIF[]>>(() =>
        axios.get(apiPaths.exerciceTypes())
      );
      return response.data;
    },
  });
};

/**
 * Fetching the list of config for a given exercise
 * @param exerciseTypeId: a string representing the exercise ID
 * @returns the list of config for a given exercise ID
 */
export const usePeriodConfig = (exerciseTypeId: string) => {
  return useQuery<PeriodConfigIF[]>({
    queryKey: ['periodConfig', exerciseTypeId],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<PeriodConfigIF[]>>(() =>
        axios.get(apiPaths.periodConfig(), {
          params: {
            exerciseType: exerciseTypeId,
          },
        })
      );
      return response.data;
    },
    // only run the query if the exerciseTypeId is provided
    enabled: !!exerciseTypeId,
  });
};

export const usePeriodsTree = () => {
  return useQuery<PeriodIF | null>({
    queryKey: ['periods', 'tree'],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<PeriodIF[]>>(() =>
        axios.get(apiPaths.periods())
      );
      return response.data && response.data.length > 0
        ? response.data[0]
        : null;
    },
  });
};
