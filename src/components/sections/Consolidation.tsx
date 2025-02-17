import { Section } from '@/types/exercise';
import DashboardWrapper, { DashboardWrapperItem } from './DashboardWrapper';
import SalesDashboard from './SalesDashboard';
import { SECTIONS } from '@/utils/constants';

function SalesConsolidationPage({ items = [] }: { items?: Section[] }) {
  const sections: DashboardWrapperItem[] = items.map((section) => ({
    code: section.code,
    name: section.name,
    content: (() => {
      switch (section.code) {
        case SECTIONS.HYPO_SALES:
          return <SalesDashboard section={section} />;
        default:
          return <div>Not found</div>;
      }
    })(),
  }));
  return <DashboardWrapper items={sections} />;
}

export default SalesConsolidationPage;
