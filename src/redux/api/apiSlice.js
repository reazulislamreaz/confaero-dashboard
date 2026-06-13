import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("user-info");
    window.location.href = "/";
  }

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
