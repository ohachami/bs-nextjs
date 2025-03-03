'use client';

import CollectPage from '@/components/sections/Collect';
import ConsolidationPage from '@/components/sections/Consolidation';
import HypWrapper from '@/components/sections/HypWrapper';
import { CODE_SUB_STEPS, SBUS } from '@/utils/constants';

function PageHyperManu() {
  return (
    <HypWrapper
      shouldDisableStep={(user) => {
        return ![SBUS.ROCK_SOLUTIONS, SBUS.OCP_NUTRICROPS, SBUS.SPS].includes(
          user.sbu.name as never
        );
      }}
      shouldDisplayWaitingStep={(user) =>
        ![SBUS.ROCK_SOLUTIONS, SBUS.OCP_NUTRICROPS, SBUS.SPS].includes(
          user.sbu.name as never
        )
      }
      waitingStepMessage={{
        title:
          'Les BUs commerciales sont en train de préparer leurs toplines et upsides',
      }}
    >
      {({ subStepSelected, sections, user }) => {
        switch (subStepSelected) {
          case CODE_SUB_STEPS.COLLECT:
            return <CollectPage sbuId={user.sbu.id} />;
          case CODE_SUB_STEPS.CONSOLIDATION:
            return <ConsolidationPage items={sections} user={user} />;
          case CODE_SUB_STEPS.SCENARISATION:
            return <div />;
          default:
            return <div />;
        }
      }}
    </HypWrapper>
  );
}

export default PageHyperManu;
