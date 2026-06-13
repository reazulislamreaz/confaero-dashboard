import { SkeletonBlock } from "./SkeletonBlock";

export default function FormSkeleton() {
  return (
    <div className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <SkeletonBlock className="h-8 w-48" />
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <SkeletonBlock className="h-4 w-28" />
          <SkeletonBlock className="h-11 w-full rounded-xl" />
        </div>
      ))}
      <SkeletonBlock className="h-64 w-full rounded-2xl" />
      <div className="flex justify-end">
        <SkeletonBlock className="h-11 w-36 rounded-xl" />
      </div>
    </div>
  );
}
