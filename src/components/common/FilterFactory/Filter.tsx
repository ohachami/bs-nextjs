import { TreeItem } from '@/types/common/TreeComboboxFilterTypes';
import { TOption } from '@/utils/types';
import { useCallback, useEffect, useState } from 'react';
import MultiSelect from './MultiSelect';
import TreeCombobox from '../TreeCombobox';

type Filter<T> = {
  title: string;
  placeholder: string;
  data: T[];
  onChange: (values: string[]) => void;
  values: string[];
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
  const { basecomp, title, placeholder, data, onChange, mapOption, values } =
    props;
  const handleChangeMultiSelect = (option: TOption<string>) => {
    const newValues = values.includes(option.value)
      ? values.filter((v) => v !== option.value)
      : [...values, option.value];
    onChange(newValues);
  };
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
          defaultValues={data
            .map(mapOption)
            .map((group) => ({
              ...group,
              children:
                group.children?.filter((child) => values.includes(child.id)) ||
                [],
            }))
            .filter((group) => group.children.length > 0)}
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
        values={data.map(mapOption).filter((d) => values.includes(d.value))}
        onChange={(e) => {
          // onChange([e.value]);
          handleChangeMultiSelect(e);
        }}
        onClear={() => onChange([])}
      />
    );
  }

  return <div>basecomp not managed</div>;
};

export default Filter;
