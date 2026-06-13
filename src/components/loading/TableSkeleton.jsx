import { SkeletonBlock } from "./SkeletonBlock";

const widthClasses = ["w-full", "w-4/5", "w-3/5", "w-2/3", "w-1/2", "w-3/4"];

export default function TableSkeleton({ rows = 5, columns = 6 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="px-6 py-4">
              <SkeletonBlock
                className={`h-4 ${widthClasses[(rowIndex + colIndex) % widthClasses.length]}`}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
