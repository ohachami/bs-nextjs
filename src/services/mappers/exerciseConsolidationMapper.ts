import { NestedOption } from "@/types/common/CollapsibleSelectTypes";
import { ExerciseConsolidationVersionsIF } from "@/types/consolidation";

export const mapDataToNestedOptions = (data: ExerciseConsolidationVersionsIF[]): NestedOption[] => {
  return data.map((item) => ({
    value: item.id,
    label: item.name,
    children: item.consolidatedData?.map((consolidatedItem) => ({
      value: consolidatedItem.id,
      label: consolidatedItem.name,
      children: consolidatedItem.dataVersions?.map((version) => ({
        value: version.id,
        label: version.name
      })) || []
    })) || []
  }));
};