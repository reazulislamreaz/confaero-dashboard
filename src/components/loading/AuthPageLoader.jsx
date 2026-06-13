import { SkeletonBlock } from "./SkeletonBlock";

export default function AuthPageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mx-auto mb-8 flex flex-col items-center gap-3">
          <SkeletonBlock className="h-16 w-16 rounded-2xl" />
          <SkeletonBlock className="h-5 w-40" />
          <SkeletonBlock className="h-4 w-56" />
        </div>
        <div className="space-y-4">
          <SkeletonBlock className="h-12 w-full rounded-xl" />
          <SkeletonBlock className="h-12 w-full rounded-xl" />
          <SkeletonBlock className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
