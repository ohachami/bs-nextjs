import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import Filter from './Filter';
import { FC } from 'react';

type Props = {
  onChange: (values: string[]) => void;
  values: string[];
};

const ExercisePeriodFilter: FC<Props> = ({ onChange, values }) => {
  const { exercisePeriods: periods } = useExerciseStore();
  if (!periods) return <div />;
  return (
    <Filter
      data={periods}
      basecomp="multiselect"
      title="Périodes"
      placeholder="Chercher"
      mapOption={(p) => ({
        label: p.period.name + ' ' + p.year,
        value: p.id.periodId,
      })}
      onChange={onChange}
      values={values}
    />
  );
};

export default ExercisePeriodFilter;
