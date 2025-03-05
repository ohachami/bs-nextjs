import { useGroupedProducts } from '@/services/referential.Service';
import Filter from './Filter';
import { FC } from 'react';
import { DashboardFilterProps } from '@/types/dashboard';

const ProductFilter: FC<DashboardFilterProps<string[]>> = ({
  onChange,
  values,
}) => {
  const { data, status } = useGroupedProducts();

  if (status === 'pending') {
    return <span>Loading...</span>;
  }

  if (status === 'error' || !data) {
    return <span>Error fetching data</span>;
  }

  return (
    <Filter
      data={data}
      basecomp="treecombobox"
      multiSelect
      selectChildren
      selectParent
      title="Produits"
      placeholder="Chercher"
      mapOption={(pg) => ({
        id: pg.id,
        label: pg.name,
        children: pg.products.map((p) => ({
          id: p.id,
          label: p.name,
        })),
      })}
      onChange={onChange}
      values={values}
    />
  );
};

export default ProductFilter;
