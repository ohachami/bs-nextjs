'use client';
import ConsolidationCombobox from '@/components/common/ConsolidationCombobox';
import CollectPage from '@/components/sections/Collect';
import SalesConsolidationPage from '@/components/sections/Consolidation';
import HypWrapper from '@/components/sections/HypWrapper';
import { useSbus } from '@/services/referential.Service';
import { CODE_SUB_STEPS, SBUS } from '@/utils/constants';

function Page() {
  /**
   * Selection Event Handling
   * @param selectedValue: new selected value from the list
   */
  const onSelectHandler = (selectedValue: string) => {
    console.log(`>>>>>>>> Selected value : ${selectedValue}`);
  };

  return (
    <HypWrapper
      shouldDisableStep={(user) =>
        SBUS.MANUFACTURING !== (user.sbu.name as never)
      }
      shouldDisplayWaitingStep={(user) => user.sbu.name !== SBUS.MANUFACTURING}
      waitingStepMessage={{
        title: 'Les BUs Industrielles sont en train de terminer leur version',
      }}
    >
      {({ subStepSelected, user, sections }) => {
        switch (subStepSelected) {
          case CODE_SUB_STEPS.COLLECT:
            return <CollectPage user={user} />;
          case CODE_SUB_STEPS.CONSOLIDATION:
            return <SalesConsolidationPage items={sections} />;
          case CODE_SUB_STEPS.SCENARISATION:
            return <div />;
          default:
            return <div />;
        }
      }}
    </HypWrapper>
  );
}

export default Page;
