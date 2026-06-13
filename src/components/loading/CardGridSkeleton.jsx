import { SkeletonBlock } from "./SkeletonBlock";

export default function CardGridSkeleton({ count = 6, columns = 2 }) {
  const gridClass =
    columns === 3
      ? "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
      : columns === 4
        ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        : "grid grid-cols-1 gap-4 md:grid-cols-2";

  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
        >
          <div className="flex gap-4">
            <SkeletonBlock className="h-14 w-14 shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1 space-y-2.5">
              <SkeletonBlock className="h-4 w-2/5" />
              <SkeletonBlock className="h-3 w-4/5" />
              <SkeletonBlock className="h-3 w-3/5" />
            </div>
          </div>
          <SkeletonBlock className="mt-4 h-10 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}
