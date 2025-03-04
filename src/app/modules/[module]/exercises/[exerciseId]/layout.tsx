'use client';

import StepList from '@/components/common/StepList';
import ExerciseIdLayoutSkeleton from '@/components/skeletons/ExerciseIdLayoutSkeleton';
import { useExercises } from '@/services/exercises.service';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import { Exercise } from '@/types/exercise';
import { modules } from '@/utils/constants';
import * as LucideIcons from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

// used for icons as props
type IconKey = keyof typeof LucideIcons;
type IconProps = { color?: string };

function ExercisesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: exercises, isLoading, isError, isSuccess } = useExercises();
  const params = useParams();
  const { setExercise, currentExercise } = useExerciseStore();

  useEffect(() => {
    if (exercises) {
      const exercise = exercises.find(
        (exercise: Exercise) => exercise.id === params.exerciseId
      );
      setExercise(exercise);
    }
  }, [exercises, params.exerciseId]);

  if (isLoading) return <ExerciseIdLayoutSkeleton />;

  // redirect to home in case exerciseId not found
  if (isError) return <p className="p-4">Error Loading Exercise...</p>;

  return (
    <div className="p-6 h-full flex flex-col">
      <p className="text-2xl font-bold mb-[18px]">{currentExercise?.name}</p>

      {isSuccess && currentExercise && currentExercise.steps && (
        <div className="mb-[18px]">
          <StepList
            steps={currentExercise.steps
              .map((step) => ({
                label: step.stepConfig.name,
                iconKey:
                  (LucideIcons[
                    step.stepConfig.iconKey as IconKey
                  ] as React.ComponentType<IconProps>) || LucideIcons.Activity,
                status: step.status,
                code: step.stepConfig.code,
                sortedBy: step.stepConfig.sortedBy,
                // TODO: to change tacticalPlanning with dynamic SBU name
                redirectUrl: `/modules/${modules.tacticalPlanning}/exercises/${params.exerciseId}/${step.stepConfig.code}`,
              }))
              .sort((a, b) => a.sortedBy - b.sortedBy)}
          />
        </div>
      )}

      <div className="grow">{children}</div>
    </div>
  );
}

export default ExercisesLayout;
