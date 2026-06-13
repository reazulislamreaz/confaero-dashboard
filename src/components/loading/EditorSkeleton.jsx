import { SkeletonBlock } from "./SkeletonBlock";

export default function EditorSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex flex-wrap gap-2 border-b border-gray-100 px-4 py-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonBlock key={index} className="h-8 w-8 rounded-lg" />
        ))}
      </div>
      <div className="space-y-3 p-6">
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-11/12" />
        <SkeletonBlock className="h-4 w-4/5" />
        <SkeletonBlock className="h-32 w-full rounded-2xl" />
        <SkeletonBlock className="h-4 w-3/5" />
      </div>
    </div>
  );
}
