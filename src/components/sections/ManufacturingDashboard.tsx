/* eslint-disable @typescript-eslint/no-unused-vars */
import { Section } from '@/types/exercise';
import React, { useState } from 'react';
import FilterFactory from '../common/FilterFactory';
import ConsolidationCombobox from '../common/ConsolidationCombobox';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import { useChartList } from '@/services/dashboard.service';
import { ChartBox } from '../common/ChartBox';
import { ChartIF } from '@/types/dashboard';

interface ManufacturingDashboardProps {
  section: Section;
}
export default function ManufacturingDashboard({
  section,
}: ManufacturingDashboardProps) {
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

      <div className="flex justify-center gap-10"></div>
      {data
        .filter((e) => e.displayType === displayType)
        .map((chart) => (
          <ChartBox key={chart.id} chart={chart as ChartIF} globalFilters={filters} />
        ))}
    </div>
  );
}
