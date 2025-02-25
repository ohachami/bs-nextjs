'use client';
import ConsolidationCombobox from '@/components/common/ConsolidationCombobox';
import CollectPage from '@/components/sections/Collect';
import HypWrapper from '@/components/sections/HypWrapper';
import { useSbus } from '@/services/referential.Service';
import { CODE_SUB_STEPS, SBUS, STEP_STATUS } from '@/utils/constants';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

function Page() {
  // loading sbus
  const { data: sbus, isLoading, isError } = useSbus();

  /**
   * Selection Event Handling
   * @param selectedValue: new selected value from the list
   */
  const onSelectHandler = (selectedValue: string) => {
    console.log(`>>>>>>>> Selected value : ${selectedValue}`);
  };

  if (isLoading) return <p>Loading Sbus...</p>;

  if (isError || !sbus) return <p>Error Loading Sbus!</p>;

  const miningSbu = sbus.find(sbu => sbu.name === SBUS.MINING);
  const manufacturingSbu = sbus.find(sbu => sbu.name === SBUS.MANUFACTURING);

  return (
    <HypWrapper
      shouldDisableStep={(_, exerciseStep) =>
        exerciseStep.status === STEP_STATUS.INACTIVE
      }
      shouldDisplayWaitingStep={(user) => user.sbu.name === SBUS.MANUFACTURING}
      waitingStepMessage={{
        title:
          'Les BUs Manufacturing sont en train d’ajuster les hypothèses Manufacturing',
      }}
    >
      {({ subStepSelected, user, sections }) => {
        const isCorporate = user.sbu.name === SBUS.CORPORATE;

        const renderContent = (sbuId: string) => {
          switch (subStepSelected) {
            case CODE_SUB_STEPS.COLLECT:
              return <CollectPage sbuId={sbuId} />;
            case CODE_SUB_STEPS.CONSOLIDATION:
              return (
                  <ConsolidationCombobox
                      onSelect={onSelectHandler}
                  />
              );
            case CODE_SUB_STEPS.SCENARISATION:
              return <div />;
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
                <TabsTrigger variant="link" value={miningSbu.id }>Hypothèses mining</TabsTrigger>
                <TabsTrigger variant="link" value={manufacturingSbu?.id}>Hypothèses manufacturing</TabsTrigger>
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
