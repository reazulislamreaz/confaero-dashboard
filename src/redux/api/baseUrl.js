const apiOrigin = import.meta.env.VITE_API_BASE_URL;

if (!apiOrigin) {
  throw new Error("VITE_API_BASE_URL is not defined in environment variables");
}

export const API_ORIGIN = apiOrigin.replace(/\/$/, "");
export const API_BASE_URL = `${API_ORIGIN}/api/v1`;

export default API_ORIGIN;
