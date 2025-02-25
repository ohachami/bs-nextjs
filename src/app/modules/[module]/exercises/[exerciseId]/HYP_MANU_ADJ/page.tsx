'use client';
import ConsolidationCombobox from '@/components/common/ConsolidationCombobox';
import ScenarioCard from '@/components/common/ScenarioCard';
import CollectPage from '@/components/sections/Collect';
import HypWrapper from '@/components/sections/HypWrapper';
import Scenarisation from '@/components/sections/Scenarisation';
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
      {({ subStepSelected, user }) => {
        switch (subStepSelected) {
          case CODE_SUB_STEPS.COLLECT:
            return <CollectPage user={user} />;
          case CODE_SUB_STEPS.CONSOLIDATION:
            return <ConsolidationCombobox onSelect={onSelectHandler} />;
          case CODE_SUB_STEPS.SCENARISATION:
            return <Scenarisation />;
          default:
            return <div />;
        }
      }}
    </HypWrapper>
  );
}

export default Page;
