import { TOP_FILTER_DATA } from '@/utils/constants';
import Filter from './Filter';
import React from 'react';
type Props = {
  onChange: (values: string[]) => void;
  values: string[];
};
export default function TopFilter({ onChange, values }: Props) {
  return (
    <Filter
      data={TOP_FILTER_DATA}
      basecomp="multiselect"
      title="Régions"
      placeholder="Chercher"
      mapOption={(item) => ({ value: item.value, label: item.label })}
      onChange={onChange}
      values={values}
    />
  );
}
