'use client';
import ConsolidationCombobox from '@/components/common/ConsolidationCombobox';
import CollectPage from '@/components/sections/Collect';
import HypWrapper from '@/components/sections/HypWrapper';
import { useSbus } from '@/services/referential.Service';
import { CODE_SUB_STEPS, SBUS, STEP_STATUS } from '@/utils/constants';

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
      shouldDisableStep={(_, exerciseStep) =>
        exerciseStep.status === STEP_STATUS.INACTIVE
      }
      shouldDisplayWaitingStep={(user) => user.sbu.name !== SBUS.MANUFACTURING}
      waitingStepMessage={{
        title:
          'Les BUs Manufacturing sont en train d’ajuster les hypothèses Manufacturing',
      }}
    >
      <HypWrapper
        shouldDisableStep={(_, exerciseStep) =>
          exerciseStep.status === STEP_STATUS.INACTIVE
        }
        shouldDisplayWaitingStep={(user) =>
          user.sbu.name !== SBUS.MANUFACTURING
        }
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
        }}
      </HypWrapper>
    </HypWrapper>
  );
}

export default Page;
