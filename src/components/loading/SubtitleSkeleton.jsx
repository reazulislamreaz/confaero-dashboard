import { SkeletonBlock } from "./SkeletonBlock";

export default function SubtitleSkeleton({ className = "mt-1 h-4 w-32" }) {
  return <SkeletonBlock className={className} />;
}
