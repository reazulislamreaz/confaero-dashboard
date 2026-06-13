import { SkeletonBlock } from "./SkeletonBlock";

export default function DashboardShellSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex min-h-[calc(100vh-2rem)]">
        <aside className="fixed left-3 top-4 z-30 hidden w-[200px] shrink-0 md:block">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <SkeletonBlock className="mx-auto mb-6 h-12 w-12 rounded-xl" />
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonBlock key={index} className="h-9 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden pl-[120px] md:pl-[220px] lg:pl-[280px]">
          <div className="fixed z-30 w-[75%] pt-2 lg:w-[calc(98%-300px)]">
            <div className="rounded-2xl bg-white px-6 py-4 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <SkeletonBlock className="h-8 w-40" />
                <div className="flex items-center gap-3">
                  <SkeletonBlock className="h-10 w-10 rounded-full" />
                  <SkeletonBlock className="h-10 w-28 rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 pt-[88px]">
            <div className="space-y-6">
              <SkeletonBlock className="h-8 w-56" />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonBlock key={index} className="h-28 rounded-2xl" />
                ))}
              </div>
              <SkeletonBlock className="h-80 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
