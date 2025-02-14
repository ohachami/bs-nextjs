import { useExerciseStore } from '@/store/exercises/useExerciseStore';
import SalesDashboard from './SalesDashboard';
import DashboardWrapper, { DashboardWrapperItem } from './DashboardWrapper';

function SalesConsolidationPage({
  items = [],
}: {
  items?: DashboardWrapperItem[];
}) {
  return <DashboardWrapper items={items} />;
}

export default SalesConsolidationPage;
