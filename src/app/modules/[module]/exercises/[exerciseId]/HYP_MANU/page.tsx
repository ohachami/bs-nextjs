'use client';
import FilterFactory from '@/components/common/FilterFactory';
import ProcessStepWrapper from '@/components/common/ProcessStepWrapper';
import CollectPage from '@/components/sections/Collect';
import { STEPS } from '@/utils/mocks';
import { useState } from 'react';

function PageHyperManu() {
  const [selected, setSelected] = useState('COLLECT');
  return (
    <div className="space-y-6">
      <ProcessStepWrapper steps={STEPS} onSelect={setSelected} />

      <div className="flex justify-center gap-10">
        <FilterFactory module="product" onChange={() => {}} />
        <FilterFactory module="region" onChange={() => {}} />
        <div>
          <FilterFactory module="period" onChange={() => {}} />
        </div>
      </div>

      {selected === 'COLLECT' && <CollectPage />}
    </div>
  );
}

export default PageHyperManu;
