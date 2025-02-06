'use client';

import StepList from '@/components/common/StepList';
import { useExercises } from '@/services/exercises.service';
import { Exercise } from '@/types/exercise';
import { redirect, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import ExerciseIdLayoutSkeleton from '@/components/skeletons/ExerciseIdLayoutSkeleton';
type IconKey = keyof typeof LucideIcons;

type IconProps = { color?: string };

function ExercisesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: exercises, isLoading, isError, isSuccess } = useExercises();
  const [exerciseData, setExerciseData] = useState<Exercise>();
  const params = useParams();

  useEffect(() => {
    if (exercises) {
      setExerciseData(
        exercises.find(
          (exercise: Exercise) => exercise.id === params.exerciseId
        )
      );
    }
  }, [exercises, isLoading, params.exerciseId]);

  if (isLoading) return <ExerciseIdLayoutSkeleton />

  // redirect to home in case exerciseId not found
  if (isError) return redirect(`/`);

  return (
    <div className="p-6 space-y-6">
      <p className="text-2xl font-bold">{exerciseData?.name}</p>
      {isSuccess && exerciseData && exerciseData.steps && (
        <StepList
          steps={exerciseData.steps
            .map((step) => ({
              label: step.stepConfig.name,
              iconKey:
                (LucideIcons[
                  step.stepConfig.iconKey as IconKey
                ] as React.ComponentType<IconProps>) || LucideIcons.Activity,
              status: step.status,
              code: step.stepConfig.code,
              sortedBy: step.stepConfig.sortedBy,
              redirectUrl: `/modules/BS/exercise/${params.exerciseId}/${step.stepConfig.code}`,
            }))
            .sort((a, b) => a.sortedBy - b.sortedBy)}
        />
      )}
      {children}
    </div>
  );
}

export default ExercisesLayout;
