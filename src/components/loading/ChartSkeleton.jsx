import { SkeletonBlock } from "./SkeletonBlock";

export default function ChartSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <SkeletonBlock className="h-6 w-40" />
        <SkeletonBlock className="h-10 w-28 rounded-xl" />
      </div>
      <SkeletonBlock className="h-64 w-full rounded-2xl" />
    </div>
  );
}
