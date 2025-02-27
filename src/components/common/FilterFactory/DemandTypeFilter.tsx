import { useDemandTypes } from '@/services/referential.Service';
import Filter from './Filter';
import { FC } from 'react';

type Props = {
  onChange: (values: string[]) => void;
  values: string[];
};

const DemandTypeFilter: FC<Props> = ({ onChange, values }) => {
  const { data, status } = useDemandTypes();

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
      title="Type de demande"
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
