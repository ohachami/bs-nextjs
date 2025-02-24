import React from 'react';
import ProductFilter from './GroupedProducts';
import RegionFilter from './RegionFilter';
import ExercisePeriodFilter from './ExercisePeriodFilter';

type Props = {
  module: string;
  onChange: (values: string[]) => void;
};

const FilterFactory: React.FC<Props> = ({ module, onChange }) => {
  switch (module) {
    case 'products':
      return <ProductFilter onChange={onChange} />;
    case 'regions':
      return <RegionFilter onChange={onChange} />;
    default:
      return <ExercisePeriodFilter onChange={onChange} />;
  }
};

export default FilterFactory;
