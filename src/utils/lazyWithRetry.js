import { lazy } from "react";

const CHUNK_ERROR_PATTERN =
  /Failed to fetch dynamically imported module|Loading chunk .* failed|Importing a module script failed/i;

export function isChunkLoadError(error) {
  const message = error?.message || String(error || "");
  return CHUNK_ERROR_PATTERN.test(message);
}

function reloadOnceForChunkError() {
  const reloadKey = `chunk-reload:${window.location.pathname}`;
  if (sessionStorage.getItem(reloadKey)) {
    return false;
  }

  sessionStorage.setItem(reloadKey, "1");
  window.location.reload();
  return true;
}

export default function lazyWithRetry(importFn, retries = 2) {
  return lazy(async () => {
    let lastError;

    for (let attempt = 0; attempt < retries; attempt += 1) {
      try {
        const module = await importFn();
        sessionStorage.removeItem(`chunk-reload:${window.location.pathname}`);
        return module;
      } catch (error) {
        lastError = error;

        if (!isChunkLoadError(error)) {
          throw error;
        }

        if (attempt < retries - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }

    if (isChunkLoadError(lastError) && reloadOnceForChunkError()) {
      return new Promise(() => {});
    }

    throw lastError;
  });
}
