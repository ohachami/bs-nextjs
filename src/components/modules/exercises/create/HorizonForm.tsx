'use client';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useExerciseTypes,
  usePeriodsTree,
} from '@/services/refExercise.service';
import { ExerciseTypeIF, PeriodIF } from '@/types/refExercise/config';
import { useState } from 'react';
import TreeCombobox from '@/components/common/TreeCombobox';
import { useExerciseCreationStore } from '@/store/exercises/create';
import { exerciseTypes as EXERCISE_TYPES } from '@/utils/constants';
import { TreeItem } from '@/types/common/TreeComboboxFilterTypes';
import { mapPeriodToTreeItem } from '@/services/mappers/periodMapper';
import { getElementsByLevel, getThreeYearsFromNow } from '@/utils/functions';

function HorizonForm() {
  // zustand state manager
  const { data, updateData, errors } = useExerciseCreationStore();
  // backend state for periods list
  const { data: periods } = usePeriodsTree();
  // backend state for exercise types list
  const { data: exerciseTypes, isLoading: isExerciseTypeLoading } =
    useExerciseTypes();
  // current tree data object
  const [treeData, setTreeData] = useState<TreeItem[]>([]);

  // on exercice type change
  const onExerciceTypeChange = (exerciceType: string) => {
    updateData({ ...data, exerciceType });
    // getting exercise type name
    const [, exercieTypeName] = exerciceType.split(';');
    // updating the tree data
    updateTreeData(exercieTypeName);
  };

  // on period config selected
  const onPeriodConfigChange = (periodConfig: string[]) => {
    updateData({ ...data, periodConfig });
  };

  /**
   * Updating the Tree combobox based on the selected exercise type
   * @param exerciceTypeName : Exaercise Type name
   */
  function updateTreeData(exerciceTypeName: string) {
    // checking all 4 cases (Budget, MBR, QBR, Ad hoc)
    switch (exerciceTypeName) {
      case EXERCISE_TYPES.Budget: {
        // get only years
        if (periods) {
          const items: TreeItem[] = getElementsByLevel(periods, 1);
          setTreeData(items);
        }
        break;
      }
      case EXERCISE_TYPES.QBR: {
        // get only quarters
        if (periods) {
          const items: TreeItem[] = getElementsByLevel(periods, 2);
          setTreeData(items);
        }
        break;
      }
      case EXERCISE_TYPES.MBR: {
        // get only months
        if (periods) {
          const items: TreeItem[] = getElementsByLevel(periods, 3);
          setTreeData(items);
        }
        break;
      }
      case EXERCISE_TYPES['Ad hoc']: {
        // get all data tree (year, quarter, month)
        if (periods) {
          const items = getThreeYearsFromNow().map((y) =>
            mapPeriodToTreeItem({ ...periods, name: `${y}` } as PeriodIF, y)
          );
          setTreeData(items);
        }
        break;
      }
      default:
        break;
    }
  }

  return (
    <div className="space-y-6">
      {/* Type d'exercice */}
      <section className="space-y-2">
        <Label htmlFor="typeExercice">Type d&apos;exercice</Label>
        <Select
          disabled={isExerciseTypeLoading}
          defaultValue={data && data.exerciceType}
          // on new exercise type value selected
          onValueChange={onExerciceTypeChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                isExerciseTypeLoading ? 'Loading...' : 'Sélectionner un type'
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {!isExerciseTypeLoading &&
                exerciseTypes &&
                exerciseTypes.map(
                  (exerciceType: ExerciseTypeIF, key: number) => (
                    <SelectItem
                      key={key}
                      value={`${exerciceType.id};${exerciceType.name}`}
                    >
                      {exerciceType.name}
                    </SelectItem>
                  )
                )}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.exerciceType && (
          <p className="text-xs text-red-500">{errors.exerciceType[0]}</p>
        )}
      </section>
      {/* Période del'exercice */}
      <section className="space-y-2">
        <Label htmlFor="typeExercice">Période de l&apos;exercice</Label>
        <TreeCombobox
          buttonVariant="default"
          items={treeData}
          title="Séléctionner une période"
          multiSelect={
            data.exerciceType.split(';')[1] === EXERCISE_TYPES['Ad hoc']
          }
          selectChildren={false}
          onSelectionChange={onPeriodConfigChange}
        />
        {errors.periodConfig && (
          <p className="text-xs text-red-500">{errors.periodConfig[0]}</p>
        )}
      </section>
    </div>
  );
}

export default HorizonForm;
