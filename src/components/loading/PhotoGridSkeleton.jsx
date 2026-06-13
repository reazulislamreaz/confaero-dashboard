import { SkeletonBlock } from "./SkeletonBlock";

export default function PhotoGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm"
        >
          <SkeletonBlock className="aspect-[4/3] w-full rounded-none" />
          <div className="space-y-2 p-4">
            <SkeletonBlock className="h-4 w-2/3" />
            <SkeletonBlock className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
