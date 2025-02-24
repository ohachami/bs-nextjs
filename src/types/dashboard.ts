export const CHART_FILTERS = {
  regions: 'regions',
  periods: 'periods',
  products: 'products',
};

interface Metrics {
  SUM: number;
  MAX: number;
  MIN: number;
  AVG: number;
}

export interface DimentionItem {
  label: string;
  values: Record<string, number>;
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
  operation: 'SUM' | 'MAX' | 'MIN' | 'AVG';
}

export interface Filter {
  name: string;
  key: string;
  values: string[];
}

export type QueryDefinition = {
  entity: string;
  aggregations: Aggregation[];
  groupedBy: string[];
  filters: Filter[];
  formula: Record<string, string>[];
  dataVersionsIds: string[];
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
