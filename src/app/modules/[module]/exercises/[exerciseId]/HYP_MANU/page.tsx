'use client';
import ConsolidationCombobox from '@/components/common/ConsolidationCombobox';
import CollectPage from '@/components/sections/Collect';
import SalesConsolidationPage from '@/components/sections/Consolidation';
import HypWrapper from '@/components/sections/HypWrapper';
import { useSbus } from '@/services/referential.Service';
import { CODE_SUB_STEPS, SBUS, STEP_STATUS } from '@/utils/constants';

function Page() {
  return (
    <HypWrapper
      shouldDisableStep={(_, exerciseStep) =>
        exerciseStep.status === STEP_STATUS.INACTIVE
      }
      shouldDisplayWaitingStep={(user) => user.sbu.name !== SBUS.MANUFACTURING}
      waitingStepMessage={{
        title:
          'Les BUs Manufacturing sont en train d’ajuster les hypothèses Manufacturing',
      }}
    >
      {({ subStepSelected, user, sections }) => {
        switch (subStepSelected) {
          case CODE_SUB_STEPS.COLLECT:
            return <CollectPage user={user} />;
          case CODE_SUB_STEPS.CONSOLIDATION:
            return <SalesConsolidationPage items={sections} user={user} />;
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
