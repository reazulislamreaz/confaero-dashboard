import { Suspense } from "react";
import { EditorSkeleton } from "./loading";
import lazyWithRetry from "../utils/lazyWithRetry";

const JoditEditor = lazyWithRetry(() => import("jodit-react"));

export default function LazyJoditEditor(props) {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <JoditEditor {...props} />
    </Suspense>
  );
}
