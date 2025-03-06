import React from 'react';
import ProductFilter from './GroupedProducts';
import RegionFilter from './RegionFilter';
import ExercisePeriodFilter from './ExercisePeriodFilter';
import DemandTypeFilter from './DemandTypeFilter';
import TopFilter from './TopFilter';
import { DashboardFilterProps } from '@/types/dashboard';
import ContractFilter from './ContractFilter';

type Props<T> = DashboardFilterProps<T> & {
  module: string;
  versionIds?: string[];
};

const FilterFactory = <T,>({
  module,
  onChange,
  values,
  value,
  versionIds = [],
}: Props<T>) => {
  switch (module) {
    case 'products':
      return (
        <ProductFilter
          onChange={onChange}
          values={values as string[]}
          versionIds={versionIds}
        />
      );
    case 'regions':
      return (
        <RegionFilter
          onChange={onChange}
          values={values as string[]}
          versionIds={versionIds}
        />
      );
    case 'demandType':
      return (
        <DemandTypeFilter onChange={onChange} values={values as string[]} />
      );
    case 'top':
      return <TopFilter onChange={onChange} value={value} />;
    case 'contractTypes':
      return <ContractFilter onChange={onChange} values={values as string[]} />;
    default:
      return (
        <ExercisePeriodFilter onChange={onChange} values={values as string[]} />
      );
  }
};

export default FilterFactory;
