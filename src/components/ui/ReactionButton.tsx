import { cn } from '@/lib/utils';

type Props = {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  active: boolean;
  color: string;
  count?: number;
  onClick?: () => void;
};

const ReactionButton: React.FC<Props> = ({
  Icon,
  active,
  color,
  count,
  onClick,
}) => {
  return (
    <div className="flex items-center justify-left">
      {count && (
        <span className="text-sm font-medium text-gray-400">{count}</span>
      )}
      <button
        className={cn(
          'flex items-center justify-center p-1 rounded-full',
          active ? 'bg-opacity-100' : 'bg-opacity-50',
          color
        )}
        type="button"
        onClick={onClick}
      >
        <Icon
          className={cn(active ? 'fill-current' : 'stroke-current', color)}
        />
      </button>
    </div>
  );
};

export { ReactionButton };
