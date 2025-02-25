import { Section } from '@/types/exercise';
import React, { useState } from 'react';
import FilterFactory from '../common/FilterFactory';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import { useChartList } from '@/services/dashboard.service';
import { ChartBox } from '../common/ChartBox';
import { ChartIF, DashboardProps } from '@/types/dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMarketableProductTypes } from '@/services/referential.Service';
import CompareVersions from '../common/CompareVersions';
import { useUser } from '@/services/users.service';
import Loading from '@/app/loading';
import { User } from '@/types/user';

export default function SalesDashboard({
  section,
  user: userData,
}: DashboardProps) {
  const [displayType] = useState<string>('VISUALIZE');
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const { currentExercise } = useExerciseStore();
  const { data, isPending, error } = useChartList(section.id);
  const { data: marketableTypes } = useMarketableProductTypes();

  if (!currentExercise || isPending) return <Loading />;

  if (error) return <p className="p-4">Error Loading Charts...</p>;

  const defaultItem =
    marketableTypes && marketableTypes?.length > 0
      ? marketableTypes[0].name
      : '';
  return (
    <div className="flex flex-col gap-4">
      {/* ConsolidationVersions with User Sbu (default) */}
      <div>
        <CompareVersions
          sbuId={userData.sbu.id}
          exerciseId={currentExercise.id}
        />
      </div>
      <Tabs defaultValue={defaultItem} className="rounded">
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
              <div className="flex justify-center gap-10"></div>
              {data
                .filter(
                  (e) =>
                    e.displayType === displayType &&
                    e.config !== null &&
                    ['bar', 'line'].includes(e.chartType)
                )
                .map((chart, key) => (
                  <ChartBox
                    marketableType={{ id, name, color }}
                    key={key}
                    chart={chart as ChartIF}
                    globalFilters={filters}
                  />
                ))}
            </TabsContent>
          ))
        ) : (
          <div className="flex flex-col gap-4">
            {data
              .filter(
                (e) =>
                  e.displayType === displayType &&
                  e.config !== null &&
                  ['bar', 'line'].includes(e.chartType)
              )
              .map((chart, key) => (
                <ChartBox
                  key={key}
                  chart={chart as ChartIF}
                  globalFilters={filters}
                />
              ))}
          </div>
        )}
      </Tabs>
    </div>
  );
}
