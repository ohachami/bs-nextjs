'use client';
import Loading from '@/app/loading';
import { useAggregations } from '@/services/aggregations.service';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import {
  ChartIF,
  CHART_FILTERS,
  DimentionItem,
  Filter,
  GroupedDataItem,
} from '@/types/dashboard';
import { PeriodIF } from '@/types/refExercise/config';
import { useEffect, useState, useMemo, useCallback } from 'react';
import Chart from 'react-apexcharts';
import { ChartWrapper } from './ChartWrapper';
import { useComparaisonVersionIds } from '@/store/consolidation/comparaisonVersionIds';
import { MarketableConfig, TOption } from '@/utils/types';

const getGridColsClass = (length: number) => {
  if (length <= 1) return 'grid-cols-1';
  if (length === 2) return 'grid-cols-2';
  return 'grid-cols-3';
};

const buildFilters = (
  filters: Record<string, string[]>,
  filterConfig: Filter[]
) => {

  const result =  Object.entries(filters).reduce<Filter[]>((acc, [name, values]) => {
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

  filterConfig.forEach(config => {
    if(!result.find((f) => f.name === config.name)) {
      result.push(config)
    }
  })

  return result;
}

export function ChartBox({
  chart,
  globalFilters,
  marketableType,
}: {
  chart: ChartIF;
  marketableType?: MarketableConfig;
  globalFilters: Record<string, string[]>;
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
  const [periods] = useState<PeriodIF[]>(initialPeriods);
  const [groupBy, setGroupBy] = useState<string[]>(chart.config.groupedBy);
  const [limit, setLimit] = useState<number>(chart.config.limit || 10);

  useEffect(() => {
    setGroupBy(chart.config.groupedBy);
  }, [chart.config.groupedBy]);

  // Initial filters state: always include periods from currentExercise
  const [filters, setFilters] = useState<Record<string, string[]>>({
    [CHART_FILTERS.periods]:
      currentExercise?.periods?.map((p) => p.period.id) || [],
  });

  const handleChangeActivePeriod = (tab: TOption<string>) => {
    setActivePeriod(periods.find((p) => p.id === tab.value));
  };

  useEffect(() => {
    if (activePeriod) {
      const newFilters = { ...filters };
      newFilters[CHART_FILTERS.periods] = [activePeriod?.id];
      setFilters(newFilters);
    }
  }, [activePeriod]);

  // Update filters when marketableType changes
  useEffect(() => {
    if (marketableType) {
      setFilters((prev) => ({
        ...prev,
        [CHART_FILTERS.productType]: [marketableType.id || ''],
      }));
    }
  }, [marketableType]);
  // Merge global filters into internal filters
  useEffect(() => {
    setFilters((prev) => {
      const updated = { ...prev };
      Object.keys(globalFilters).forEach((key) => {
        if (!updated[key]) {
          updated[key] = [];
        }

        updated[key] = Array.from(new Set([...globalFilters[key]]));

        if (chart.config.groupingKey && ['regions'].includes(key)) {
          const temp = [...groupBy];
          if (updated[key].length > 0) {
            temp[0] = chart.config.groupingKey;
          } else {
            temp[0] = chart.config.groupedBy[0];
          }
          setGroupBy(temp);
        }
      });
      return updated;
    });
  }, [globalFilters]);

  const handleChangeFilter = useCallback((name: string, values: string[]) => {
    const newFilter = { ...filters };
    newFilter[name] = values;
    if (chart.config.groupingKey && ['regions'].includes(name)) {
      const temp = [...groupBy];
      if (newFilter[name].length > 0) {
        temp[0] = chart.config.groupingKey;
      } else {
        temp[0] = chart.config.groupedBy[0];
      }
      setGroupBy(temp);
    }
    setFilters(newFilter);
  }, []);

  const aggregatedFilters = useMemo(
    () => buildFilters(filters, chart.config?.filters || []),
    [filters, chart.config?.filters]
  );

  const { data, isSuccess, isLoading } = useAggregations({
    entity: chart.config.entity,
    aggregations: chart.config.aggregations,
    groupedBy: groupBy,
    filters: aggregatedFilters,
    formula: chart.config.formula,
    dataVersionsIds: versionIds,
    limit: limit,
  });

  // Prepare chart series data
  const prepareData = useCallback(
    (dataItems: DimentionItem[]) => {
      const series: {
        name: string;
        data:
          | {
              x: string;
              y: number[];
            }[]
          | number[];
      }[] = [];

      if (chart.chartType === 'boxPlot') {
        const boxSeries = {
          name: 'BoxPlot Series',
          data: dataItems.map((item) => {
            const { MIN, AVG, MAX } = item.values;
            return {
              x: item.label,
              y: [
                Math.round(MIN),
                Math.round(AVG),
                Math.round(AVG),
                Math.round(AVG),
                Math.round(MAX),
              ],
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
            data: dataItems.map((d) => Math.round(d.values[agg.operation])),
          });
        });
      } else if (chart.config.formula && chart.config.formula.length > 0) {
        chart.config.formula.forEach((formulaObj, index) => {
          const key = Object.keys(formulaObj).pop() as string;
          series.push({
            name: `Serie ${index}`,
            data: dataItems.map((d) => Math.round(d.values[key])),
          });
        });
      }

      return series;
    },
    [chart.config, chart.type, filters]
  );

  // Generate chart options for each chart instance
  const chartOptions = useCallback(
    (index: number, d: GroupedDataItem) => ({
      ...(marketableType && { colors: marketableType.colors }),
      chart: {
        id: `${chart.id}-${index}`,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false, // Disable selection zoom
            zoom: false, // Disable zoom
            zoomin: false, // Disable zoom in
            zoomout: false, // Disable zoom out
            pan: false, // Disable panning
            reset: false, // Disable reset zoom
          },
        },
      },
      legend: {
        show: false,
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
          barHeight: '60%',
          distributed: true,
        },
        boxPlot: {
          colors: {
            upper: '#CA7C45',
            lower: '#F4CDB2',
            distributed: true,
          },
        },
      },
      yaxis: {
        labels: {
          formatter: function (val: number) {
            return Math.round(val).toFixed(0);
          },
        },
      },
      xaxis: {
        categories: d.groupedBy.data.map((item: DimentionItem) => item.label),
      },
    }),
    [chart.id, marketableType]
  );
  return (
    <ChartWrapper
      handleChange={handleChangeActivePeriod}
      filtersConfig={chart.config.filters}
      handleChangeFilter={handleChangeFilter}
      title={chart.name}
      subTitle={chart.subTitle}
      filters={filters}
      {...(chart.config.limit && {
        limit,
        handleChangeLimit: (e) => setLimit(e),
      })}
      tabs={periods
        .filter(
          (e) =>
            !globalFilters['periods'] ||
            globalFilters['periods']?.length === 0 ||
            globalFilters['periods'].includes(e.id)
        )
        .sort((a, b) => a.sortedBy - b.sortedBy)
        .map((p) => ({ value: p.id, label: p.name }))}
    >
      {isLoading && <Loading />}
      {isSuccess && Array.isArray(data) && (
        <div
          className={`grid ${getGridColsClass(data.length)} gap-6 mx-auto p-4`}
        >
          {data.length > 0 ? (
            data.map((d, index) => (
              <div
                className="flex flex-col"
                key={`${d.groupedBy.label}-${index}`}
              >
                <Chart
                  options={chartOptions(index, d)}
                  series={prepareData(d.groupedBy.data)}
                  type={chart.chartType}
                  height={350}
                />
                 {data.length > 1 && <span className='text-muted-foreground mx-auto'>{d.groupedBy.label}</span>}
              </div>
            ))
          ) : (
            <div className="flex justify-center align-center">
              <span className="text-center text-muted-foreground font-medium">
                {"Aucune donnée n'a été trouvée pour ce graphe"}
              </span>
            </div>
          )}
        </div>
      )}
    </ChartWrapper>
  );
}
