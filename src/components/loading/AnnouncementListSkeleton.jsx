import { SkeletonBlock } from "./SkeletonBlock";

export default function AnnouncementListSkeleton({ rows = 6 }) {
  return (
    <div className="divide-y divide-gray-200">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-1 items-start gap-3">
              <SkeletonBlock className="mt-3 h-10 w-10 shrink-0 rounded-lg" />
              <div className="min-w-0 flex-1 space-y-2.5">
                <SkeletonBlock className="h-3" style={{ width: "40%" }} />
                <SkeletonBlock className="h-6" style={{ width: "60%" }} />
                <SkeletonBlock className="h-3" style={{ width: "100%" }} />
                <SkeletonBlock className="h-3" style={{ width: "80%" }} />
              </div>
            </div>
            <div className="ml-4 flex gap-2">
              <SkeletonBlock className="h-8 w-8 rounded-lg" />
              <SkeletonBlock className="h-8 w-8 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
