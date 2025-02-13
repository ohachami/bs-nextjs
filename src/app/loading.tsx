import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex flex-col h-sceen space-y-3 justify-center items-center my-4">
        <Skeleton className="h-[125px] w-[450px] rounded-xl" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-[450px]" />
            <Skeleton className="h-4 w-[400px]" />
        </div>
    </div>
    )
  }