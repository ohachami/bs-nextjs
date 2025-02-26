'use client';
import Loading from '@/app/loading';
import { useAggregations } from '@/services/aggregations.service';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import {
  ChartIF,
  CHART_FILTERS,
  DimentionItem,
  Filter,
} from '@/types/dashboard';
import { PeriodIF } from '@/types/refExercise/config';
import { useEffect, useState, useMemo, useCallback } from 'react';
import Chart from 'react-apexcharts';
import { ChartWrapper } from './ChartWrapper';
import { useComparaisonVersionIds } from '@/store/consolidation/comparaisonVersionIds';
import { MarketableConfig, TOption } from '@/utils/types';
import { set } from 'date-fns';

const getGridColsClass = (length: number) => {
  if (length <= 1) return 'grid-cols-1';
  if (length === 2) return 'grid-cols-2';
  if (length === 3) return 'grid-cols-3';
  if (length === 4) return 'grid-cols-2 md:grid-cols-4';
  if (length >= 5) return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  return 'grid-cols-3';
};

const buildFilters = (filters: Record<string, any[]>, filterConfig: Filter[]) =>
  Object.entries(filters).reduce<Filter[]>((acc, [name, values]) => {
    const currentFilter = filterConfig.find((f) => f.name === name);
    if (currentFilter) {
      acc.push({
        name,
        key: currentFilter.key,
        values,
      });
    }
    return acc;
  }, []);

export function ChartBox({
  chart,
  globalFilters,
  marketableType,
}: {
  chart: ChartIF;
  marketableType?: MarketableConfig;
  globalFilters: Record<string, any[]>;
  setGlobalFilter: (key: string, value: string[]) => void;
}) {
  const { currentExercise } = useExerciseStore();
  const { versionIds } = useComparaisonVersionIds();

  // Compute initial periods from currentExercise
  const initialPeriods = useMemo(
    () => currentExercise?.periods.map((p) => p.period) || [],
    [currentExercise]
  );
  const [activePeriod, setActivePeriod] = useState<PeriodIF>();
  const [periods, setPeriods] = useState<PeriodIF[]>(initialPeriods);

  // Initial filters state: always include periods from currentExercise
  const [filters, setFilters] = useState<Record<string, any[]>>({
    [CHART_FILTERS.periods]:
      currentExercise?.periods?.map((p) => p.period.id) || [],
  });

  const handleChangeActivePeriod = (tab: TOption<string>) => {
    setActivePeriod(periods.find((p) => p.id === tab.value));
  };
  useEffect(() => {
    const newFilters = { ...filters };
    newFilters[CHART_FILTERS.periods] = [activePeriod?.id];
    setFilters(newFilters);
  }, [activePeriod?.id]);
  // Update filters when marketableType changes
  useEffect(() => {
    if (marketableType) {
      setFilters((prev) => ({
        ...prev,
        [CHART_FILTERS.productType]: [marketableType.id],
      }));
    }
  }, [marketableType?.id]);

  // Merge global filters into internal filters
  useEffect(() => {
    setFilters((prev) => {
      const updated = { ...prev };
      Object.keys(globalFilters).forEach((key) => {
        if (updated[key]) {
          updated[key] = Array.from(
            new Set([...updated[key], ...globalFilters[key]])
          );
        }
      });
      return updated;
    });
  }, [globalFilters]);

  // Update periods based on currentExercise and period filters
  useEffect(() => {
    if (currentExercise) {
      const selected = currentExercise.periods
        .filter((p) => filters[CHART_FILTERS.periods].includes(p.period.id))
        .map((p) => p.period);
      setPeriods(selected.length ? selected : initialPeriods);
    }
  }, [currentExercise, filters, initialPeriods]);

  const handleChangeFilter = useCallback((name: string, values: string[]) => {
    setFilters((prev) => {
      if (!prev[name]) return prev;
      return {
        ...prev,
        [name]: Array.from(new Set([...prev[name], ...values])),
      };
    });
  }, []);

  const aggregatedFilters = useMemo(
    () => buildFilters(filters, chart.config?.filters || []),
    [filters, chart.config?.filters]
  );

  const { data, isSuccess, isLoading, refetch } = useAggregations({
    entity: chart.config.entity,
    aggregations: chart.config.aggregations,
    groupedBy: chart.config.groupedBy,
    filters: aggregatedFilters,
    formula: chart.config.formula,
    dataVersionsIds: versionIds,
  });

  // Prepare chart series data
  const prepareData = useCallback(
    (dataItems: DimentionItem[]) => {
      const series: { name: string; data: any[] }[] = [];

      if (chart.chartType === 'boxPlot') {
        const boxSeries = {
          name: 'BoxPlot Series',
          data: dataItems.map((item) => {
            const { MIN, AVG, MAX } = item.values;
            return {
              x: item.label,
              y: [MIN, 0, AVG, 0, MAX],
            };
          }),
        };
        series.push(boxSeries);
      } else if (
        chart.config.aggregations &&
        chart.config.aggregations.length > 0
      ) {
        chart.config.aggregations.forEach((agg, index) => {
          series.push({
            name: `Serie ${index}`,
            data: dataItems.map((d) => d.values[agg.operation]),
          });
        });
      } else if (chart.config.formula && chart.config.formula.length > 0) {
        chart.config.formula.forEach((formulaObj, index) => {
          const key = Object.keys(formulaObj).pop() as string;
          series.push({
            name: `Serie ${index}`,
            data: dataItems.map((d) => d.values[key]),
          });
        });
      }

      return series;
    },
    [chart.config, chart.type, filters]
  );

  // Generate chart options for each chart instance
  const chartOptions = useCallback(
    (index: number, d: any) => ({
      ...(marketableType && { colors: [marketableType.color] }),
      chart: { id: `${chart.id}-${index}` },
      plotOptions: {
        bar: {
          columnWidth: '40%',
          barHeight: '60%',
        },
        boxPlot: {
          colors: {
            upper: '#5C4742',
            lower: '#A5978B',
          },
        },
      },
      xaxis: {
        categories: d.groupedBy.data.map((item: any) => item.label),
      },
    }),
    [chart.id, marketableType]
  );

  return (
    <ChartWrapper
      handleChange={handleChangeActivePeriod}
      filters={chart.config.filters}
      handleChangeFilter={handleChangeFilter}
      title={chart.name}
      subTitle={chart.subTitle}
      tabs={periods
        .filter((e) => filters['periods'].includes(e.id))
        .sort((a, b) => a.sortedBy - b.sortedBy)
        .map((p) => ({ value: p.id, label: p.name }))}
    >
      {isLoading && <Loading />}
      {isSuccess && Array.isArray(data) && (
        <div
          className={`grid ${getGridColsClass(data.length)} gap-6 mx-auto p-4`}
        >
          {data.map((d, index) => (
            <div key={`${d.groupedBy.label}-${index}`}>
              <Chart
                options={chartOptions(index, d)}
                series={prepareData(d.groupedBy.data)}
                type={chart.chartType}
                height={350}
              />
            </div>
          ))}
        </div>
      )}
    </ChartWrapper>
  );
}
