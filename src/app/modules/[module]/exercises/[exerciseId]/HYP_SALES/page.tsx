'use client';

import HypWrapper from '@/components/sections/HypWrapper';
import { SBUS } from '@/utils/constants';
import ConsolidationCombobox from "@/components/common/ConsolidationCombobox";
import { useSbus } from "@/services/referential.Service";

function PageHyperManu() {
    const { data: sbus, isLoading, isError } = useSbus();

    const onSelectHandler = (selectedValue: string) => {
        console.log(selectedValue);
    };

    if (isLoading) return <p>Loading Sbus...</p>;

    if (isError || !sbus) return <p>Error Loading Sbus!</p>;

  return (
    <HypWrapper
      shouldDisableStep={(user) =>{
        return ![SBUS.ROCK_SOLUTIONS, SBUS.OCP_NUTRICROPS].includes(
          user.sbu.name as never
        )}
      }
      shouldDisplayWaitingStep={(user) =>
        ![SBUS.ROCK_SOLUTIONS, SBUS.OCP_NUTRICROPS, SBUS.SPS].includes(
          user.sbu.name as never
        )
      }
      waitingStepMessage={{
        title:
          'Les BUs commerciales sont en train sont en train de terminer leur version',
      }}
    >
        <ConsolidationCombobox
            onSelect={onSelectHandler}
            sbuId={sbus.find((sbu) => sbu.name === SBUS.MANUFACTURING)?.id}
        />
    </HypWrapper>
  );
}

export default PageHyperManu;
