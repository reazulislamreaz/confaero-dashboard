import { apiSlice } from "../../api/apiSlice";

const appContentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get content by type
    getAppContent: builder.query({
      query: (type) => `/appContent/${type}`,
      providesTags: ["AppContent"],
    }),

    // CREATE + UPDATE (same route)
    saveAppContent: builder.mutation({
      query: (body) => ({
        url: `/appContent/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["AppContent"],
    }),
  }),
});

export const { useGetAppContentQuery, useSaveAppContentMutation } =
  appContentSlice;

