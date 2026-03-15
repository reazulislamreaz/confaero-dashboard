import { apiSlice } from "../../api/apiSlice";

const settingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get settings
    getSettings: builder.query({
      query: (eventId) => `/settings/${eventId}`,
      providesTags: ["Settings"],
    }),

    // Update settings
    updateSettings: builder.mutation({
      query: ({ eventId, body }) => ({
        url: `/settings/${eventId}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingSlice;
