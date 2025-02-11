'use client';
import ProcessStepWrapper from '@/components/common/ProcessStepWrapper';
import CollectPage from '@/components/sections/Collect';
import SalesConsolidationPage from '@/components/sections/Consolidation';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import { STEPS } from '@/utils/mocks';
import { useState } from 'react';

function PageHyperManu() {
  const [selected, setSelected] = useState('COLLECT');
  const currentExercise = useExerciseStore((state) => state.currentExercise);
  if (!currentExercise) return <div />;
  return (
    <div className="space-y-6">
      <ProcessStepWrapper steps={STEPS} onSelect={setSelected} />
      {selected === 'COLLECT' && <CollectPage />}
      {selected === 'CONSOLIDATION' && <SalesConsolidationPage />}
    </div>
  );
}

export default PageHyperManu;
