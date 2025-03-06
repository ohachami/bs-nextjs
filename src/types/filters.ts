import { TreeItem } from '@/types/common/TreeComboboxFilterTypes';
import { TOption } from '@/utils/types';

// For multiselect variant
type MultiselectFilter<T> = {
  basecomp: 'multiselect';
  title: string;
  placeholder: string;
  data: T[];
  onChange: (values: string[]) => void;
  values?: string[];
  mapOption: (data: T) => TOption<string>;
};

// For treecombobox variant
type TreeComboboxFilter<T> = {
  basecomp: 'treecombobox';
  title: string;
  placeholder: string;
  data: T[];
  onChange: (values: string[]) => void;
  values?: string[];
  selectChildren: boolean;
  multiSelect: boolean;
  selectParent: boolean;
  mapOption: (data: T) => TreeItem;
};

// For select variant
type SelectFilter<T> = {
  basecomp: 'select';
  title: string;
  placeholder: string;
  data: TOption<T>[];
  onChange: (value: T) => void;
  value?: T;
  mapOption: (data: TOption<T>) => TOption<T>;
};

export type FilterProps<T> =
  | MultiselectFilter<T>
  | TreeComboboxFilter<T>
  | SelectFilter<T>;
