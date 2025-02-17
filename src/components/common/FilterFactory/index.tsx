import React from 'react';
import ProductFilter from './GroupedProducts';
import RegionFilter from './RegionFilter';
import ExercisePeriodFilter from './ExercisePeriodFilter';

type Props = {
  module: 'product' | 'region' | 'period';
  onChange: (values: string[]) => void;
};

const FilterFactory: React.FC<Props> = ({ module, onChange }) => {
  switch (module) {
    case 'product':
      return <ProductFilter onChange={onChange} />;
    case 'region':
      return <RegionFilter onChange={onChange} />;
    default:
      return <ExercisePeriodFilter onChange={onChange} />;
  }
};

export default FilterFactory;
