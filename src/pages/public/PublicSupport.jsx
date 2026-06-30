import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PublicPageLayout from "./PublicPageLayout";

const supportEmail = "support@confaero.com";
const developerEmail = "reazul.dev@gmail.com";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function PublicSupport() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Support | Confaero Dashboard";
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!fullName.trim()) {
      nextErrors.fullName = "Full name is required";
    }

    if (!email.trim()) {
      nextErrors.email = "Email address is required";
    } else if (!validateEmail(email)) {
      nextErrors.email = "Please enter a valid email address";
    }

    if (!message.trim()) {
      nextErrors.message = "Please tell us how we can help";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const subject = encodeURIComponent(`Support request from ${fullName.trim()}`);
    const body = encodeURIComponent(
      `Name: ${fullName.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    );

    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
    toast.success("Your email client will open to send your message.");
    setIsSubmitting(false);
  };

  return (
    <PublicPageLayout>
      <article className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <p className="text-sm font-medium uppercase tracking-wide text-[#0FC3C2]">
          Help
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
          Contact Support
        </h1>
        <p className="mt-3 text-gray-600">
          Have an issue or question? Send us a message and we&apos;ll get back to
          you within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
                setErrors((current) => ({ ...current, fullName: "" }));
              }}
              placeholder="Your full name"
              className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#0FC3C2] ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fullName ? (
              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrors((current) => ({ ...current, email: "" }));
              }}
              placeholder="you@example.com"
              className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#0FC3C2] ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email ? (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              How can we help?
            </label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
                setErrors((current) => ({ ...current, message: "" }));
              }}
              placeholder="Describe your issue or question..."
              className={`w-full resize-y rounded-lg border px-4 py-3 outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#0FC3C2] ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.message ? (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#0FC3C2] py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="mt-8 border-t border-gray-100 pt-6 text-center text-sm text-gray-600">
          <p>
            You can also reach us at{" "}
            <a
              href={`mailto:${supportEmail}`}
              className="font-medium text-[#0FC3C2] hover:underline"
            >
              {supportEmail}
            </a>
          </p>
          <p className="mt-2">
            Developer:{" "}
            <a
              href={`mailto:${developerEmail}`}
              className="font-medium text-[#0FC3C2] hover:underline"
            >
              {developerEmail}
            </a>
          </p>
        </div>
      </article>
    </PublicPageLayout>
  );
}
