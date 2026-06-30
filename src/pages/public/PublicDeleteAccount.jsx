import { useEffect } from "react";
import PublicPageLayout from "./PublicPageLayout";

const supportEmail = "support@confaero.com";
const developerEmail = "reazul.dev@gmail.com";

const steps = [
  {
    title: "Open Settings",
    description:
      "Sign in to the Confaero app, open the menu, and go to Settings. Scroll down and tap Delete Account.",
    image: "/image/delete-account/settings.png",
    alt: "Confaero app Settings screen showing the Delete Account option",
  },
  {
    title: "Confirm with your password",
    description:
      "Enter your current password to confirm account removal. This permanently deletes your account and all personal data. This action cannot be undone.",
    image: "/image/delete-account/confirm.png",
    alt: "Confaero app Delete Account screen with password confirmation",
  },
];

export default function PublicDeleteAccount() {
  useEffect(() => {
    document.title = "Delete Account | Confaero Dashboard";
  }, []);

  return (
    <PublicPageLayout>
      <article className="rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-8 border-b border-gray-100 pb-6">
          <p className="text-sm font-medium uppercase tracking-wide text-[#0FC3C2]">
            Confaero
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Delete Account
          </h1>
          <p className="mt-3 max-w-3xl text-gray-600">
            Follow these steps in the Confaero mobile app to permanently delete
            your account and associated personal data.
          </p>
        </div>

        <div className="public-content">
          <h3>Before you delete your account</h3>
          <ul>
            <li>Export any event data or records you need before deleting.</li>
            <li>Deletion is permanent and cannot be undone once completed.</li>
            <li>
              Some information may be retained where required by law or for
              legitimate business purposes.
            </li>
          </ul>

          <h3>How to delete your account in the app</h3>
          <div className="mt-6 space-y-10">
            {steps.map((step, index) => (
              <section key={step.title} className="space-y-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-[#0FC3C2]">
                    Step {index + 1}
                  </p>
                  <h4 className="mt-1 text-lg font-semibold text-gray-900">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-gray-600">{step.description}</p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-6">
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="mx-auto max-h-[520px] w-full max-w-xs object-contain"
                  />
                </div>
              </section>
            ))}
          </div>

          <h3>Need help?</h3>
          <p>
            If you cannot access the app or need assistance with account
            deletion, contact our support team at{" "}
            <a href={`mailto:${supportEmail}`}>{supportEmail}</a> or reach the
            developer at{" "}
            <a href={`mailto:${developerEmail}`}>{developerEmail}</a>.
          </p>
        </div>
      </article>
    </PublicPageLayout>
  );
}
