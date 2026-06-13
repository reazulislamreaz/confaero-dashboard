import { SkeletonBlock } from "./SkeletonBlock";
import CardGridSkeleton from "./CardGridSkeleton";
import ListSkeleton from "./ListSkeleton";

export default function DashboardPageSkeleton() {
  return (
    <div className="w-full space-y-6 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <SkeletonBlock className="h-8 w-48 sm:w-64" />
          <SkeletonBlock className="h-4 w-72 max-w-full" />
        </div>
        <div className="flex gap-3">
          <SkeletonBlock className="h-10 w-28 rounded-xl" />
          <SkeletonBlock className="h-10 w-32 rounded-xl" />
        </div>
      </div>

      <CardGridSkeleton count={4} columns={4} />

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SkeletonBlock className="h-10 w-full max-w-sm rounded-xl" />
          <SkeletonBlock className="h-10 w-36 rounded-xl" />
        </div>
        <ListSkeleton rows={6} />
      </div>
    </div>
  );
}
