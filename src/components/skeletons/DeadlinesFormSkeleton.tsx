import { Skeleton } from "../ui/skeleton";

function DeadlinesFormSkeleton() {
  return (
    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
      {new Array(6).fill(0).map((_, key: number) => (
        <div key={key} className="grid grid-cols-3 items-center gap-3">
          <Skeleton className="h-9 w-full rounded-lg bg-gray-100" />
          <div className="col-span-2">
            <Skeleton className="h-9 w-full rounded-lg bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default DeadlinesFormSkeleton;