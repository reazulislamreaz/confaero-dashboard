import { apiSlice } from "../../api/apiSlice";

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStripeStatus: builder.query({
      query: () => `/organizer/stripe/status`,
      providesTags: ["Users"],
    }),

    connectStripe: builder.mutation({
      query: () => ({
        url: `/organizer/stripe/connect`,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetStripeStatusQuery, useConnectStripeMutation } = paymentApiSlice;
