'use client';

import HypWrapper from '@/components/sections/HypWrapper';
import SalesDashboard from '@/components/sections/SalesDashboard';
import { SBUS } from '@/utils/constants';

function PageHyperManu() {
  return (
    <HypWrapper
      shouldDisableStep={(user) =>
        ![SBUS.ROCK_SOLUTIONS, SBUS.OCP_NUTRICROPS].includes(
          user.sbu.name as any
        )
      }
      shouldDisplayWaitingStep={(user) =>
        ![SBUS.ROCK_SOLUTIONS, SBUS.OCP_NUTRICROPS, SBUS.SPS].includes(
          user.sbu.name as any
        )
      }
      waitingStepMessage={{
        title:
          'Les BUs commerciales sont en train sont en train de terminer leur version',
      }}
    >

      
    </HypWrapper>
  );
}

export default PageHyperManu;
