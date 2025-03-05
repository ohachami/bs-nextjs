import { CONTRACT_FILTER_DATA } from '@/utils/constants';
import Filter from './Filter';
import React from 'react';
import { DashboardFilterProps } from '@/types/dashboard';

export default function ContractFilter({
  onChange,
  values,
}: DashboardFilterProps<string>) {
  
  return (
    <Filter
      data={CONTRACT_FILTER_DATA}
      basecomp="multiselect"
      title="Type demande"
      placeholder="Type demande"
      onChange={onChange}
      values={values as string[]}
      mapOption={(option) => ({
        value: option.value,
        label: option.label,
      })}
    />
  );
}
