"use client"
import Loading from "@/app/loading"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAggregations } from "@/services/aggregations.service"
import { useExerciseStore } from "@/store/exercises/useExerciseStore"
import { ChartIF, CHART_FILTERS, DimentionItem } from "@/types/dashboard"
import { PeriodIF } from "@/types/refExercise/config"
import { useEffect, useState } from "react"
import Chart from "react-apexcharts";

export function ChartBox({chart, globalFilters}: {chart: ChartIF, globalFilters: Record<string, string[]>}) {
  const [activePeriod, setActivePeriod] = useState<PeriodIF>()
  const {currentExercise} = useExerciseStore();
  const [periods, setPeriods] = useState<PeriodIF[]>(currentExercise?.periods || [])
  //internal filters
  const [filters, setFilters] = useState<Record<string, string[]>>({
    [CHART_FILTERS.periods]: currentExercise?.periods?.map(p => p.id) || []
  });
  //TODO get filters to display from filter factory

  //TODO call api aggregation : 
  const {data, isSuccess, isLoading} = useAggregations(chart.config);
    

    useEffect(() => {
        if(globalFilters) {
            const newFilters = {...filters}
            Object.keys(globalFilters).map(g => {
                const value = Array.from(new Set([...newFilters[g], ...globalFilters[g]]));
                newFilters[g] = value;
            })
            setFilters(newFilters);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globalFilters])

    useEffect(() => {
        const selectedPeriods = currentExercise?.periods?.filter(p => filters[CHART_FILTERS.periods].includes(p.id)) || currentExercise?.periods || []
        setPeriods(selectedPeriods);
        setActivePeriod(selectedPeriods[0])
        const query = {...chart.config.filters}
        //mutate chart config to send new query
        Object.keys(filters).map(g => {
            const value = [...filters[g]];
            query[g] = value;
        })
        chart.config.filters = query;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentExercise, filters])


    const prepareData = (data: DimentionItem[]) => {
        const series: {name: string; data: number[]}[] = []
        chart.config.aggregations.map(a => a.operation).forEach((m, index) => {
            series.push({
                name: `Serie ${index}`,
                data: data.map(d => d.values[m])
            })
        })
        return series;
    }
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex justify-between">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                <CardTitle>{chart.name}</CardTitle>
                <CardDescription>
                    {chart.subTitle}
                </CardDescription>
            </div>
            <div>
                {/** filters here*/}
            </div>
        </div>
        <div className="flex">
          {periods.map((p) => {
            
            return (
              <button
                key={p.id}
                data-active={activePeriod?.id === p.id}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActivePeriod(p)}
              >
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {p.name}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
      {isLoading && <Loading />}
      {isSuccess && 
        <div className="mixed-chart">
            {data.map((d, index) => {
                const options = {
                    chart: {
                      id: `${chart.id}-${index}`
                    },
                    xaxis: {
                      categories: d.groupedBy.data.map(d => d.label)
                    }
                  }
                  
                return(
                    <Chart
                        key={d.groupedBy.label}
                        options={options}
                        series={prepareData(d.groupedBy.data)}
                        type={chart.type}
                        width="500"
                        />
                )
            })}
            
        </div>}
      
      </CardContent>
    </Card>
  )
}
