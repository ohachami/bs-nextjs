import { TriangleAlertIcon } from 'lucide-react';
import { FC } from 'react';
import { Badge } from '../ui/badge';

const ExerciseStatus: FC<{
  status: 'IN_PROGRESS' | 'DEADLINE_CLOSE';
}> = ({ status }) => {
  switch (status) {
    case 'IN_PROGRESS':
      return (
        <Badge
          variant="outline"
          className="rounded-full bg-blue-500 text-white font-geist font-semibold h-5 hover:cursor-default"
        >
          En cours
        </Badge>
      );
    case 'DEADLINE_CLOSE':
      return (
        <Badge
          variant="outline"
          className="rounded-full bg-red-500 text-white font-geist font-semibold px-2.5 py-0.5 flex items-center gap-1 text-nowrap hover:cursor-default"
        >
          <TriangleAlertIcon className="size-3" />
          <span>Bientôt fini</span>
        </Badge>
      );
    default:
      return (
        <Badge
          variant="outline"
          className="rounded-full bg-muted text-muted-foreground font-geist font-semibold h-5 hover:cursor-default"
        >
          {status}
        </Badge>
      );
  }
};

export default ExerciseStatus;
