import { TOP_FILTER_DATA } from '@/utils/constants';
import Filter from './Filter';
import React from 'react';
import { DashboardFilterProps } from '@/types/dashboard';

export default function TopFilter({
  onChange,
  value,
}: DashboardFilterProps<string>) {
  return (
    <Filter
      data={TOP_FILTER_DATA}
      basecomp="select"
      title="Top"
      placeholder="Top"
      onChange={onChange}
      value={value}
      mapOption={(option) => ({
        value: option.value,
        label: option.label,
      })}
    />
  );
}
