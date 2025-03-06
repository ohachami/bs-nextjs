import { TOP_FILTER_DATA } from '@/utils/constants';
import Filter from './Filter';
import React from 'react';
import { DashboardFilterProps } from '@/types/dashboard';
import { TOption } from '@/utils/types';

export default function TopFilter<T>({
  onChange,
  value,
}: DashboardFilterProps<T>) {
  const handleOnChange = (value: T) => onChange(Number(value));
  return (
    <Filter
      data={TOP_FILTER_DATA as TOption<T>[]}
      basecomp="select"
      title="Top"
      placeholder="Top"
      onChange={handleOnChange}
      value={value}
      mapOption={(option) => ({
        value: option.value,
        label: option.label,
      })}
    />
  );
}
