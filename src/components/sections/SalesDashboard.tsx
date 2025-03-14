import React, { useState } from 'react';
import FilterFactory from '../common/FilterFactory';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import { useChartList } from '@/services/dashboard.service';
import { ChartBox } from '../common/ChartBox';
import { ChartIF, DashboardProps } from '@/types/dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useGroupedProducts,
  useMarketableProductTypes,
} from '@/services/referential.Service';
import CompareVersions from '../common/CompareVersions';
import Loading from '@/app/loading';
import { Button } from '../ui/button';

export default function SalesDashboard({
  section,
  user: userData,
  disableCompare = false,
}: DashboardProps) {
  const [displayType] = useState<string>('VISUALIZE');
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const { currentExercise } = useExerciseStore();

  const { data, isPending, error } = useChartList(section.id);
  const { data: groups } = useGroupedProducts();
  const { data: marketableTypes, isLoading: isTypeLoading } =
    useMarketableProductTypes(groups || []);

  const handleFilter = (key: string, value: string[]) => {
    const newFilters = { ...filters };
    newFilters[key] = value;
    setFilters(newFilters);
  };

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
      {isTypeLoading ? (
        <Loading />
      ) : (
        <>
          {marketableTypes && marketableTypes.length > 0 ? (
            <Tabs
              defaultValue={marketableTypes ? marketableTypes[0]?.id : ''}
              className="rounded"
            >
              <div className="flex  gap-4">
                <TabsList variant="default" className="justify-start max-w-80">
                  {marketableTypes &&
                    marketableTypes.map(({ id, name }) => (
                      <TabsTrigger key={id} variant="default" value={id || ''}>
                        {name}
                      </TabsTrigger>
                    ))}
                </TabsList>

                <div className="flex gap-4">
                  <FilterFactory
                    module="products"
                    onChange={(e) => {
                      setFilters({ ...filters, products: e as string[] });
                    }}
                    values={filters['products']}
                  />
                  <FilterFactory
                    module="regions"
                    onChange={(e) => {
                      setFilters({ ...filters, regions: e as string[]});
                    }}
                    values={filters['regions']}
                  />
                  <FilterFactory
                    module="periods"
                    onChange={(e) => {
                      setFilters({ ...filters, periods: e as string[]});
                    }}
                    values={filters['periods']}
                  />
                </div>
              </div>
              {marketableTypes.map(({ id, name, colors }) => (
                <TabsContent key={id} value={id || ''}>
                  <div className="flex flex-col gap-4">
                    {data
                      .filter(
                        (e) =>
                          e.displayType === displayType &&
                          e.config !== null &&
                          ['bar', 'boxPlot'].includes(e.chartType)
                      )
                      .sort((a, b) => a.sortedBy - b.sortedBy)
                      .map((chart) => (
                        <ChartBox
                          marketableType={{ id, name, colors }}
                          key={chart.id}
                          chart={chart as ChartIF}
                          globalFilters={filters}
                          setGlobalFilter={handleFilter}
                        />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <FilterFactory
                  module="products"
                  onChange={(e) => {
                    setFilters({ ...filters, products: e as string[]});
                  }}
                  values={filters['products']}
                />
                <FilterFactory
                  module="regions"
                  onChange={(e) => {
                    setFilters({ ...filters, regions: e as string[]});
                  }}
                  values={filters['regions']}
                />
                <FilterFactory
                  module="periods"
                  onChange={(e) => {
                    setFilters({ ...filters, periods: e as string[]});
                  }}
                  values={filters['periods']}
                />
              </div>
              {data
                .filter(
                  (e) =>
                    e.displayType === displayType &&
                    e.config !== null &&
                    ['bar', 'boxPlot'].includes(e.chartType)
                )
                .sort((a, b) => a.sortedBy - b.sortedBy)
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
        </>
      )}
    </div>
  );
}
