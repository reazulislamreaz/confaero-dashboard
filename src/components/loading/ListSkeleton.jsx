import { SkeletonBlock } from "./SkeletonBlock";

export default function ListSkeleton({ rows = 5, showAvatar = true }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
        >
          {showAvatar && (
            <SkeletonBlock className="h-11 w-11 shrink-0 rounded-full" />
          )}
          <div className="min-w-0 flex-1 space-y-2">
            <SkeletonBlock className="h-4 w-1/3" />
            <SkeletonBlock className="h-3 w-2/3" />
          </div>
          <SkeletonBlock className="hidden h-8 w-20 rounded-xl sm:block" />
        </div>
      ))}
    </div>
  );
}
