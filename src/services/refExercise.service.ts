import { callApi } from '@/hooks/useApi';
import { ExerciseTypeIF, PeriodConfigV2IF, PeriodIF, StepConfigIF } from '@/types/refExercise/config';
import { apiPaths } from '@/utils/apiPaths';
import { useQuery } from '@tanstack/react-query';

/**
 * Fetching the list of exercise Types
 * @returns a list of exercise Types
 */
export const useExerciseTypes = () => {
  return useQuery<ExerciseTypeIF[]>({
    queryKey: ['exerciseTypes'],
    queryFn: async () => {
      return await callApi<ExerciseTypeIF[]>({
        method: 'GET',
        url: apiPaths.exerciceTypes(),
      });
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
      return await callApi<PeriodConfigV2IF>({
        method: 'GET',
        url: apiPaths.periodConfig(),
        params: {
          exerciseType: exerciseTypeId,
        },
      });
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
      return await callApi<StepConfigIF[]>({
        method: 'GET',
        url: apiPaths.stepConfig(),
      });
    },
  });
};

export const usePeriodsTree = () => {
  return useQuery<PeriodIF | null>({
    queryKey: ['periods', 'tree'],
    queryFn: async () => {
      const periods = await callApi<PeriodIF[]>({
        method: 'GET',
        url: apiPaths.periods(),
      });
      return periods && periods.length > 0
        ? periods[0]
        : null;
    },
  });
};
