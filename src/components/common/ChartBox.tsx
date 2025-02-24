'use client';
import Loading from '@/app/loading';
import { useAggregations } from '@/services/aggregations.service';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import {
  ChartIF,
  CHART_FILTERS,
  DimentionItem,
  QueryDefinition,
  Filter,
} from '@/types/dashboard';
import { PeriodIF } from '@/types/refExercise/config';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ChartWrapper } from './ChartWrapper';

const getGridColsClass = (length: number) => {
  if (length <= 1) return 'grid-cols-1';
  if (length === 2) return 'grid-cols-2';
  if (length === 3) return 'grid-cols-3';
  if (length === 4) return 'grid-cols-2 md:grid-cols-4'; // 2 on small screens, 4 on medium+
  if (length >= 5) return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'; // Dynamic responsiveness
  return 'grid-cols-3'; // Default case
};

const filterBuilder = (
  filters: Record<string, string[]>,
  filterConfig: Filter[]
) => {
  
  const filterChart: Filter[] = [];
  Object.keys(filters).map((name) => {
    const currentFilter = filterConfig.find((f) => f.name == name);
    if (!currentFilter) return;
    filterChart.push({
      name,
      key: `${filterConfig.find((f) => f.name == name)?.key}`,
      values: filters[name],
    });
  });

  return filterChart;
};
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
  //TODO get filters to display from filter factory
  //call api aggregation :
  const { data, isSuccess, isLoading } = useAggregations({
    entity: chart.config.entity,
    aggregations: chart.config.aggregations,
    groupedBy: chart.config.groupedBy,
    filters: filterBuilder(filters, chart.config.filters),
    formula: chart.config.formula,
  });

  useEffect(() => {
    if (globalFilters) {
      const newFilters = { ...filters };
      Object.keys(globalFilters).map((g) => {
        if (!newFilters[g]) return;

        const value = Array.from(
          new Set([...newFilters[g], ...globalFilters[g]])
        );
        newFilters[g] = value;
      });
      setFilters(newFilters);
    }
  }, [globalFilters]);

  const handleChangeFilter = (name: string, values: string[]) => {
    if (!filters[name]) return;
    const newFilters = { ...filters };
    const value = Array.from(new Set([...newFilters[name], ...values]));
    setFilters({ ...newFilters, [name]: value });
  };
  useEffect(() => {
    const selectedPeriods =
      currentExercise?.periods
        ?.filter((p) => filters[CHART_FILTERS.periods].includes(p.period.id))
        .map((p) => p.period) ||
      currentExercise?.periods.map((p) => p.period) ||
      [];
    setPeriods(selectedPeriods);

    const newFilter = { ...filters };
    //mutate chart config to send new query
    Object.keys(filters).map((g) => {
      const value = [...filters[g]];
      newFilter[g] = value;
    });

    setFilters(newFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExercise]);

  const prepareData = (
    data: DimentionItem[]
  ): ApexAxisChartSeries | ApexNonAxisChartSeries => {
    const series: { name: string; data: number[] }[] = [];

    if (chart.config.aggregations.length > 0) {
      chart.config.aggregations
        .map((a) => a.operation)
        .forEach((m, index) => {
          series.push({
            name: `Serie ${index}`,
            data: data.map((d) => d.values[m]),
          });
        });
    } else {
      chart.config.formula.forEach((m, index) => {
        const key = Object.keys(m).pop() as string;
        series.push({
          name: `Serie ${index}`,
          data: data.map((d) => d.values[key]),
        });
      });
    }

    return series;
  };
  if (!['bar', 'line'].includes(chart.chartType)) return <div />;
  return (
    <ChartWrapper
      handleChange={(tab) =>
        setActivePeriod(periods.find((p) => p.id === tab.value))
      }
      filters={chart.config.filters}
      handleChangeFilter={handleChangeFilter}
      title={chart.name}
      subTitle={chart.subTitle}
      tabs={periods.map((p) => ({ value: p.id, label: p.name }))}
    >
      {isLoading && <Loading />}
      {isSuccess && Array.isArray(data) && (
        <div className={`grid ${getGridColsClass(data.length)} gap-6 mx-auto p-4`}>
          {data.map((d, index) => {
            const options: ApexCharts.ApexOptions = {
              chart: {
                id: `${chart.id}-${index}`,
              },
              plotOptions: {
                bar: {
                  columnWidth: '40%',
                  barHeight: '10%',
                },
              },
              xaxis: {
                categories: d.groupedBy.data.map((d) => d.label),
              },
            };

            return (
              <div key={d.groupedBy.label + '-' + index} >
                <Chart
                  
                  options={options}
                  series={prepareData(d.groupedBy.data)}
                  type={chart.chartType}
                  height={170}
                />
              </div>
            );
          })}
        </div>
      )}
    </ChartWrapper>
  );
}
