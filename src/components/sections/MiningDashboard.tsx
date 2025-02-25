/* eslint-disable @typescript-eslint/no-unused-vars */
import { Section } from '@/types/exercise';
import React, { useState } from 'react';
import FilterFactory from '../common/FilterFactory';
import ConsolidationCombobox from '../common/ConsolidationCombobox';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import { useChartList } from '@/services/dashboard.service';
import { ChartBox } from '../common/ChartBox';
import { ChartIF, DashboardProps } from '@/types/dashboard';

export default function MiningDashboard({ section }: DashboardProps) {
  const [displayType, setDisplayType] = useState<string>('VISUALIZE');
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const { currentExercise } = useExerciseStore();
  const { data, isPending, error } = useChartList(section.id);
  /**
   * Selection Event Handling
   * @param selectedValue: new selected value from the list
   */
  const onSelectHandler = (selectedValue: string) => {};

  if (!currentExercise || isPending) return <div />;

  if (error) return <p className="p-4">Error Loading Charts...</p>;

  return (
    <div>
      <div className="flex justify-center gap-10">
        <FilterFactory module="product" onChange={() => {}} />
        <FilterFactory module="region" onChange={() => {}} />
        <div>
          <FilterFactory module="period" onChange={() => {}} />
        </div>
        {/* ConsolidationVersions with User Sbu (default) */}
        <ConsolidationCombobox onSelect={onSelectHandler} />
      </div>

      <div className="flex flex-col gap-4">
        {data
          .filter((e) => e.displayType === displayType)
          .map((chart, key) => (
            <ChartBox
              key={key}
              chart={chart as ChartIF}
              globalFilters={filters}
            />
          ))}
      </div>
    </div>
  );
}
