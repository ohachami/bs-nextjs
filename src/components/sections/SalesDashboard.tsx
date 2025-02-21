/* eslint-disable @typescript-eslint/no-unused-vars */
import { Section } from '@/types/exercise';
import React, { useState } from 'react';
import FilterFactory from '../common/FilterFactory';
import ConsolidationCombobox from '../common/ConsolidationCombobox';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import { useChartList } from '@/services/dashboard.service';
import { ChartBox } from '../common/ChartBox';
import { ChartIF } from '@/types/dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMarketableProductTypes } from '@/services/referential.Service';
interface SalesDashboardProps {
  section: Section;
}
export default function SalesDashboard({ section }: SalesDashboardProps) {
  const [displayType, setDisplayType] = useState<string>('VISUALIZE');
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const { currentExercise } = useExerciseStore();
  const { data, isPending, error } = useChartList(section.id);
  const {data: marketableTypes} = useMarketableProductTypes();

  /**
   * Selection Event Handling
   * @param selectedValue: new selected value from the list
   */
  const onSelectHandler = (selectedValue: string) => {console.log(selectedValue)};

  if (!currentExercise || isPending) return <div />;

  if (error) return <p className="p-4">Error Loading Charts...</p>;
  
  const defaultItem = marketableTypes && marketableTypes?.length > 0 ? marketableTypes[0].name : "";
  return (
    <div className='flex flex-col gap-4'>
      {/* ConsolidationVersions with User Sbu (default) */}
      <div>
        <ConsolidationCombobox onSelect={onSelectHandler} />
      </div>
      <Tabs defaultValue={defaultItem} className="rounded">
      <div className='flex justify-between gap-4'>
      <TabsList variant="default" className='justify-start max-w-80'>
        {marketableTypes && marketableTypes.map(({ id, name }) => (
          <TabsTrigger key={id} variant="default" value={name}>
            {name}
          </TabsTrigger>
        ))}
      </TabsList>
      
        <FilterFactory module="product" onChange={() => {}} />
        <FilterFactory module="region" onChange={() => {}} />
        <FilterFactory module="period" onChange={() => {}} />
        
      </div>
      {marketableTypes && marketableTypes.length > 0 && marketableTypes.map(({ id, name, color }) => (
        <TabsContent key={id} value={name}>
          <div className="flex justify-center gap-10"></div>
            {data
              .filter((e) => e.displayType === displayType && e.config !== null)
              .map((chart, key) => (
                <ChartBox
                  key={key}
                  chart={chart as ChartIF}
                  globalFilters={filters}
                />
              ))}
        </TabsContent>
      ))}
      {!marketableTypes || marketableTypes.length === 0 && (
         <>
          {data
          .filter((e) => e.displayType === displayType && e.config !== null)
          .map((chart, key) => (
            <ChartBox
              key={key}
              chart={chart as ChartIF}
              globalFilters={filters}
            />
          ))}
         </>
      )}
    </Tabs>
    </div>
  );
}
