import { lazy, Suspense } from "react";

const JoditEditor = lazy(() => import("jodit-react"));

export default function LazyJoditEditor(props) {
  return (
    <Suspense
      fallback={
        <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
      }
    >
      <JoditEditor {...props} />
    </Suspense>
  );
}
