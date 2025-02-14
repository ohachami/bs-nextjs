import DashboardWrapper, { DashboardWrapperItem } from './DashboardWrapper';

function SalesConsolidationPage({
  items = [],
}: {
  items?: DashboardWrapperItem[];
}) {
  return <DashboardWrapper items={items} />;
}

export default SalesConsolidationPage;
