'use client';

import { useDataSourceHierarchy } from '@/services/datasources.service';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataSourceIF, DataVersionIF } from '@/types/collect/datasources';
import { Button } from '../ui/button';
import { RefreshCcw } from 'lucide-react';
import { CodeSubStepType, RefSiteIF } from '@/types/refExercise/config';
import { VersionTable } from './VersionTable';
import { useState } from 'react';
import SelectedVersions from './SelectedVersions';
import { useConsolidateSales } from '@/services/consolidation.service';
import { toast } from '@/hooks/use-toast';
import { CODE_SUB_STEPS } from '@/utils/constants';
import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface Props {
  sbuId?: string;
  setSubStepSelected?: (code: CodeSubStepType) => void;
}

type DSKey = string;

interface SelectionTracker {
  [key: DSKey]: {
    versionId: string;
    versionName: string;
  };
}

const createKey = (datasourceId: string, siteId?: string): DSKey => {
  return siteId ? `${datasourceId}:${siteId}` : datasourceId;
};

function CollectPage({ sbuId, setSubStepSelected }: Props) {
  //getting user information
  // getting datasources related to user's sbu id
  const { data: datasources } = useDataSourceHierarchy(sbuId ?? '');
  const { currentExercise } = useExerciseStore();
  const pathname = usePathname();
  const router = useRouter();

  const {
    mutateAsync: onConsolidateSales,
    isPending: loadingConsolidateSales,
  } = useConsolidateSales();

  const [selections, setSelections] = useState<SelectionTracker>({});

  /**
   * Handling VersionTable Row Selection
   * Updating the selected versions
   * @param selected: Selected DataVersion Row
   * @param datasourceId: datasourceId
   * @param siteId: siteId
   */
  const handleVersionSelect = (
    selected: DataVersionIF[],
    datasourceId: string,
    siteId?: string
  ) => {
    if (selected.length > 0) {
      const newVersion = selected[0];
      const key = createKey(datasourceId, siteId);

      // Update selections
      setSelections((prevSelections) => ({
        ...prevSelections,
        [key]: {
          versionId: newVersion.id,
          versionName: newVersion.name,
        },
      }));
    }
  };

  // Get the selected ID for a given datasource and site
  const getSelectedId = (datasourceId: string, siteId?: string): string => {
    const key = createKey(datasourceId, siteId);
    return selections[key]?.versionId || '';
  };

  // Get all selected version names for the SelectedVersions component
  const getSelectedVersionNames = (): string[] => {
    return Object.values(selections).map((selection) => selection.versionName);
  };

  /**
   * Handle the Consolidate Sales button click
   * Call the onConsolidateSales mutation with the selected version IDs
   * If the mutation is successful, display a toast notification and redirect to the Consolidation&View page
   */
  const handleConsolidateSales = () => {
    const step = currentExercise?.steps.find((s) =>
      pathname.endsWith(s.stepConfig.code)
    );
    const versionIds = Object.values(selections).map(
      (selection) => selection.versionId
    );
    if (step) {
      onConsolidateSales({ versions: versionIds, stepId: step?.id }).then(
        (e: any) => {
          //show toast
          toast({
            variant: 'default',
            title: 'Consolidation effectuée avec succès',
            duration: 5000,
          });
          // redirect to Consolidation&View
          if (setSubStepSelected) {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('version_id', e.id);

            router.push(currentUrl.toString(), undefined);

            setSubStepSelected(CODE_SUB_STEPS.CONSOLIDATION);
          }
        }
      );
    }
  };

  return (
    datasources &&
    Array.isArray(datasources) &&
    datasources.length > 0 && (
      <div className="flex flex-col h-full">
        <Tabs
          defaultValue={`${datasources[0].id}`}
          orientation="vertical"
          className="flex-1"
        >
          <div className="flex items-start gap-4 h-full">
            <TabsList className="flex-col w-64 gap-4 h-auto bg-gray-200">
              {datasources.map((dataSource: DataSourceIF, key: number) => (
                <TabsTrigger
                  className={`min-w-[200px]`}
                  key={key}
                  value={`${dataSource.id}`}
                >
                  {dataSource.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {datasources.map((dataSource: DataSourceIF, key: number) => (
              <TabsContent
                key={key}
                className={`flex-1 m-0 p-0`}
                defaultValue={datasources[0].id}
                value={`${dataSource.id}`}
              >
                {/* If site are found */}
                {dataSource.sites &&
                Array.isArray(dataSource.sites) &&
                dataSource.sites.length > 1 ? (
                  <Tabs defaultValue={dataSource.sites[0].id}>
                    <div key={key} className="flex flex-col gap-4">
                      <div className="flex justify-between">
                        <TabsList className="flex gap-4 h-auto w-auto items-start justify-start bg-gray-200">
                          {dataSource.sites.map(
                            (site: RefSiteIF, key: number) => (
                              <TabsTrigger
                                key={key}
                                className={`min-w-[100px]`}
                                value={`${site.id}`}
                              >
                                {site.name}
                              </TabsTrigger>
                            )
                          )}
                        </TabsList>
                        <Button>
                          <RefreshCcw /> Actualiser
                        </Button>
                      </div>
                      {dataSource.sites.map((site: RefSiteIF, key: number) => (
                        <TabsContent
                          key={key}
                          value={`${site.id}`}
                          defaultValue={dataSource.sites[0].id}
                          className="p-0 m-0"
                        >
                          <VersionTable
                            datasourceId={dataSource.id}
                            siteId={site.id}
                            selectedId={getSelectedId(dataSource.id, site.id)}
                            onSelect={(selected) =>
                              handleVersionSelect(
                                selected,
                                dataSource.id,
                                site.id
                              )
                            }
                          />
                        </TabsContent>
                      ))}
                    </div>
                  </Tabs>
                ) : (
                  // If site are not found
                  <div className="flex flex-col gap-4 justify-between p-2">
                    <div className="flex justify-end">
                      <Button>
                        <RefreshCcw /> Actualiser
                      </Button>
                    </div>
                    <VersionTable
                      datasourceId={dataSource.id}
                      selectedId={getSelectedId(dataSource.id)}
                      onSelect={(selected) =>
                        handleVersionSelect(selected, dataSource.id)
                      }
                    />
                  </div>
                )}
              </TabsContent>
            ))}
          </div>
        </Tabs>

        <SelectedVersions
          selectedVersions={getSelectedVersionNames()}
          totalLength={datasources.length}
          loading={loadingConsolidateSales}
          submitAction={() => {
            handleConsolidateSales();
          }}
        />
      </div>
    )
  );
}

export default CollectPage;
