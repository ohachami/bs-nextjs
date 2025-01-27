import { Nullable } from '@/utils/types';
import { FC } from 'react';
import { Badge } from '../ui/badge';

const ExerciseStatus: FC<{
  status: Nullable<string>;
}> = ({ status }) => {
  console.log(status);
  switch (status) {
    case 'IN_PROGRESS':
      return (
        <Badge
          variant="outline"
          className="rounded-full bg-blue text-white font-geist font-semibold h-5"
        >
          En cours
        </Badge>
      );
    default:
      return (
        <Badge
          variant="outline"
          className="rounded-full bg-muted text-muted-foreground font-geist font-semibold h-5"
        >
          {status}
        </Badge>
      );
  }
};

export default ExerciseStatus;
