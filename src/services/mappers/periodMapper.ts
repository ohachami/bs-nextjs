import { PeriodIF } from '@/types/refExercise/config';
import { TreeItem } from '@/types/common/TreeComboboxFilterTypes';

export const mapPeriodToTreeItem = (
  periodDTO: PeriodIF,
  year: number
): TreeItem => {
  return {
    id: `${year};${periodDTO.id}`,
    label: periodDTO.name,
    ...(periodDTO.children?.length > 0 && {
      children: periodDTO.children.map((c) => mapPeriodToTreeItem(c, year)),
    }),
  };
};
