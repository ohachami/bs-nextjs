import React from 'react';
import ProductFilter from './GroupedProducts';
import RegionFilter from './RegionFilter';
import ExercisePeriodFilter from './ExercisePeriodFilter';
import DemandTypeFilter from './DemandTypeFilter';

type Props = {
  module: string;
  onChange: (values: string[]) => void;
  values?: string[];
};

const FilterFactory: React.FC<Props> = ({ module, onChange, values = [] }) => {
  switch (module) {
    case 'products':
      return <ProductFilter onChange={onChange} values={values} />;
    case 'regions':
      return <RegionFilter onChange={onChange} values={values} />;
    case 'demandType':
      return <DemandTypeFilter onChange={onChange} values={values} />;
    default:
      return <ExercisePeriodFilter onChange={onChange} values={values} />;
  }
};

export default FilterFactory;
