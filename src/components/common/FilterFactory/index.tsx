import React from 'react';
import ProductFilter from './GroupedProducts';
import RegionFilter from './RegionFilter';
import ExercisePeriodFilter from './ExercisePeriodFilter';
import DemandTypeFilter from './DemandTypeFilter';
import TopFilter from './TopFilter';
import { DashboardFilterProps } from '@/types/dashboard';
import ContractFilter from './ContractFilter';
import SiteFilter from "@/components/common/FilterFactory/SiteFilter";
import TreatmentFilter from "@/components/common/FilterFactory/TreatmentFilter";

type Props<T> = DashboardFilterProps<T> & {
  module: string;
};

const FilterFactory = <T,>({ module, onChange, values = [], value, sbuId }: Props<T>) => {
  switch (module) {
    case 'products':
      return <ProductFilter onChange={onChange} values={values as string[]}  />;
    case 'regions':
      return <RegionFilter onChange={onChange} values={values as string[]} />;
    case 'demandType':
      return <DemandTypeFilter onChange={onChange} values={values as string[]} />;
    case 'top':
      return <TopFilter onChange={onChange} value={value} />;
    case 'contractTypes':
      return <ContractFilter onChange={onChange} value={value} />;
    case 'sites':
      return <SiteFilter onChange={onChange} values={values as string[]} sbuId={sbuId} />;
    case 'treatments':
      return <TreatmentFilter onChange={onChange} values={values as string[]} sbuId={sbuId} />;
    default:
      return <ExercisePeriodFilter onChange={onChange} values={values as string[]} />;
  }
};

export default FilterFactory;
