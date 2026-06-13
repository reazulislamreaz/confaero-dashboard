import { SkeletonBlock } from "./SkeletonBlock";

export default function InlineListSkeleton({ rows = 4, columns = 2 }) {
  return (
    <div className="divide-y divide-gray-50">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-3 px-6 py-4">
          <SkeletonBlock className="h-8 w-8 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <SkeletonBlock
                key={colIndex}
                className="h-3"
                style={{ width: `${50 + colIndex * 9}%` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
