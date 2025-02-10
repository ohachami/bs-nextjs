'use client';
import DashboardWrapper from '@/components/sections/DashboardWrapper';
import SalesDashboard from '@/components/sections/SalesDashboard';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';

function ExericseById() {
  const currentExercise = useExerciseStore((state) => state.currentExercise);

  return (
    <DashboardWrapper
      items={[
        {
          code: 'HYPO_SALES',
          name: 'Hypothèses Commerciales',
          content: <SalesDashboard exercise={currentExercise} />,
        },
        {
          code: 'HYPE_MANUFACTURING',
          name: 'Hypothèses Manufacturing',
          content: <div />,
        },
        { code: 'HYPE_MINING', name: 'Hypothèses Mining', content: <div /> },
      ]}
    />
  );
}

export default ExericseById;
