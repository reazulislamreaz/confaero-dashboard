import LoadingSpinner from "./LoadingSpinner";

export default function AuthPageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-sm">
        <LoadingSpinner size="lg" label="Loading page..." />
      </div>
    </div>
  );
}
