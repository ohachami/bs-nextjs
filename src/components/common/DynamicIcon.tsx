import { LucideProps } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[name];

  if (!IconComponent) {
    return <span>Icon not found</span>;
  }

  return <IconComponent {...props} />;
};
