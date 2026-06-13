export default function LoadingSpinner({ size = "md", label }) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-9 w-9 border-[3px]",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3" role="status" aria-live="polite">
      <div
        className={`animate-spin rounded-full border-[#0FC3C2] border-t-transparent ${sizeClasses[size]}`}
      />
      {label ? (
        <p className="text-sm font-medium text-gray-500">{label}</p>
      ) : (
        <span className="sr-only">Loading</span>
      )}
    </div>
  );
}
