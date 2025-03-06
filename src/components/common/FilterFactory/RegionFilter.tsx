import { useSalesRegions } from '@/services/referential.Service';
import Filter from './Filter';
import { FC } from 'react';
import { DashboardFilterProps } from '@/types/dashboard';

const RegionFilter: FC<
  DashboardFilterProps<string[]> & {
    versionIds: string[];
  }
> = ({ onChange, values, versionIds }) => {
  const { data, status } = useSalesRegions(versionIds);

  if (status === 'pending') {
    return <span>Loading...</span>;
  }

  if (status === 'error' || !data) {
    return <span>Error fetching data</span>;
  }
  return (
    <Filter
      data={data}
      basecomp="multiselect"
      title="Régions"
      placeholder="Chercher"
      mapOption={(region) => ({ label: region.name, value: region.id })}
      onChange={onChange}
      values={values}
    />
  );
};

export default RegionFilter;
