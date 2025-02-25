import { Section } from '@/types/exercise';
import DashboardWrapper, { DashboardWrapperItem } from './DashboardWrapper';
import SalesDashboard from './SalesDashboard';
import { SECTIONS } from '@/utils/constants';
import MiningDashboard from './MiningDashboard';
import ManufacturingDashboard from './ManufacturingDashboard';
import { User } from '@/types/user';

function ConsolidationPage({
  items = [],
  user,
}: {
  items?: Section[];
  user: User;
}) {
  const sections: DashboardWrapperItem[] = items.map((section) => ({
    code: section.code,
    name: section.name,
    content: (() => {
      switch (section.code) {
        case SECTIONS.HYPO_SALES:
          return (
            <SalesDashboard
              section={section}
              user={user}
              disableCompare={
                !['Rock solutions', 'OCP Nutricrops', 'SPS'].includes(
                  user.sbu.name
                )
              }
            />
          );
        case SECTIONS.HYPO_MINING:
          return (
            <MiningDashboard
              section={section}
              user={user}
              disableCompare={!['Mining'].includes(user.sbu.name)}
            />
          );
        case SECTIONS.HYPO_MANUFACTURING:
          return (
            <ManufacturingDashboard
              section={section}
              user={user}
              disableCompare={!['Manufacturing'].includes(user.sbu.name)}
            />
          );
        default:
          return <div>Not found</div>;
      }
    })(),
  }));
  return <DashboardWrapper items={sections} />;
}

export default ConsolidationPage;
