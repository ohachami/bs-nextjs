'use client';
import ProcessStepWrapper from '@/components/common/ProcessStepWrapper';
import CollectPage from '@/components/sections/Collect';
import SalesConsolidationPage from '@/components/sections/Consolidation';
import { STEPS } from '@/utils/mocks';
import { useState } from 'react';

function PageHypSales() {
  const [selected, setSelected] = useState('COLLECT');
  return (
    <div className="space-y-6">
      <ProcessStepWrapper steps={STEPS} onSelect={setSelected} />
      {selected === 'COLLECT' && <CollectPage />}
      {selected === 'CONSOLIDATION' && <SalesConsolidationPage />}
    </div>
  );
}

export default PageHypSales;
