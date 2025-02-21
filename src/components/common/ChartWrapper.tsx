'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TOption } from '@/utils/types';
import { PropsWithChildren, useState } from 'react';

export function ChartWrapper({
  title,
  subTitle,
  tabs,
  handleChange,
  filters,
  children,
}: PropsWithChildren & {
  handleChange: (tab: TOption<string>) => void;
  title: string;
  subTitle: string;
  tabs: TOption<string>[];
  filters?: JSX.Element;
}) {
  const [activeTab, setActiveTab] = useState<TOption<string>>();

  return (
    <Card className="w-full">
      <CardHeader className="flex  justify-between flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex justify-between">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subTitle}</CardDescription>
          </div>
          {filters && <div>{filters}</div>}
        </div>
        <div className="flex">
          {tabs.map((p) => {
            return (
              <button
                key={p.value}
                data-active={activeTab?.value === p.value}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => {
                  setActiveTab(p);
                  handleChange(p);
                }}
              >
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">{children}</CardContent>
    </Card>
  );
}
