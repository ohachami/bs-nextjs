import { useExerciseStore } from "@/store/exercises/useExerciseStore";
import DashboardWrapper from "./DashboardWrapper";
import SalesDashboard from "./SalesDashboard";

function SalesConsolidationPage() {
  const currentExercise = useExerciseStore((state) => state.currentExercise);

  return (
    <DashboardWrapper
      items={[
        {
          code: 'HYPO_SALES',
          name: 'Hypothèses Commerciales',
          content: <SalesDashboard exercise={currentExercise} />,
        },
        {
          code: 'HYPE_MANUFACTURING',
          name: 'Hypothèses Manufacturing',
          content: <div />,
        },
        { code: 'HYPE_MINING', name: 'Hypothèses Mining', content: <div /> },
      ]}
    />
  );
}

export default SalesConsolidationPage;