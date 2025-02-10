import ProcessStepWrapper from '@/components/common/ProcessStepWrapper';
import CollectPage from '@/components/sections/Collect';
import { STEPS } from '@/utils/mocks';

function PageHypSales() {
  return (
    <div className="space-y-6">
      <ProcessStepWrapper steps={STEPS} />
      <CollectPage />
    </div>
  );
}

export default PageHypSales;
