import React from 'react';
import ProductFilter from './GroupedProducts';
import RegionFilter from './RegionFilter';
import ExercisePeriodFilter from './ExercisePeriodFilter';
import DemandTypeFilter from './DemandTypeFilter';
import TopFilter from './TopFilter';
import { DashboardFilterProps } from '@/types/dashboard';

type Props<T> = DashboardFilterProps<T> & {
  module: string;
};

const FilterFactory = <T,>({ module, onChange, values = [], value }: Props<T>) => {
  switch (module) {
    case 'products':
      return <ProductFilter onChange={onChange} values={values} />;
    case 'regions':
      return <RegionFilter onChange={onChange} values={values} />;
    case 'demandType':
      return <DemandTypeFilter onChange={onChange} values={values} />;
    case 'top':
      return <TopFilter onChange={onChange} value={value} />;
    default:
      return <ExercisePeriodFilter onChange={onChange} values={values} />;
  }
};

export default FilterFactory;
