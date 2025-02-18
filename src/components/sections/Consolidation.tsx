import { Section } from '@/types/exercise';
import DashboardWrapper, { DashboardWrapperItem } from './DashboardWrapper';
import SalesDashboard from './SalesDashboard';
import { SECTIONS } from '@/utils/constants';
import MiningDashboard from './MiningDashboard';
import ManufacturingDashboard from './ManufacturingDashboard';

function SalesConsolidationPage({ items = [] }: { items?: Section[] }) {
  const sections: DashboardWrapperItem[] = items.map((section) => ({
    code: section.code,
    name: section.name,
    content: (() => {
      switch (section.code) {
        case SECTIONS.HYPO_SALES:
          return <SalesDashboard section={section} />;
        case SECTIONS.HYPO_MINING:
          return <MiningDashboard section={section} />;
        case SECTIONS.HYPO_MANUFACTURING:  
          return <ManufacturingDashboard section={section} />
        default:
          return <div>Not found</div>;
      }
    })(),
  }));
  return <DashboardWrapper items={sections} />;
}

export default SalesConsolidationPage;
