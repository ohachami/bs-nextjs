/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table as TableConfig,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';

import { X } from 'lucide-react';
import { TOption } from '@/utils/types';
import { DataTableFacetedFilter } from './DataTableFaceted';

export type FacetedConfig = {
  title: string;
  column: string;
  options: TOption[];
};
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterId?: string;
  tableId?: string;
  actions?: JSX.Element;
  facetedConfig?: FacetedConfig[];
  displaySelectedOnly?: boolean;
  onSelect?: (selected: TData[]) => void;
  hiddenColumns?: string[];
  setTable?: (value: TableConfig<TData>) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterId,
  tableId,
  actions,
  facetedConfig,
  onSelect,
  displaySelectedOnly,
  hiddenColumns,
  setTable,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 30,
      },
      columnVisibility: hiddenColumns?.reduce(
        (a, v) => ({ ...a, [v]: false }),
        {}
      ),
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    // @ts-ignore
    getSubRows: (row) => row.subRows,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      rowSelection,
      expanded,
      sorting,
    },
  });

  useEffect(() => {
    if (onSelect) {
      onSelect(table.getFilteredSelectedRowModel().rows.map((r) => r.original));
    }
  }, [rowSelection]);

  const rowModel = displaySelectedOnly
    ? table.getFilteredSelectedRowModel()
    : table.getRowModel();
  const isFiltered = table.getState().columnFilters.length > 0;

  if (setTable) setTable(table);

  return (
    <div>
      {/* <div className="flex items-center ²justify-between py-4">
        <div className="flex flex-col flex-1 gap-y-2">
          <div className="flex items-center justify-between py-4">
            {filterId && (
              <Input
                placeholder="Rechercher..."
                value={
                  (table.getColumn(filterId)?.getFilterValue() as string) ?? ''
                }
                onChange={(event) =>
                  table.getColumn(filterId)?.setFilterValue(event.target.value)
                }
                className="max-w-sm w-96"
              />
            )}
            <div className="flex gap-x-4">{actions}</div>
          </div>
          <div className="flex space-x-2">
            {facetedConfig?.map(
              (f) =>
                table.getColumn(f.column) && (
                  <DataTableFacetedFilter
                    key={f.column}
                    column={table.getColumn(f.column)}
                    title={f.title}
                    options={f.options}
                  />
                )
            )}
            {isFiltered && (
              <Button
                variant="ghost"
                onClick={() => table.resetColumnFilters()}
                className="h-8 px-2 lg:px-3"
              >
                Reset
                <X className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div> */}

      <div className="rounded-md border bg-white">
        <Table id={tableId}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rowModel?.rows?.length ? (
              rowModel.rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            type="button"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précedent
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}
