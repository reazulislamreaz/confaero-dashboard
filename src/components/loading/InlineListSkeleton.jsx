import { SkeletonBlock } from "./SkeletonBlock";

export default function InlineListSkeleton({ rows = 4 }) {
  return (
    <div className="space-y-2 p-2">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 px-2 py-2">
          <SkeletonBlock className="h-8 w-8 shrink-0 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <SkeletonBlock className="h-3 w-2/5" />
            <SkeletonBlock className="h-3 w-3/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
