import { apiSlice } from "../../api/apiSlice";

const verifyEmailApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVerifyEmails: builder.query({
      query: ({ eventId, page = 1, limit = 10 }) => ({
        url: `/organizer/verify-email/list/${eventId}`,
        params: { page, limit },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: "VerifyEmail", id: _id })),
              { type: "VerifyEmail", id: "LIST" },
            ]
          : [{ type: "VerifyEmail", id: "LIST" }],
    }),
    // added
    addVerifyEmails: builder.mutation({
      query: ({ eventId, emails }) => ({
        url: `/organizer/verify-email/add`,
        method: "POST",
        body: { eventId, emails },
      }),
      invalidatesTags: [{ type: "VerifyEmail", id: "LIST" }],
    }),
    uploadVerifyEmailCSV: builder.mutation({
      query: ({ eventId, file }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("eventId", eventId);
        return {
          url: `/organizer/verify-email/upload`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "VerifyEmail", id: "LIST" }],
    }),
    deleteVerifyEmail: builder.mutation({
      query: ({ eventId, verifyEmailId }) => ({
        url: `/organizer/verify-email/${verifyEmailId}`,
        method: "DELETE",
        headers: {
          eventid: eventId,
        },
      }),
      invalidatesTags: [{ type: "VerifyEmail", id: "LIST" }],
    }),
  }),
});

export const {
  useGetVerifyEmailsQuery,
  useAddVerifyEmailsMutation,
  useUploadVerifyEmailCSVMutation,
  useDeleteVerifyEmailMutation,
} = verifyEmailApiSlice;
