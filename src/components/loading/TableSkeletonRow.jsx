import { SkeletonBlock } from "./SkeletonBlock";

export default function TableSkeletonRow({ columns = 6 }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="px-6 py-4">
          <SkeletonBlock
            className="h-4"
            style={{ width: `${50 + index * 9}%` }}
          />
        </td>
      ))}
    </tr>
  );
}
