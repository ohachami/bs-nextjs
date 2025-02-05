import { LayoutDashboard, NotebookText } from 'lucide-react';
import Step from './Step';
import { STEP_STATUS } from '@/utils/constants';


const mockList = [
  {
    text: 'Hypothèses manufacturing',
    icon: <NotebookText />,
    status: STEP_STATUS.DONE,
    redirectUrl: '/modules/BS/exercises',
  },
  {
    text: 'TopLine & UpSide',
    icon: <LayoutDashboard />,
    status: STEP_STATUS.IN_PROGRESS,
    redirectUrl: '/modules/BS/exercises',
  },
  {
    text: 'Ajustement des hypothèses',
    icon: <NotebookText />,
    status: STEP_STATUS.INACTIVE,
    redirectUrl: '/modules/BS/exercises',
  },
  {
    text: 'Scénarisation',
    icon: <NotebookText />,
    status: STEP_STATUS.INACTIVE,
    redirectUrl: '/modules/BS/exercises',
  },
  {
    text: 'Arbitrage & Validation',
    icon: <NotebookText />,
    status: STEP_STATUS.INACTIVE,
    redirectUrl: '/modules/BS/exercises',
  },
  {
    text: 'Reporting',
    icon: <NotebookText />,
    status: STEP_STATUS.INACTIVE,
    redirectUrl: '/modules/BS/exercises',
  },
];

function StepList() {
  return (
    <div className="flex justify-between items-center border border-gray-300 bg-white rounded-lg relative">
      {mockList.map((item, key) => (
        <Step
          key={key}
          label={item.text}
          iconKey={item.icon}
          status={item.status}
          redirectUrl={item.redirectUrl}
          stepNumber={key + 1}
          isActive={key == 1}
          isFirst={key === 0}
          isLast={key === mockList.length - 1}
        />
      ))}
    </div>
  );
}

export default StepList;
