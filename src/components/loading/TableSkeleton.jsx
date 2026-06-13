import TableSkeletonRow from "./TableSkeletonRow";

export default function TableSkeleton({ rows = 5, columns = 6 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <TableSkeletonRow key={index} columns={columns} />
      ))}
    </>
  );
}
