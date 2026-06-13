import { lazy, Suspense } from "react";
import { EditorSkeleton } from "./loading";

const JoditEditor = lazy(() => import("jodit-react"));

export default function LazyJoditEditor(props) {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <JoditEditor {...props} />
    </Suspense>
  );
}
