import { Period } from "@/types/config";
import { TreeItem } from "@/types/TreeComboboxFilterTypes";

export const mapPeriodToTreeItem = (periodDTO: Period, year: number): TreeItem => {
    return {
      id: `${year}-${periodDTO.id}`,
      label: periodDTO.name,
      ...(periodDTO.children?.length > 0 && {
        children: periodDTO.children.map(c => mapPeriodToTreeItem(c, year))
      })
    };
  };