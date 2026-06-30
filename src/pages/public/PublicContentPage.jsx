import { useEffect } from "react";
import PublicPageLayout from "./PublicPageLayout";
import { usePublicAppContent } from "../../hooks/usePublicAppContent";

export default function PublicContentPage({ contentType, loadingLabel }) {
  const { content, isLoading, title, description } = usePublicAppContent(contentType);

  useEffect(() => {
    document.title = `${title} | Confaero Dashboard`;
  }, [title]);

  return (
    <PublicPageLayout>
      <article className="rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-8 border-b border-gray-100 pb-6">
          <p className="text-sm font-medium uppercase tracking-wide text-[#0FC3C2]">
            Confaero
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h1>
          {description ? (
            <p className="mt-3 max-w-3xl text-gray-600">{description}</p>
          ) : null}
        </div>

        {isLoading ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-[#0FC3C2]">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0FC3C2]/20 border-t-[#0FC3C2]" />
            <p className="text-sm font-medium tracking-wide">{loadingLabel}</p>
          </div>
        ) : (
          <div
            className="public-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

      </article>
    </PublicPageLayout>
  );
}
