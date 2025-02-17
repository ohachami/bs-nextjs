import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import Filter from './Filter';
import { FC } from 'react';

type Props = {
  onChange: (values: string[]) => void;
};

const ExercisePeriodFilter: FC<Props> = ({ onChange }) => {
  const { getExercisePeriods } = useExerciseStore();

  const periods = getExercisePeriods();
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
    />
  );
};

export default ExercisePeriodFilter;
