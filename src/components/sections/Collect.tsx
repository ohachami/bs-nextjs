'use client';

import { useDataSource } from '@/services/datasources.service';
import { useUser } from '@/services/users.service';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMemo } from 'react';
import { DataSourceIF } from '@/types/collect/datasources';
import { Button } from '../ui/button';
import { RefreshCcw } from 'lucide-react';

function CollectPage() {
  //getting user information
  const { data: user, isLoading, isError } = useUser();
  // getting datasources related to user's sbu id
  const {
    data: datasources,
    isLoading: dsLoading,
    isError: dsError,
  } = useDataSource(user ? user.sbu.id : '');

  const grpSite = useMemo(() => {
    if (datasources) {
      return Object.groupBy(datasources, (d) => d.site.name);
    }
    return {};
  }, [datasources]);

  if (isError || dsError) return <p>Error !</p>;

  if (isLoading || dsLoading) return <p>Loading...</p>;

  if (Object.keys(grpSite).length < 1)
    return (
      <Tabs className="w-full p-2" orientation="vertical">
        <div className="flex gap-4">
          <TabsList className="flex-col gap-4 h-auto w-auto items-start justify-start bg-gray-200">
            {datasources &&
              datasources.map((datasource: DataSourceIF, key: number) => (
                <TabsTrigger
                  className={`w-full justify-center`}
                  key={key}
                  value={`${datasource.id}`}
                >
                  {datasource.name}
                </TabsTrigger>
              ))}
          </TabsList>
          <div className="flex w-full border">
            {datasources &&
              datasources.map((datasource: DataSourceIF, key: number) => (
                <TabsContent
                  key={key}
                  value={`${datasource.id}`}
                  className="p-2"
                >
                  <p>{`data for ${datasource.name}`}</p>
                </TabsContent>
              ))}
          </div>
        </div>
      </Tabs>
    );

  return (
    <div className="flex gap-4 w-full mx-auto p-4">
      {datasources && grpSite && (
        <Tabs defaultValue={`${0}-${datasources[0].name}`} className="w-full">
          <div className="flex-col justify-start items-start gap-6">
            <div className="flex justify-between">
              <TabsList
                defaultValue={'Morocco'}
                className="flex gap-4 h-auto bg-gray-200"
              >
                {Object.keys(grpSite).map((site: string, key: number) => (
                  <TabsTrigger
                    className={`min-w-[150px]`}
                    key={key}
                    value={`${site}`}
                  >
                    {site}
                  </TabsTrigger>
                ))}
              </TabsList>
              {/* Button Actualiser */}
              <Button>
                <RefreshCcw /> Actualiser
              </Button>
            </div>
            <div className="flex w-full">
              <TabsContent className={`flex-1`} value={'Morocco'}>
                {/* nested content */}
                <Tabs className="w-full p-2" orientation="vertical">
                  <div className="flex gap-4">
                    <TabsList className="flex-col gap-4 h-auto w-auto items-start justify-start bg-gray-200">
                      {grpSite['Morocco']!.map(
                        (datasource: DataSourceIF, key: number) => (
                          <TabsTrigger
                            className={`w-full justify-center`}
                            key={key}
                            value={`${datasource.name}`}
                          >
                            {datasource.name}
                          </TabsTrigger>
                        )
                      )}
                    </TabsList>
                    <div className="flex w-full border">
                      <TabsContent
                        value="Customer Data Collecte"
                        className="p-2"
                      >
                        <p>Insert your table here</p>
                      </TabsContent>
                    </div>
                  </div>
                </Tabs>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      )}
    </div>
  );
}

export default CollectPage;
