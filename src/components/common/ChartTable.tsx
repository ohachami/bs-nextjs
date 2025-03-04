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
import { useEffect, useState } from 'react';
import { TOption } from '@/utils/types';
import { ChartWrapper } from '@/components/common/ChartWrapper';
import { PeriodIF } from '@/types/refExercise/config';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';

export type FacetedConfig = {
  title: string;
  column: string;
  options: TOption<never>[];
};
interface ChartTableProps<TData, TValue> {
  title: string;
  subtitle: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterId?: string;
  tableId?: string;
  actions?: JSX.Element;
  facetedConfig?: FacetedConfig[];
  displaySelectedOnly?: boolean;
  onSelect?: (selected: TData[]) => void;
  hiddenColumns?: string[];
  hidePagination?: boolean;
  setTable?: (value: TableConfig<TData>) => void;
}

export function ChartTable<TData, TValue>({
  title,
  subtitle,
  columns,
  data,
  tableId,
  onSelect,
  displaySelectedOnly,
  hiddenColumns,
}: ChartTableProps<TData, TValue>) {
  const [, setActivePeriod] = useState<PeriodIF>();
  const { currentExercise } = useExerciseStore();
  const periods = currentExercise?.periods || [];

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
  /* 
  const filtersJsx = facetedConfig ? <>{facetedConfig.map(
      (f) =>
          table.getColumn(f.column) && (
              <DataTableFacetedFilter
                  key={f.column}
                  column={table.getColumn(f.column)}
                  title={f.title}
                  options={f.options}
              />
          )
  )}</> : undefined; */

  //TODO fire the changes for the selected period
  return (
    <div>
      <div className="rounded-md border bg-white">
        <ChartWrapper
          handleChange={(tab) =>
            setActivePeriod(
              periods.find((p) => p.period.id === tab.value)?.period
            )
          }
          title={title}
          subTitle={subtitle}
          tabs={periods.map((p) => ({
            value: p.period.id,
            label: p.period.name,
          }))}
          filters={{}}
          handleChangeFilter={() => null}
        >
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
        </ChartWrapper>
      </div>
    </div>
  );
}
