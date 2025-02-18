import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import Filter from './Filter';
import { FC } from 'react';

type Props = {
  onChange: (values: string[]) => void;
};

const ExercisePeriodFilter: FC<Props> = ({ onChange }) => {
  const { exercisePeriods: periods } = useExerciseStore();
  if (!periods) return <div />;
  return (
    <Filter
      data={periods}
      basecomp="multiselect"
      title="Périodes"
      placeholder="Chercher"
      mapOption={(p) => ({
        label: p.name + ' ' + p.year,
        value: p.id
      })}
      onChange={onChange}
    />
  );
};

export default ExercisePeriodFilter;
