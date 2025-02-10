import { Exercise } from '@/types/exercise';
import React from 'react';
import { MultiSelect } from '../ui/multi-select';
import { Button } from '../ui/button';

interface SalesDashboardProps {
  exercise?: Exercise;
}
export default function SalesDashboard(props: SalesDashboardProps) {
  const { exercise } = props;
  if (!exercise) return <div />;
  return (
    <div className="flex">
      <MultiSelect
        className="w-[570px] bg-white"
        onValueChange={() => {}}
        options={[]}
      />
    </div>
  );
}
