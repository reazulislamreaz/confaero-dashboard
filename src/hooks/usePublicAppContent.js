import { useEffect, useState } from "react";
import { API_BASE_URL } from "../redux/api/baseUrl";
import { PUBLIC_CONTENT_DEFAULTS } from "../pages/public/defaultContent";

export function usePublicAppContent(type) {
  const defaults = PUBLIC_CONTENT_DEFAULTS[type];
  const [content, setContent] = useState(defaults?.html ?? "");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadContent() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/appContent/${type}`);

        if (!response.ok) {
          throw new Error("Failed to load content");
        }

        const payload = await response.json();
        const apiContent = payload?.data?.content;

        if (!cancelled) {
          setContent(apiContent?.trim() ? apiContent : defaults?.html ?? "");
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError);
          setContent(defaults?.html ?? "");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadContent();

    return () => {
      cancelled = true;
    };
  }, [type, defaults?.html]);

  return {
    content,
    isLoading,
    error,
    title: defaults?.title ?? "Confaero",
    description: defaults?.description ?? "",
  };
}
