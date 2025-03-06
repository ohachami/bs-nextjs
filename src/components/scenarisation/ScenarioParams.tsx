import { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useScenarioParams } from '@/services/scenarisation.service';
import { FormValues } from '@/validations/schemas/scenario.schemas';
import { UseFormReturn } from 'react-hook-form';

interface consolidatedDataIF {
  id: number;
  name: string;
  consolidation: Array<{
    id: number;
    name: string;
    data: [];
  }>;
}

export const consolidatedDataTabs: consolidatedDataIF[] = [
  {
    id: 1,
    name: 'Hypothèses commerciales',
    consolidation: [
      {
        id: 4,
        name: 'Demande',
        data: [],
      },
    ],
  },
  {
    id: 2,
    name: 'Hypothèses Manufacturing',
    consolidation: [
      {
        id: 5,
        name: 'Capacité',
        data: [],
      },
      {
        id: 6,
        name: 'Matrice de feasabilité',
        data: [],
      },
      {
        id: 7,
        name: 'Couts',
        data: [],
      },
    ],
  },
  {
    id: 3,
    name: 'Hypothèses minière',
    consolidation: [
      {
        id: 8,
        name: 'example 1',
        data: [],
      },
    ],
  },
];

interface PropsIF {
  consolidated_data_id: string;
  form: UseFormReturn<FormValues>;
}

const ScenarioParams: FC<PropsIF> = ({ consolidated_data_id, form }) => {
  const {
    data: consolidatedData,
    // isLoading,
    // isError,
  } = useScenarioParams(consolidated_data_id);

  // console.log(consolidatedData, form.getValues());

  // if (isLoading) <p className="p-4">consolidatedData is loading...</p>;

  // if (isError) return <p className="p-4">Error loading consolidatedData...</p>;

  return (
    <div>
      <Tabs defaultValue="1">
        {/* Parent Tabs */}
        <TabsList variant="link" className="flex justify-start gap-x-5">
          <TabsTrigger
            variant="link"
            value="1"
            className="text-sm font-normal w-fit text-muted-foreground px-4"
          >
            Paramètres
          </TabsTrigger>
          <TabsTrigger
            variant="link"
            value="2"
            className="text-sm font-normal w-fit text-muted-foreground px-4"
          >
            Inputs
          </TabsTrigger>
        </TabsList>
        <TabsContent value="1">Paramètres compt </TabsContent>
        {/* Inputs Content with Nested Tabs */}
        <TabsContent value="2">
          <Tabs defaultValue={consolidatedDataTabs[0]?.id.toString()}>
            <TabsList
              variant="link"
              className="flex justify-start gap-x-5 rounded-t-lg rounded-b-none"
            >
              {consolidatedDataTabs.map((item) => (
                <TabsTrigger
                  className="text-sm font-normal w-fit text-muted-foreground px-4"
                  key={item.id}
                  variant="link"
                  value={item.id.toString()}
                >
                  {item.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {consolidatedDataTabs.map((item) => (
              <TabsContent key={item.id} value={item.id.toString()}>
                <Tabs
                  defaultValue={item.consolidation[0].id.toString()}
                  className="-mt-5"
                >
                  <TabsList
                    variant="link"
                    className="flex justify-start gap-x-5 rounded-b-lg rounded-t-none"
                  >
                    {item.consolidation.map((item) => (
                      <TabsTrigger
                        className="text-sm font-normal w-fit text-muted-foreground px-4"
                        key={item.id}
                        value={item.id.toString()}
                        variant="link"
                      >
                        {item.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {item.consolidation.map((item) => (
                    <TabsContent
                      key={item.id}
                      value={item.id.toString()}
                      className="flex-1 h-[260px] overflow-y-scroll"
                    >
                      <p>{item.name}</p>
                    </TabsContent>
                  ))}
                </Tabs>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScenarioParams;
