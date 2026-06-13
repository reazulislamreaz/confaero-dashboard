import { SkeletonBlock } from "./SkeletonBlock";

export default function DashboardPageSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-6 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <SkeletonBlock className="h-8 w-48 sm:w-64" />
          <SkeletonBlock className="h-4 w-72 max-w-full" />
        </div>
        <div className="flex gap-3">
          <SkeletonBlock className="h-10 w-28 rounded-lg" />
          <SkeletonBlock className="h-10 w-32 rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-2xl bg-white p-5 shadow-sm">
            <SkeletonBlock className="mb-3 h-4 w-24" />
            <SkeletonBlock className="h-8 w-20" />
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SkeletonBlock className="h-10 w-full max-w-sm rounded-lg" />
          <SkeletonBlock className="h-10 w-36 rounded-lg" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4 border-b border-gray-100 pb-3 last:border-b-0">
              <SkeletonBlock className="h-10 w-10 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1 space-y-2">
                <SkeletonBlock className="h-4 w-1/3 max-w-[180px]" />
                <SkeletonBlock className="h-3 w-1/2 max-w-[240px]" />
              </div>
              <SkeletonBlock className="hidden h-8 w-20 rounded-lg sm:block" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SkeletonBlock className="h-56 rounded-2xl" />
        <SkeletonBlock className="h-56 rounded-2xl" />
      </div>
    </div>
  );
}
