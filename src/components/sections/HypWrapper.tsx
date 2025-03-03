'use client';
import ProcessStepWrapper from '@/components/common/ProcessStepWrapper';

import { useSections } from '@/services/dashboard.service';
import { useUser } from '@/services/users.service';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import { ExerciseStep, Section } from '@/types/exercise';
import { CodeSubStepType } from '@/types/refExercise/config';
import { User } from '@/types/user';
import { CODE_SUB_STEPS } from '@/utils/constants';
import React, { ReactNode, useState } from 'react';
import WaitingStep from '../common/WaitingStep';
import { usePathname } from 'next/navigation';
import { findNextStepCode } from '@/utils/helpers';

interface ChildredProps {
  subStepSelected: CodeSubStepType;
  user: User;
  sections: Section[];
  step?: ExerciseStep;
  setSubStepSelected: (code: CodeSubStepType) => void;
}
interface HypWrapperProps {
  children?: ReactNode | ((props: ChildredProps) => ReactNode);
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
  const [subStepSelected, setSubStepSelected] = useState<CodeSubStepType>(
    CODE_SUB_STEPS.COLLECT
  );
  // get current pathname
  const pathname = usePathname();
  // Retrieve the current exercise step from the store
  const { exerciseStep, currentExercise } = useExerciseStore();
  // find step
  const step =
    currentExercise?.steps.find((s) => pathname.endsWith(s.stepConfig.code)) ||
    exerciseStep;
  // steps codes
  const codes = currentExercise?.steps
    .sort((a, b) => a.stepConfig.sortedBy - b.stepConfig.sortedBy)
    .map((stepConf) => stepConf.stepConfig.code);
  // Fetch sub-steps related to the exercise step
  const {
    data: sections,
    error,
    isPending,
  } = useSections(step?.stepConfig?.id ?? undefined);
  // Fetch user data
  const { data: user, isLoading, isError } = useUser();
  // Render an empty div when exercise step data is not yet available or still loading
  if (!step || isPending || isLoading || !user) return <div />;

  // Display an error message if there is an error loading the exercise
  if (isError || error) return <p className="p-4">Error Loading Exercise...</p>;
  return (
    <div className="space-y-6">
      {/* Check if the waiting step should be displayed */}
      {user &&
      shouldDisplayWaitingStep &&
      shouldDisplayWaitingStep(user, step) &&
      waitingStepMessage ? (
        <WaitingStep
          {...waitingStepMessage}
          nextStep={`${findNextStepCode(codes, pathname.split('/').at(-1))}`}
        />
      ) : (
        <>
          {/* ProcessStepWrapper manages the step navigation */}
          <ProcessStepWrapper
            steps={step.subSteps}
            isDisabled={
              shouldDisableStep && user && exerciseStep
                ? shouldDisableStep(user, exerciseStep)
                : false
            }
            onSelect={(e) => setSubStepSelected(e as CodeSubStepType)}
          />

          {typeof children === 'function'
            ? children({ subStepSelected, sections, user, step ,setSubStepSelected})
            : children}
        </>
      )}
    </div>
  );
}

export default HypWrapper;
