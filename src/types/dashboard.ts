import { Section } from './exercise';
import { User } from './user';

export const CHART_FILTERS = {
  regions: 'regions',
  periods: 'periods',
  products: 'products',
  productType: 'product_type',
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

export interface GroupedDataItem {
  dataVersionId: string;
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
  hidden?: boolean;
}

export type QueryDefinition = {
  entity: string;
  groupingKey?: string;
  aggregations: Aggregation[];
  groupedBy: string[];
  filters: Filter[];
  formula: Record<string, string>[];
  dataVersionsIds: string[];
  limit?: number;
};

export type ChartIF = {
  id: string;
  code: string;
  name: string;
  subTitle: string;
  type: 'bar' | 'boxPlot';
  comment: string;
  sortedBy: number;
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

export interface DashboardProps {
  section: Section;
  user: User;
  disableCompare?: boolean;
}

export interface DashboardFilterProps<T> {
  onChange<T>(values: T|string): void;
  values?: T | string[];
  value?: string;
}
