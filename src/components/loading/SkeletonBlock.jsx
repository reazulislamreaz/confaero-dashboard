export function SkeletonBlock({ className = "", style }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-gray-200 ${className}`}
      style={style}
    />
  );
}
