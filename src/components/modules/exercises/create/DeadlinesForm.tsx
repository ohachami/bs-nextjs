'use client';

import DatePicker from '@/components/common/DatePicker';
import DeadlinesFormSkeleton from '@/components/skeletons/DeadlinesFormSkeleton';
import { Label } from '@/components/ui/label';
import { useStepConfig } from '@/services/refExercise.service';
import { useExerciseCreationStore } from '@/store/exercises/create';
import { StepConfigIF } from '@/types/refExercise/config';
import { getDateWithDay } from '@/utils/functions';
import { useEffect } from 'react';

function DeadlinesForm() {
  const { data: stepConfig, isLoading, isSuccess } = useStepConfig();
  const { data, updateData } = useExerciseCreationStore();

  // on success backend step config data loading
  useEffect(() => {
    if (isSuccess && stepConfig !== undefined) {
      // fetching already existing dates
      const existingDates = stepConfig.map((item: StepConfigIF) => ({
        stepConfigId: item.id,
        sortedBy: item.sortedBy,
        deadlineAt: getDateWithDay(item.deadlineDay),
      }));
      // update state with backend data
      updateData({
        ...data,
        // eslint-disable-next-line
        //@ts-ignore
        steps: existingDates,
      });
    }
  }, [isSuccess]);

  /**
   * On a date picker value change
   * @param date : selected date from he picker
   * @param configId : the step config id
   */
  const onSelectedDate = (date: Date, config: StepConfigIF) => {
    // get a state replicate data
    const replicateStepsData = [...data.steps];
    // detect duplicates
    let isFound = false;
    // if the config id already exists, we just replace it's deadline value
    for (let i = 0; i < replicateStepsData.length; i++) {
      if (replicateStepsData[i].stepConfigId === config.id) {
        replicateStepsData[i].deadlineAt = date;
        isFound = true;
        break;
      }
    }
    // if config id isn't found (a new config)
    // we add it to the list of steps
    if (!isFound) {
      replicateStepsData.push({
        stepConfigId: config.id,
        deadlineAt: date,
        sortedBy: config.sortedBy,
      });
    }
    // update global state
    updateData({
      ...data,
      steps: replicateStepsData,
    });
  };

  /**
   * Deleting a cleared Date StepConfig
   * @param configId: the step config id
   */
  const onClearDate = (configId: string) => {
    // get a state replicate data
    const replicateStepsData = [...data.steps];
    for (let i = 0; i < replicateStepsData.length; i++) {
      if (replicateStepsData[i].stepConfigId === configId) {
        replicateStepsData[i].deadlineAt = undefined;
        break;
      }
    }
    //update global state
    updateData({
      ...data,
      steps: replicateStepsData,
    });
  };

  if (!stepConfig || isLoading) return <DeadlinesFormSkeleton />;

  return (
    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
      {stepConfig.map((config, key) => (
        <div key={key} className="grid grid-cols-3 items-center">
          <Label>{config.name}</Label>
          <div className="col-span-2">
            <DatePicker
              onSelectedDate={(date: Date) => onSelectedDate(date, config)}
              withClearBtn={!config.mandatory}
              initialDate={getDateWithDay(config.deadlineDay)}
              onDateClear={() => onClearDate(config.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default DeadlinesForm;
