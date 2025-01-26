'use client';
import ExerciseCard from '@/components/common/ExerciseCard';
import { Button } from '@/components/ui/button';
import { useExercises } from '@/services/exercises.service';
import { getFullName } from '@/utils/functions';
import { PlusIcon } from 'lucide-react';

const ModuleExercices = () => {
  const { isPending, data } = useExercises();

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading ...</p>
      </div>
    );
  }

  console.log({ data });

  return (
    <div className="flex flex-col p-8 pt-6 gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-card-foreground font-semibold font-geist tracking-tight">
          Liste des exercices
        </h1>

        <Button>
          <PlusIcon /> Démarrer un exercice
        </Button>
      </div>

      <div>filters</div>

      {data && (
        <div className="flex gap-2">
          {data.map((ex) => (
            <ExerciseCard
              key={ex.id}
              creator={getFullName(ex.user.last_name, ex.user.first_name)}
              creationDate={ex.created_at}
              name={ex.name}
              status={ex.status}
              period={ex.period.name}
              steps={ex.exercise_step.map((s, index) => ({
                id: s.id,
                name: s.step_config?.name || null,
                status: s.status,
                deadline: s.deadline_dt,
                order: s.step_config?.sorted_by || index,
              }))}
            />
          ))}
        </div>
      )}

      <div>actifs précédents</div>
    </div>
  );
};

export default ModuleExercices;
