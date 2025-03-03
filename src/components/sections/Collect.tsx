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

interface Props {
  sbuId?: string;
  setSubStepSelected: (code: CodeSubStepType) => void;
}

function CollectPage({ sbuId, setSubStepSelected }: Props) {
  //getting user information
  // getting datasources related to user's sbu id

  const { data: datasources } = useDataSourceHierarchy(sbuId ?? '');

  const {
    mutateAsync: onConsolidateSales,
    isPending: loadingConsolidateSales,
  } = useConsolidateSales();

  // Track only version names for each datasource and site combination
  const [selectedVersions, setSelectedVersions] = useState<DataVersionIF[]>([]);

  /**
   * Handling VersionTable Row Selection
   * Updating the CollectPage component selectedVersions state
   * NB: Making sure no DataVersion Selection Duplication occurs
   * @param selected: Selected DataVersion Row
   */
  const handleVersionSelect = (selected: DataVersionIF[]) => {
    if (selected.length > 0) {
      const newVersion = selected[0];
      // Remove any existing version with the same ID
      const filteredVersions = selectedVersions.filter(
        (version) => version.id !== newVersion.id
      );
      // Add the new version
      setSelectedVersions([...filteredVersions, newVersion]);
    }
  };

  /**
   * Handle the Consolidate Sales button click
   * Call the onConsolidateSales mutation with the selected version IDs
   * If the mutation is successful, display a toast notification and redirect to the Consolidation&View page
   */
  const handleConsolidateSales = () => {
    onConsolidateSales(selectedVersions.map((e) => e.id)).then((e) => {
      //show toast
      toast({
        variant: 'default',
        title: 'Consolidation effectuée avec succès',
        duration: 5000,
      });
      // redirect to Consolidation&View
      setSubStepSelected(CODE_SUB_STEPS.CONSOLIDATION);
    });
  };
  return (
    datasources &&
    Array.isArray(datasources) &&
    datasources.length > 0 && (
      <div className="space-y-4">
        <Tabs defaultValue={`${datasources[0].id}`} orientation="vertical">
          <div className="flex items-start gap-4">
            <TabsList className="flex-col w-auto gap-4 h-auto bg-gray-200">
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
                className={`flex-1`}
                defaultValue={datasources[0].id}
                value={`${dataSource.id}`}
              >
                {/* If site are found */}
                {dataSource.sites &&
                Array.isArray(dataSource.sites) &&
                dataSource.sites.length > 1 ? (
                  <Tabs defaultValue={dataSource.sites[0].id}>
                    <div key={key} className="flex flex-col gap-4 p-2">
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
                        >
                          <VersionTable
                            datasourceId={dataSource.id}
                            siteId={site.id}
                            onSelect={handleVersionSelect}
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
                      onSelect={handleVersionSelect}
                    />
                  </div>
                )}
              </TabsContent>
            ))}
          </div>
        </Tabs>
        <SelectedVersions
          selectedVersions={selectedVersions.map((version) => version.name)}
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
