'use client';

import { Button } from '@/components/ui/button';
import { Split } from 'lucide-react';
import { CollapsibleSelect } from '../CollapsibleSelect';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import ComapreVersionsSkeleton from '@/components/skeletons/CompareVersionSkeleton';
import { useComparaisonVersionIds } from '@/store/consolidation/comparaisonVersionIds';

// comparaison limit
const COMPARAISON_LIMIT = 4;

function CompareVersions() {
  // sync data with zustand store
  const { insertOrReplaceVersionId } = useComparaisonVersionIds();
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
        title: 'Nombre Limite de comparaison dépasser!',
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

  if (0) return <ComapreVersionsSkeleton />;

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-wrap gap-4 items-center">
        {Array(compareItems)
          .fill(0)
          .map((item, key: number) => (
            <CollapsibleSelect
              key={key}
              selectIndex={key}
              collapsibleItems={[]}
              onCompare={onApplyCompareHandler}
            />
          ))}
      </div>
      <Button variant="default" onClick={onCompareHandler}>
        <Split /> Comparer avec une autre version
      </Button>
    </div>
  );
}

export default CompareVersions;
