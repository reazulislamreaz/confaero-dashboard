import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://reazul8078.suplify.life/api/v1",
  baseUrl: "http://10.10.11.30:8080/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

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
  
  if (result.error && result.error.status === 401) {
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
        hasToken: !!localStorage.getItem("token")
      },
      error: result.error
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
  ],

  endpoints: () => ({}),
});
