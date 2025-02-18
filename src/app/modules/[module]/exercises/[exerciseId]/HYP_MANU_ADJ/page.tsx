'use client';
import ConsolidationCombobox from '@/components/common/ConsolidationCombobox';
import HypWrapper from '@/components/sections/HypWrapper';
import { useSbus } from '@/services/referential.Service';
import { SBUS } from '@/utils/constants';

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
      {/* ConsolidationVersions with Sbu ID of Mining */}
      <ConsolidationCombobox
        onSelect={onSelectHandler}
        sbuId={sbus.find((sbu) => sbu.name === SBUS.MINING)?.id}
      />
    </HypWrapper>
  );
}

export default Page;
