
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useRouteError } from "react-router-dom";
import { isChunkLoadError } from "../utils/lazyWithRetry";

const ErrorPage = () => {
  const error = useRouteError();
  const chunkLoadError = isChunkLoadError(error);

  if (chunkLoadError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 p-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          A new version is available
        </h1>
        <p className="max-w-md text-gray-600">
          The app was updated. Refresh the page to load the latest version.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-xl bg-[#0FC3C2] px-6 py-3 font-medium text-white"
        >
          Refresh page
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-[1000px] items-center justify-center">
      <Link
        to="/dashboard/home"
        className="rounded-lg bg-green-400 px-5 py-1 text-2xl"
      >
        <button type="button" className="flex items-center">
          <FaArrowLeft />
          home
        </button>
      </Link>

      <img
        src="https://www.neonrain.com/wp-content/uploads/2022/07/iStock-463353707.jpg"
        alt=""
      />
    </div>
  );
};

export default ErrorPage;
