import { useRegions } from '@/services/referential.Service';
import Filter from './Filter';
import { FC } from 'react';

type Props = {
  onChange: (values: string[]) => void;
  values: string[];
};

const RegionFilter: FC<Props> = ({ onChange, values }) => {
  const { data, status } = useRegions();

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
