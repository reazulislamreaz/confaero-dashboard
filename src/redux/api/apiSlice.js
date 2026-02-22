


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reaz8080.syedbipul.me/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
    //   console.log("9 baseApi", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Events", "Announcements", "Users", "Coupon", "About"],  

  endpoints: () => ({}),
});
