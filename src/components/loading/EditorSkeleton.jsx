import { SkeletonBlock } from "./SkeletonBlock";
import LoadingSpinner from "./LoadingSpinner";

export default function EditorSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonBlock key={index} className="h-7 w-7 rounded-md" />
        ))}
      </div>
      <div className="flex min-h-64 items-center justify-center bg-gray-50 p-6">
        <LoadingSpinner size="md" label="Loading editor..." />
      </div>
    </div>
  );
}
