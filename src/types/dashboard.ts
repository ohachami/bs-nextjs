export const CHART_FILTERS = {
  regions: 'regions',
  periods: 'periods',
  products: 'products',
};

interface Metrics {
  sum: number;
  max: number;
  min: number;
  avg: number;
}

export interface DimentionItem {
  label: string;
  values: Metrics;
}

interface GroupingItem {
  label: string;
  data: DimentionItem[];
}

interface GroupedDataItem {
  groupedBy: GroupingItem;
}

interface Aggregation {
  metric: string;
  operation: 'sum' | 'max' | 'min' | 'avg';
}

interface Filter {
  name: string;
  key: string;
  values: string[];
}

export type QueryDefinition = {
  entity: string;
  aggregations: Aggregation[];
  groupedBy: string[];
  filters: Filter[];
};

export type ChartIF = {
  id: string;
  code: string;
  name: string;
  subTitle: string;
  type: 'bar' | 'boxPlot';
  comment: string;
  displayType: 'VISUALIZE' | 'COMPARE';
  chartType:
    | 'line'
    | 'area'
    | 'bar'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'candlestick'
    | 'boxPlot'
    | 'radar'
    | 'polarArea'
    | 'rangeBar'
    | 'rangeArea'
    | 'treemap';
  config: QueryDefinition;
};

export type GroupedData = GroupedDataItem[];
export type MetricsData = Metrics;
