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
        <FilterFactory
          module="product"
          onChange={(values) => console.log('selected products: ', values)}
        />
        <FilterFactory
          module="region"
          onChange={(values) => console.log('selected regions: ', values)}
        />
        <div>
          <FilterFactory
            module="period"
            onChange={(values) => console.log('selected periods: ', values)}
          />
        </div>
      </div>

      {selected === 'COLLECT' && <CollectPage />}
    </div>
  );
}

export default PageHyperManu;
