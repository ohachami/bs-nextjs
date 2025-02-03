import { Column } from '@tanstack/react-table';

interface TreeItem {
  id: string;
  label: string;
  children?: TreeItem[];
}

interface TreeComboboxProps {
  items: TreeItem[];
  multiSelect?: boolean;
  title?: string;
  selectChildren?: boolean;
  defaultValues?: string[];
  onSelectionChange: (selectedItems: string[]) => void;
}

interface TableFilteredProps<TData, TValue> {
  column?: Column<TData, TValue>;
}
export type { TreeItem, TreeComboboxProps, TableFilteredProps };
