import { Section } from '@/types/exercise';
import React, { useEffect, useState } from 'react';
import FilterFactory from '../common/FilterFactory';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import { useChartList } from '@/services/dashboard.service';
import { ChartBox } from '../common/ChartBox';
import { CHART_FILTERS, ChartIF, DashboardProps } from '@/types/dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMarketableProductTypes } from '@/services/referential.Service';
import CompareVersions from '../common/CompareVersions';
import Loading from '@/app/loading';
import { Button } from '../ui/button';

export default function SalesDashboard({
  section,
  user: userData,
  disableCompare = false,
}: DashboardProps) {
  const [displayType] = useState<string>('VISUALIZE');
  const [defaultTab, setDefaultTab] = useState<string>();
  const { currentExercise } = useExerciseStore();
  const [filters, setFilters] = useState<Record<string, string[]>>({
    [CHART_FILTERS.periods]: currentExercise
      ? currentExercise?.periods.map((e) => e.id.periodId)
      : [],
  });

  const { data, isPending, error } = useChartList(section.id);
  const { data: marketableTypes } = useMarketableProductTypes();

  const handleFilter = (key: string, value: string[]) => {
    const newFilters = { ...filters };
    newFilters[key] = value;
    setFilters(newFilters);
  };

  useEffect(() => {
    if (marketableTypes && marketableTypes?.length > 0) {
      setDefaultTab(marketableTypes[0].name);
    }
  }, [marketableTypes]);
  if (!currentExercise || isPending) return <Loading />;

  if (error) return <p className="p-4">Error Loading Charts...</p>;

  return (
    <div className="flex flex-col gap-4">
      {/* ConsolidationVersions with User Sbu (default) */}
      <div className="flex gap-4">
        <CompareVersions
          sbuId={userData.sbu.id}
          exerciseId={currentExercise.id}
          disabled={disableCompare}
        />
        <Button>Valider</Button>
      </div>
      <Tabs defaultValue={defaultTab} className="rounded">
        <div className="flex justify-between gap-4">
          <TabsList variant="default" className="justify-start max-w-80">
            {marketableTypes &&
              marketableTypes.map(({ id, name }) => (
                <TabsTrigger key={id} variant="default" value={name}>
                  {name}
                </TabsTrigger>
              ))}
          </TabsList>

          <FilterFactory
            module="products"
            onChange={(e) => {
              setFilters({ ...filters, products: e });
            }}
          />
          <FilterFactory
            module="regions"
            onChange={(e) => {
              setFilters({ ...filters, regions: e });
            }}
          />
          <FilterFactory
            module="periods"
            onChange={(e) => {
              setFilters({ ...filters, periods: e });
            }}
          />
        </div>
        {marketableTypes && marketableTypes.length > 0 ? (
          marketableTypes.map(({ id, name, color }) => (
            <TabsContent key={id} value={name}>
              <div className="flex flex-col gap-4">
                {data
                  .filter(
                    (e) =>
                      e.displayType === displayType &&
                      e.config !== null &&
                      ['bar', 'boxPlot'].includes(e.chartType)
                  )
                  .map((chart, key) => (
                    <ChartBox
                      marketableType={{ id, name, color }}
                      key={key}
                      chart={chart as ChartIF}
                      globalFilters={filters}
                      setGlobalFilter={handleFilter}
                    />
                  ))}
              </div>
            </TabsContent>
          ))
        ) : (
          <div className="flex flex-col gap-4">
            {data
              .filter(
                (e) =>
                  e.displayType === displayType &&
                  e.config !== null &&
                  ['bar', 'boxPlot'].includes(e.chartType)
              )
              .map((chart, key) => (
                <ChartBox
                  key={key}
                  chart={chart as ChartIF}
                  globalFilters={filters}
                  setGlobalFilter={handleFilter}
                />
              ))}
          </div>
        )}
      </Tabs>
    </div>
  );
}
