'use client';
import Loading from '@/app/loading';
import { useAggregations } from '@/services/aggregations.service';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import {
  ChartIF,
  CHART_FILTERS,
  DimentionItem,
  QueryDefinition,
} from '@/types/dashboard';
import { PeriodIF } from '@/types/refExercise/config';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ChartWrapper } from './ChartWrapper';

export function ChartBox({
  chart,
  globalFilters,
}: {
  chart: ChartIF;
  globalFilters: Record<string, string[]>;
}) {
  const [activePeriod, setActivePeriod] = useState<PeriodIF>();
  const { currentExercise } = useExerciseStore();
  const [periods, setPeriods] = useState<PeriodIF[]>(
    currentExercise?.periods.map((p) => p.period) || []
  );
  //internal filters
  const [filters, setFilters] = useState<Record<string, string[]>>({
    [CHART_FILTERS.periods]:
      currentExercise?.periods?.map((p) => p.period.id) || [],
  });
  const [query, setQuery] = useState<QueryDefinition>({ ...chart.config });
  //TODO get filters to display from filter factory
  //call api aggregation :
  const { data, isSuccess, isLoading, isError } = useAggregations({
    entity: chart.config.entity,
    aggregations: chart.config.aggregations,
    groupedBy: chart.config.groupedBy,
    filters: [],
  });

  useEffect(() => {
    if (globalFilters) {
      const newFilters = { ...filters };
      Object.keys(globalFilters).map((g) => {
        const value = Array.from(
          new Set([...newFilters[g], ...globalFilters[g]])
        );
        newFilters[g] = value;
      });
      setFilters(newFilters);
    }
  }, [globalFilters]);

  useEffect(() => {
    const selectedPeriods =
      currentExercise?.periods
        ?.filter((p) => filters[CHART_FILTERS.periods].includes(p.period.id))
        .map((p) => p.period) ||
      currentExercise?.periods.map((p) => p.period) ||
      [];
    setPeriods(selectedPeriods);

    const newQuery = { ...query };
    if (newQuery.filters === undefined) newQuery.filters = [];
    //mutate chart config to send new query
    Object.keys(filters).map((g) => {
      const value = [...filters[g]];
      newQuery.filters.push({ name: g, key: g, values: value });
    });
    const periodFilter = newQuery.filters.find((f) => f.name === 'periods');
    if (periodFilter) {
      if (
        activePeriod &&
        selectedPeriods.find((sp) => sp.id === activePeriod.id)
      ) {
        periodFilter.values = [activePeriod.id];
      } else {
        setActivePeriod(selectedPeriods[0]);
        periodFilter.values = [selectedPeriods[0].id];
      }
    }
    setQuery(newQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExercise, filters]);

  const prepareData = (data: DimentionItem[]) => {
    const series: { name: string; data: number[] }[] = [];
    chart.config.aggregations
      .map((a) => a.operation)
      .forEach((m, index) => {
        series.push({
          name: `Serie ${index}`,
          data: data.map((d) => d.values[m]),
        });
      });
    return series;
  };
  return (
    <ChartWrapper
      handleChange={(tab) =>
        setActivePeriod(periods.find((p) => p.id === tab.value))
      }
      title={chart.name}
      subTitle={chart.subTitle}
      tabs={periods.map((p) => ({ value: p.id, label: p.name }))}
    >
      {isLoading && <Loading />}
      {isSuccess && Array.isArray(data) && (
        <div className="mixed-chart">
          {data.map((d, index) => {
            const options = {
              chart: {
                id: `${chart.id}-${index}`,
              },
              xaxis: {
                categories: d.groupedBy.data.map((d) => d.label),
              },
            };

            return (
              <Chart
                key={d.groupedBy.label}
                options={options}
                series={prepareData(d.groupedBy.data)}
                type={chart.chartType}
                width="500"
              />
            );
          })}
        </div>
      )}
    </ChartWrapper>
  );
}
