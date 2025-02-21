import api from '@/api';
import { callAsync } from '@/hooks/useAsync';
import { ExerciseTypeIF, PeriodConfigV2IF, PeriodIF, StepConfigIF } from '@/types/refExercise/config';
import { apiPaths } from '@/utils/apiPaths';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

/**
 * Fetching the list of exercise Types
 * @returns a list of exercise Types
 */
export const useExerciseTypes = () => {
  return useQuery<ExerciseTypeIF[]>({
    queryKey: ['exerciseTypes'],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<ExerciseTypeIF[]>>(() =>
        api.get(apiPaths.exerciceTypes())
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
  return useQuery<PeriodConfigV2IF>({
    queryKey: ['periodConfig', exerciseTypeId],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<PeriodConfigV2IF>>(() =>
        api.get(apiPaths.periodConfig(), {
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

/**
 * Fetching the list of StepConfig
 * @returns a list of steps config used for the step number 3
 * at the exercice step form creation process.
 */
export const useStepConfig = () => {
  return useQuery<StepConfigIF[]>({
    queryKey: ['stepConfig'],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<StepConfigIF[]>>(() =>
        api.get(apiPaths.stepConfig())
      );
      return response.data;
    },
  });
};

export const usePeriodsTree = () => {
  return useQuery<PeriodIF | null>({
    queryKey: ['periods', 'tree'],
    queryFn: async () => {
      const response = await callAsync<AxiosResponse<PeriodIF[]>>(() =>
        api.get(apiPaths.periods())
      );
      return response.data && response.data.length > 0
        ? response.data[0]
        : null;
    },
  });
};
