<<<<<<< HEAD
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./baseUrl";
// this is a test
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    // test

    // ✅ Inject eventid from localStorage (as requested)
    const eventId = localStorage.getItem("selectedEventId");
    if (eventId && eventId !== "undefined") {
      headers.set("eventid", eventId);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const isLoginRequest =
    typeof args === "string"
      ? args.includes("/auth/login")
      : args.url?.includes("/auth/login");

  if (result.error && result.error.status === 401 && !isLoginRequest) {
    // Intercept 401 Unauthorized globally
    localStorage.removeItem("token");
    // Clear user metadata if stored
    localStorage.removeItem("user");
    localStorage.removeItem("user-info");

    // Redirect to login (Home) page
    window.location.href = "/";
  }

  // Debugging log for 400 errors (as requested)
  if (result.error && result.error.status === 400) {
    console.error("API 400 Error Details:", {
      url: args.url,
      headers: {
        eventid: localStorage.getItem("selectedEventId"),
        hasToken: !!localStorage.getItem("token"),
      },
      error: result.error,
    });
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Events",
    "Announcements",
    "Users",
    "Invitations",
    "Resources",
    "Jobs",
    "AppContent",
    "Files",
    "Reviewer",
    "Exibutors",
    "Sponsors",
    "Notifications",
    "Conversations",
    "Messages",
    "VerifyEmail",
  ],

  endpoints: () => ({}),
});
=======
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://206.162.244.11:8078/api/v1",
  baseUrl: "http://api.confaero.com/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    // test

    // ✅ Inject eventid from localStorage (as requested)
    const eventId = localStorage.getItem("selectedEventId");
    if (eventId && eventId !== "undefined") {
      headers.set("eventid", eventId);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const isLoginRequest =
    typeof args === "string"
      ? args.includes("/auth/login")
      : args.url?.includes("/auth/login");

  if (result.error && result.error.status === 401 && !isLoginRequest) {
    // Intercept 401 Unauthorized globally
    localStorage.removeItem("token");
    // Clear user metadata if stored
    localStorage.removeItem("user");
    localStorage.removeItem("user-info");

    // Redirect to login (Home) page
    window.location.href = "/";
  }

  // Debugging log for 400 errors (as requested)
  if (result.error && result.error.status === 400) {
    console.error("API 400 Error Details:", {
      url: args.url,
      headers: {
        eventid: localStorage.getItem("selectedEventId"),
        hasToken: !!localStorage.getItem("token"),
      },
      error: result.error,
    });
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Events",
    "Announcements",
    "Users",
    "Invitations",
    "Resources",
    "Jobs",
    "AppContent",
    "Files",
    "Reviewer",
    "Exibutors",
    "Sponsors",
    "Notifications",
    "Conversations",
    "Messages",
    "VerifyEmail",
  ],

  endpoints: () => ({}),
});
>>>>>>> a284ea9fe68e0c25f8d196130dc2e627f4c87122
