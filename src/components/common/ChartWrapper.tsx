'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Filter } from '@/types/dashboard';
import { TOption } from '@/utils/types';
import { PropsWithChildren, useState } from 'react';
import FilterFactory from './FilterFactory';

export function ChartWrapper({
  title,
  subTitle,
  tabs,
  handleChange,
  handleChangeFilter,
  handleChangeLimit,
  filtersConfig,
  children,
  filters,
  limit,
}: PropsWithChildren & {
  handleChange: (tab: TOption<string>) => void;
  handleChangeFilter: (name: string, values: string[]) => void;
  handleChangeLimit?: (limit: number) => void;
  title: string;
  subTitle: string;
  tabs: TOption<string>[];
  filtersConfig?: Filter[];
  filters: Record<string, string[]>;
  limit?: number;
}) {
  const [activeTab, setActiveTab] = useState<TOption<string>>();
  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between flex-col items-stretch space-y-0 border-b p-0 sm:flex-row gap-5">
        <div className="flex flex-1 justify-between items-center">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subTitle}</CardDescription>
          </div>
          {filtersConfig && (
            <div className="flex items-center justify-center gap-2 ">
              {limit && handleChangeLimit && (
                <FilterFactory<number>
                  key={'limit'}
                  module={'top'}
                  value={limit}
                  onChange={(v) => handleChangeLimit(v)}
                />
              )}
              {filtersConfig
                .filter((e) => !e.hidden)
                .map((e, key) => (
                  <FilterFactory
                    key={key}
                    module={e.name}
                    values={filters[e.name] || []}
                    onChange={(v) => handleChangeFilter(e.name, Array.isArray(v) ? v as string[]: [v] as string[])}
                  />
                ))}
            </div>
          )}
        </div>

        <div className="flex">
          {tabs.map((p) => (
            <button
              key={p.value}
              data-active={activeTab?.value === p.value}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-[#007BFF12] sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => {
                setActiveTab(p);
                handleChange(p);
              }}
            >
              <span className="text-sm font-bold leading-none">{p.label}</span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">{children}</CardContent>
    </Card>
  );
}
