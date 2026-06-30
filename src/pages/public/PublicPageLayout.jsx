export default function PublicPageLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">{children}</main>
    </div>
  );
}
