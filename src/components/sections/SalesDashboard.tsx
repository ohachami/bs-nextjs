import { Exercise } from '@/types/exercise';
import React from 'react';
import FilterFactory from '../common/FilterFactory';
import ConsolidationCombobox from '../common/ConsolidationCombobox';

interface SalesDashboardProps {
  exercise?: Exercise;
}
export default function SalesDashboard(props: SalesDashboardProps) {
  const { exercise } = props;

  /**
   * Selection Event Handling
   * @param selectedValue: new selected value from the list
   */
  const onSelectHandler = (selectedValue: string) => {
    console.log(`>>>>>>>> Selected value : ${selectedValue}`);
  }

  if (!exercise) return <div />;
  return (
    <div className="flex justify-center gap-10">
      <FilterFactory module="product" onChange={() => {}} />
      <FilterFactory module="region" onChange={() => {}} />
      <div>
        <FilterFactory module="period" onChange={() => {}} />
      </div>
      {/* ConsolidationVersions with User Sbu (default) */}
      <ConsolidationCombobox onSelect={onSelectHandler} />
    </div>
  );
}
