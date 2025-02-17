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
/**
 * HypWrapper component that manages the display of different exercise steps.
 *
 * @param {HypWrapperProps} props - Component props.
 * @returns {JSX.Element} The rendered component.
 */
function HypWrapper({
  children,
  shouldDisableStep,
  shouldDisplayWaitingStep,
  waitingStepMessage,
}: HypWrapperProps): JSX.Element {
  // State to keep track of the selected step
  const [selected, setSelected] = useState<CodeStepType>(CODE_STEPS.COLLECT);

  // Retrieve the current exercise step from the store
  const exerciseStep = useExerciseStore((state) => state.exerciseStep);

  // Fetch sub-steps related to the exercise step
  const {
    data: sections,
    error,
    isPending,
  } = useSections(exerciseStep?.stepConfig?.id ?? undefined);

  // Fetch user data
  const { data: user, isLoading, isError } = useUser();

  // Render an empty div when exercise step data is not yet available or still loading
  if (!exerciseStep || isPending || isLoading) return <div />;

  // Display an error message if there is an error loading the exercise
  if (isError || error) return <p className="p-4">Error Loading Exercise...</p>;

  console.log({ exerciseStep });
  return (
    <div className="space-y-6">
      {/* Check if the waiting step should be displayed */}
      {user &&
      shouldDisplayWaitingStep &&
      shouldDisplayWaitingStep(user, exerciseStep) &&
      waitingStepMessage ? (
        <WaitingStep {...waitingStepMessage} />
      ) : (
        <>
          {/* ProcessStepWrapper manages the step navigation */}
          <ProcessStepWrapper
            steps={exerciseStep.subSteps}
            isDisabled={
              shouldDisableStep && user && exerciseStep
                ? !shouldDisableStep(user, exerciseStep)
                : false
            }
            onSelect={(e) => setSelected(e as CodeStepType)}
          />
          {/* Conditionally render pages based on the selected step */}
          {selected === CODE_STEPS.COLLECT && <CollectPage user={user} />}
          {selected === CODE_STEPS.CONSOLIDATION && (
            <SalesConsolidationPage items={sections} />
          )}
          {children}
        </>
      )}
    </div>
  );
}

export default HypWrapper;
