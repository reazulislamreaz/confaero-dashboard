<<<<<<< HEAD
const apiOrigin = import.meta.env.VITE_API_BASE_URL;

if (!apiOrigin) {
  throw new Error("VITE_API_BASE_URL is not defined in environment variables");
}

export const API_ORIGIN = apiOrigin.replace(/\/$/, "");
export const API_BASE_URL = `${API_ORIGIN}/api/v1`;

export default API_ORIGIN;
=======
// const url = "http://206.162.244.11:8078";
const url = "http://api.confaero.com";
export default url;
>>>>>>> a284ea9fe68e0c25f8d196130dc2e627f4c87122
