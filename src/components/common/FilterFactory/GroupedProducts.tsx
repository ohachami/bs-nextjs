import { useGroupedProducts } from '@/services/referential.Service';
import Filter from './Filter';
import { FC } from 'react';

type Props = {
  onChange: (values: string[]) => void;
};

const ProductFilter: FC<Props> = ({ onChange }) => {
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
    />
  );
};

export default ProductFilter;
