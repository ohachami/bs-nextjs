'use client';

import { Button } from '@/components/ui/button';
import { Split } from 'lucide-react';
import { CollapsibleSelect } from '../CollapsibleSelect';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import ComapreVersionsSkeleton from '@/components/skeletons/CompareVersionSkeleton';
import { useComparaisonVersionIds } from '@/store/consolidation/comparaisonVersionIds';
import { useExerciseConsolidationVersions } from '@/services/consolidation.service';
import { mapDataToNestedOptions } from '@/services/mappers/exerciseConsolidationMapper';

// comparaison limit
const COMPARAISON_LIMIT = 4;

interface CompareVersionsProps {
  sbuId: string;
  exerciseId?: string;
  disabled?: boolean;
}

function CompareVersions({
  sbuId,
  exerciseId,
  disabled = false,
}: CompareVersionsProps) {
  // fetching backend data
  const { data, isLoading, isError } = useExerciseConsolidationVersions(
    sbuId,
    exerciseId
  );
  const { insertOrReplaceVersionId } = useComparaisonVersionIds();

  useEffect(() => {
    if (
      Array.isArray(data) &&
      data.length > 0 &&
      data[0].consolidatedData &&
      data[0].consolidatedData.length > 0
    ) {
      insertOrReplaceVersionId(0, data[0].consolidatedData[0].id);
    }
  }, [data]);

  // sync data with zustand store
  // comparaison collapsible selects management
  const [compareItems, setCompareItems] = useState<number>(1);
  // toaster
  const { toast } = useToast();

  /**
   * CollapsibleSelect elements management
   * PS: Fixing the comparaison to 4 elements
   */
  const onCompareHandler = () => {
    if (compareItems < COMPARAISON_LIMIT) {
      incrementItems();
    } else {
      // alert showing that the limit of comparaisons is 4!
      toast({
        variant: 'destructive',
        title: 'Nombre Limite de comparaison dépassé!',
        description: 'Vous nous pouvez pas dépasser 4 comparaisons!',
      });
    }
  };

  /**
   * Update versions state on comparaison change
   * @param selectedItem: the selected Version item
   * @param index: the comparaison select index
   */
  const onApplyCompareHandler = (selectedItem: string, index: number) => {
    // insert selected versions at specefic comparaison position
    insertOrReplaceVersionId(index, selectedItem);
  };

  /**
   * Incrementing the collapsibleSelect elements
   */
  const incrementItems = () => {
    setCompareItems((p) => ++p);
  };

  if (isLoading || !data) return <ComapreVersionsSkeleton />;

  if (isError)
    return (
      <p className="text-red-500">
        Error Loading Exercises Consololidation Data for collapsibleSelect
      </p>
    );

  return (
    <div className="flex justify-between items-center flex-1">
      <div className="flex flex-wrap gap-4 items-center">
        {Array(compareItems)
          .fill(0)
          .map((item, key: number) => (
            <CollapsibleSelect
              disabled={disabled}
              key={key}
              selectIndex={key}
              collapsibleItems={mapDataToNestedOptions(data)}
              onCompare={onApplyCompareHandler}
            />
          ))}
      </div>
      <Button variant="default" onClick={onCompareHandler} disabled={disabled}>
        <Split /> Comparer avec une autre version
      </Button>
    </div>
  );
}

export default CompareVersions;
