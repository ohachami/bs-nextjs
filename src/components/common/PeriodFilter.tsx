import { useEffect, useState } from 'react';
import TreeCombobox from '@/components/common/TreeCombobox';
import { TreeItem } from '@/types/common/TreeComboboxFilterTypes';
import { PeriodIF } from '@/types/refExercise/config';
import { mapPeriodToTreeItem } from '@/services/mappers/periodMapper';
import { usePeriodsTree } from '@/services/refExercise.service';

interface PeriodFilterProps {
  years: (number | undefined)[];
  defaultSelectedPeriods?: string[];
  onSelectionChange: (selectedPeriods: string[]) => void;
}

const PeriodFilter = ({
  years,
  defaultSelectedPeriods = [],
  onSelectionChange,
}: PeriodFilterProps) => {
  const [filter, setFilter] = useState<TreeItem[]>([]);
  const periodQuery = usePeriodsTree();

  useEffect(() => {
    if (periodQuery.isSuccess) {
      const items = years.map((y) =>
        mapPeriodToTreeItem(
          { ...periodQuery.data, name: `${y}` } as PeriodIF,
          y!
        )
      );
      setFilter(items);
    }
  }, [years, periodQuery.data, periodQuery.isSuccess]);

  if (periodQuery.isLoading) return <div>Loading...</div>;
  if (periodQuery.isError) return <div>Error loading periods</div>;

  console.log(filter);

  return (
    <TreeCombobox
      multiSelect
      items={filter}
      selectChildren={false}
      defaultValues={defaultSelectedPeriods}
      onSelectionChange={onSelectionChange}
    />
  );
};

export default PeriodFilter;
