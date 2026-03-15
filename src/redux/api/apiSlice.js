import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://206.162.244.11:8078/api/v1",
    baseUrl: "http://10.10.11.30:8080/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      //   console.log("9 baseApi", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Events",
    "Announcements",
    "Users",
    "Invitations",
    "Resources",
    "Jobs",
    "Setting",
  ],

  endpoints: () => ({}),
});
