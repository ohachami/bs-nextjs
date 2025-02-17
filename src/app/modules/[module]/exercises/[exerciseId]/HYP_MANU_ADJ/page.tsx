'use client';
import HypWrapper from '@/components/sections/HypWrapper';
import { SBUS } from '@/utils/constants';

function Page() {
  return (
    <HypWrapper
      shouldDisableStep={(user) =>
        SBUS.MANUFACTURING !== (user.sbu.name as any)
      }
      shouldDisplayWaitingStep={(user) => user.sbu.name !== SBUS.MANUFACTURING}
      waitingStepMessage={{
        title: 'Les BUs Industrielles sont en train de terminer leur version',
      }}
    ></HypWrapper>
  );
}

export default Page;
