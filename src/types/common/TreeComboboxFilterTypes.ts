import { Column } from '@tanstack/react-table';

interface TreeItem {
  id: string;
  label: string;
  children?: TreeItem[];
  parent?: TreeItem
}

interface TreeComboboxProps {
  buttonVariant: 'default' | 'with-badges'
  items: TreeItem[];
  multiSelect?: boolean;
  title?: string;
  placeholder?: string;
  selectChildren?: boolean;
  defaultValues?: TreeItem[];
  onSelectionChange: (selectedItems: string[]) => void;
}

interface TableFilteredProps<TData, TValue> {
  column?: Column<TData, TValue>;
}
export type { TreeItem, TreeComboboxProps, TableFilteredProps };
