import { SkeletonBlock } from "./SkeletonBlock";

export default function ListSkeleton({ rows = 5, showAvatar = true, columns = 3 }) {
  return (
    <div className="divide-y divide-gray-50">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-4 px-6 py-4">
          {showAvatar && (
            <SkeletonBlock className="h-8 w-8 shrink-0 rounded-full" />
          )}
          <div className="min-w-0 flex-1 space-y-2">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <SkeletonBlock
                key={colIndex}
                className="h-4"
                style={{ width: `${50 + colIndex * 9}%` }}
              />
            ))}
          </div>
          <SkeletonBlock className="hidden h-8 w-20 rounded-xl sm:block" />
        </div>
      ))}
    </div>
  );
}
