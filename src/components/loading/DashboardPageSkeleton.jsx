import { SkeletonBlock } from "./SkeletonBlock";
import TableSkeletonRow from "./TableSkeletonRow";
import SubtitleSkeleton from "./SubtitleSkeleton";

export default function DashboardPageSkeleton({ rows = 5, columns = 6 }) {
  const headers = Array.from({ length: columns }, (_, index) => `Column ${index + 1}`);

  return (
    <div className="w-full space-y-6 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <SkeletonBlock className="h-8 w-48 sm:w-64" />
          <SubtitleSkeleton />
        </div>
        <SkeletonBlock className="h-10 w-36 rounded-xl" />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-3">
          <SkeletonBlock className="h-10 w-full max-w-md rounded-lg" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {headers.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400"
                  >
                    <SkeletonBlock className="h-3 w-16" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {Array.from({ length: rows }).map((_, index) => (
                <TableSkeletonRow key={index} columns={columns} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
