import { Exercise } from '@/types/exercise';
import React from 'react';
import { MultiSelect } from '../ui/multi-select';
import { Button } from '../ui/button';
import FilterFactory from '../common/FilterFactory';

interface SalesDashboardProps {
  exercise?: Exercise;
}
export default function SalesDashboard(props: SalesDashboardProps) {
  const { exercise } = props;
  // const {}=useChartList()
  if (!exercise) return <div />;
  return (
    <div className="flex justify-center gap-10">
      <FilterFactory module="product" onChange={() => {}} />
      <FilterFactory module="region" onChange={() => {}} />
      <div>
        <FilterFactory module="period" onChange={() => {}} />
      </div>
    </div>
  );
}
