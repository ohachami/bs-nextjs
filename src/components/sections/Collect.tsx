'use client';

import { useDataSourceHierarchy } from '@/services/datasources.service';
import { useUser } from '@/services/users.service';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataSourceIF } from '@/types/collect/datasources';
import { Button } from '../ui/button';
import { RefreshCcw } from 'lucide-react';
import { RefSiteIF } from '@/types/refExercise/config';


function CollectPage() {
  //getting user information
  const { data: user, isLoading, isError } = useUser();
  // getting datasources related to user's sbu id
  const {
    data: datasources,
    isLoading: dsLoading,
    isError: dsError,
  } = useDataSourceHierarchy(user ? user.sbu.id : '');

  if (isError || dsError) return <p>Error !</p>;

  if (isLoading || dsLoading) return <p>Loading...</p>;

  return (
    datasources &&
    Array.isArray(datasources) &&
    datasources.length > 0 && (
      <Tabs
        className="w-full"
        defaultValue={`${datasources[0].id}`}
        orientation="vertical"
      >
        <div className="flex items-start gap-4">
          <TabsList className="flex-col gap-4 h-auto bg-gray-200">
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
                    <div className="flex w-full h-14">
                      {dataSource.sites.map((site: RefSiteIF, key: number) => (
                        <TabsContent
                          key={key}
                          value={`${site.id}`}
                          defaultValue={dataSource.sites[0].id}
                        >
                          <p>
                            {/* TODO: Insert Table Code Here */}
                            Insert your dataversions here for {site.name}{' '}
                          </p>
                        </TabsContent>
                      ))}
                    </div>
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
                  {/* TODO: Insert Table Code Here */}
                  <div className="p-2">
                    <p>Table with no Site Found</p>
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    )
  );
}

export default CollectPage;
