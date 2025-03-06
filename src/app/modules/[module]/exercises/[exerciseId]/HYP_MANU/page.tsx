'use client';
import CollectPage from '@/components/sections/Collect';
import ConsolidationPage from '@/components/sections/Consolidation';
import HypWrapper from '@/components/sections/HypWrapper';
import { useSbus } from '@/services/referential.Service';
import { CODE_SUB_STEPS, SBUS, STEP_STATUS } from '@/utils/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function Page() {
  // loading sbus
  const { data: sbus, isLoading, isError } = useSbus();

  if (isLoading) return <p>Loading Sbus...</p>;

  if (isError || !sbus) return <p>Error Loading Sbus!</p>;

  const miningSbu = sbus.find((sbu) => sbu.name === SBUS.MINING);
  const manufacturingSbu = sbus.find((sbu) => sbu.name === SBUS.MANUFACTURING);

  return (
    <HypWrapper
      shouldDisableStep={(_, exerciseStep) =>
        exerciseStep.status === STEP_STATUS.INACTIVE
      }
      shouldDisplayWaitingStep={(user) =>
        ![SBUS.MANUFACTURING, SBUS.MINING, SBUS.CORPORATE].includes(
          user.sbu.name as never
        )
      }
      waitingStepMessage={{
        title: 'Les données industrielles sont en cours de mise à jour',
      }}
    >
      {({ subStepSelected, user, sections }) => {
        const isCorporate = user.sbu.name === SBUS.CORPORATE;

        const renderContent = (sbuId: string) => {
          switch (subStepSelected) {
            case CODE_SUB_STEPS.COLLECT:
              return <CollectPage sbuId={sbuId} />;
            case CODE_SUB_STEPS.CONSOLIDATION:
              return <ConsolidationPage items={sections} user={user} />;
            case CODE_SUB_STEPS.SCENARISATION:
            default:
              return <div />;
          }
        };

        if (!isCorporate || !miningSbu || !manufacturingSbu) {
          return renderContent(user.sbu.id);
        }

        return (
          <Tabs defaultValue={miningSbu.id}>
            <TabsList variant="link">
              <TabsTrigger variant="link" value={miningSbu.id}>
                Hypothèses mining
              </TabsTrigger>
              <TabsTrigger variant="link" value={manufacturingSbu?.id}>
                Hypothèses manufacturing
              </TabsTrigger>
            </TabsList>
            <TabsContent value={miningSbu?.id}>
              {renderContent(miningSbu?.id)}
            </TabsContent>
            <TabsContent value={manufacturingSbu?.id}>
              {renderContent(manufacturingSbu?.id)}
            </TabsContent>
          </Tabs>
        );
      }}
    </HypWrapper>
  );
}

export default Page;
