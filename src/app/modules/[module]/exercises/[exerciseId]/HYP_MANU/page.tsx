'use client';
import HypWrapper from '@/components/sections/HypWrapper';
import { SBUS, STEP_STATUS } from '@/utils/constants';

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
    ></HypWrapper>
  );
}

export default Page;
