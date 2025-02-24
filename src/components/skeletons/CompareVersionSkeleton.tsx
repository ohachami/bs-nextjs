import { Skeleton } from '../ui/skeleton';

function ComapreVersionsSkeleton() {
  return (
    <div className="flex justify-between gap-3 items-center">
      <div className="w-full flex gap-2">
        {Array(4)
          .fill(0)
          .map((_, key) => (
            <Skeleton key={key} className="w-1/6 h-9 rounded-lg bg-gray-200" />
          ))}
      </div>
      <Skeleton className="w-1/5 h-9 rounded-lg bg-gray-200" />
    </div>
  );
}

export default ComapreVersionsSkeleton;
