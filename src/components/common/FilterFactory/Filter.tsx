import { TreeItem } from '@/types/common/TreeComboboxFilterTypes';
import { TOption } from '@/utils/types';
import { useEffect, useState } from 'react';
import MultiSelect from './MultiSelect';
import TreeCombobox from '../TreeCombobox';

type Filter<T> = {
  title: string;
  placeholder: string;
  data: T[];
  onChange: (values: string[]) => void;
} & (
  | {
      basecomp: 'multiselect';
      mapOption: (data: T) => TOption<string>;
    }
  | {
      basecomp: 'treecombobox';
      selectChildren: boolean;
      multiSelect: boolean;
      mapOption: (data: T) => TreeItem;
    }
);

const Filter = <T,>(props: Filter<T>) => {
  const { basecomp, title, placeholder, data, onChange, mapOption } = props;

  const [values, setValues] = useState<TOption<string>[]>([]);

  const handleChange = (option: TOption<string>) => {
    setValues((prev) =>
      prev.some((o) => o.value === option.value)
        ? prev.filter((o) => o.value !== option.value)
        : [...prev, option]
    );
  };

  useEffect(() => {
    onChange(values.map((o) => o.value));
  }, [values]);

  if (basecomp === 'treecombobox') {
    const { selectChildren, multiSelect } = props;
    return (
      <div>
        <TreeCombobox
          buttonVariant="with-badges"
          items={data.map(mapOption)}
          title={title}
          placeholder={placeholder}
          selectChildren={selectChildren}
          multiSelect={multiSelect}
          onSelectionChange={(selectedItems: string[]) => {
            onChange(selectedItems);
          }}
        />
      </div>
    );
  }

  if (basecomp === 'multiselect') {
    return (
      <MultiSelect
        options={data.map(mapOption)}
        title={title}
        placeholder={placeholder}
        values={values}
        onChange={handleChange}
        onClear={() => setValues([])}
      />
    );
  }

  return <div>basecomp not managed</div>;
};

export default Filter;
