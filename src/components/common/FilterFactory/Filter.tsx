import MultiSelect from './MultiSelect';
import TreeCombobox from '../TreeCombobox';
import SelectComponent from './Select';
import { TreeItem } from '@/types/common/TreeComboboxFilterTypes';
import { FilterProps } from '@/types/filters';
import { TOption } from '@/utils/types';

// Helper function for treecombobox branch
function searchTree(
  items: TreeItem[],
  idsSearch: string[]
): { id: string; label: string }[] {
  let results: { id: string; label: string }[] = [];

  for (const item of items) {
    if (idsSearch.includes(item.id)) {
      results.push(item);
    }
    if (item.children) {
      results = results.concat(searchTree(item.children, idsSearch));
    }
  }

  return results;
}

const Filter = <T,>(props: FilterProps<T>) => {
  // Destructure common props
  const { basecomp, title, placeholder, data, mapOption } = props;

  if (basecomp === 'treecombobox') {
    // Narrow props for treecombobox
    const {
      selectChildren,
      multiSelect,
      selectParent,
      onChange,
      values = [],
    } = props;
    return (
      <div>
        <TreeCombobox
          buttonVariant="with-badges"
          items={data.map(mapOption)}
          title={title}
          placeholder={placeholder}
          selectChildren={selectChildren}
          multiSelect={multiSelect}
          selectParent={selectParent}
          onSelectionChange={(selectedItems) => onChange(selectedItems)}
          values={searchTree(data.map(mapOption), values)}
        />
      </div>
    );
  } else if (basecomp === 'multiselect') {
    // Narrow props for multiselect
    const { onChange, values = [] } = props;

    const handleChangeMultiSelect = (option: TOption<string>) => {
      const newValues = values.includes(option.value)
        ? values.filter((v) => v !== option.value)
        : [...values, option.value];
      onChange(newValues);
    };

    return (
      <MultiSelect
        options={data.map(mapOption)}
        title={title}
        placeholder={placeholder}
        values={data.map(mapOption).filter((d) => values.includes(d.value))}
        onChange={handleChangeMultiSelect}
        onClear={() => onChange([])}
      />
    );
  } else if (basecomp === 'select') {
    // Narrow props for select
    const { onChange, value } = props;
    return (
      <SelectComponent
        title={title}
        placeholder={placeholder}
        options={data.map(mapOption) as TOption<string>[]}
        value={value as string}
        onChange={(e) => onChange(e.value)}
        onClear={() => {}}
      />
    );
  }

  return <div>basecomp not managed</div>;
};

export default Filter;
