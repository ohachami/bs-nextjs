'use client';
import ProcessStepWrapper from '@/components/common/ProcessStepWrapper';
import CollectPage from '@/components/sections/Collect';
import SalesConsolidationPage from '@/components/sections/Consolidation';
import { useSections } from '@/services/dashboard.service';
import { useUser } from '@/services/users.service';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import { ExerciseStep } from '@/types/exercise';
import { CodeStepType } from '@/types/refExercise/config';
import { User } from '@/types/user';
import { CODE_STEPS } from '@/utils/constants';
import React, { useState } from 'react';
import WaitingStep from '../common/WaitingStep';

interface HypWrapperProps {
  children?: React.ReactNode;
  shouldDisableStep?: (user: User, ExerciseStep: ExerciseStep) => boolean;
  shouldDisplayWaitingStep?: (
    user: User,
    ExerciseStep: ExerciseStep
  ) => boolean;
  waitingStepMessage?: { title: string; subtitle?: string };
}
function HypWrapper({
  children,
  shouldDisableStep,
  shouldDisplayWaitingStep,
  waitingStepMessage,
}: HypWrapperProps) {
  const [selected, setSelected] = useState<CodeStepType>(CODE_STEPS.COLLECT);
  const exerciseStep = useExerciseStore((state) => state.exerciseStep);
  const {
    data: subSteps,
    error,
    isPending,
  } = useSections(exerciseStep?.stepConfig?.id ?? undefined);
  const { data: user, isLoading, isError } = useUser();

  if (!exerciseStep || isPending || isLoading) return <div />;

  if (isError || isError)
    return <p className="p-4">Error Loading Exercise...</p>;

  return (
    <div className="space-y-6">
      {user &&
      shouldDisplayWaitingStep &&
      shouldDisplayWaitingStep(user, exerciseStep) &&
      waitingStepMessage ? (
        <WaitingStep {...waitingStepMessage} />
      ) : (
        <>
          <ProcessStepWrapper
            steps={exerciseStep.subSteps}
            isDisabled={
              // shouldDisableStep && user && exerciseStep
              //   ? !shouldDisableStep(user, exerciseStep)
              //   : false
              false
            }
            onSelect={(e) => setSelected(e as CodeStepType)}
          />
          {selected === CODE_STEPS.COLLECT && <CollectPage user={user} />}
          {selected === CODE_STEPS.CONSOLIDATION && (
            <SalesConsolidationPage items={subSteps} />
          )}
          {children}
        </>
      )}
    </div>
  );
}

export default HypWrapper;
