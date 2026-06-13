import { SkeletonBlock } from "./SkeletonBlock";

export default function DetailPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <SkeletonBlock className="h-10 w-56" />
        <SkeletonBlock className="h-11 w-36 rounded-xl" />
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="space-y-4 border-b border-gray-100 p-6 lg:border-b-0 lg:border-r">
            <SkeletonBlock className="mx-auto h-28 w-28 rounded-full" />
            <SkeletonBlock className="mx-auto h-5 w-40" />
            <SkeletonBlock className="mx-auto h-4 w-52" />
          </div>
          <div className="space-y-4 p-6 lg:col-span-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex gap-4">
                <SkeletonBlock className="h-4 w-24" />
                <SkeletonBlock className="h-4 flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
