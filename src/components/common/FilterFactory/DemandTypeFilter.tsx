import { useDemandTypes } from '@/services/referential.Service';
import Filter from './Filter';
import { FC } from 'react';
import { DashboardFilterProps } from '@/types/dashboard';

const DemandTypeFilter: FC<DashboardFilterProps<string[]>> = ({
  onChange,
  values,
}) => {
  const { data, status } = useDemandTypes();

  if (status === 'pending') {
    return <span>Loading...</span>;
  }

  if (status === 'error' || !data) {
    return <span>Error fetching data</span>;
  }

  return (
    <Filter
      data={data.filter((d) => d.name.toLowerCase() !== 'réalisé')}
      basecomp="multiselect"
      title="Statut de demande"
      placeholder="Chercher"
      mapOption={(demandType) => ({
        label: demandType.name,
        value: demandType.id,
      })}
      onChange={onChange}
      values={values}
    />
  );
};

export default DemandTypeFilter;
