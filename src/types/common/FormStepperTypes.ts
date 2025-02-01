// Types for the stepper configuration
interface Step {
  id: string;
  label: string;
  component: React.ReactNode;
  onNext?: () => Promise<boolean> | boolean;
}

export type { Step };
