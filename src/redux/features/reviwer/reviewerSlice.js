import { apiSlice } from "../../api/apiSlice";

export const reviewerSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all reviewers
    getAllReviewers: builder.query({
      query: (eventId) => `/poster-assign/reviewers/${eventId}`,
      providesTags: ["Reviewer"],
    }),

    // reviewer stats (top cards)
    getReviewerStats: builder.query({
      query: (eventId) => `/poster-assign/reviewer-stats/${eventId}`,
      providesTags: ["Reviewer"],
    }),

    // search reviewer
    searchReviewer: builder.query({
      query: ({ eventId, search }) =>
        `/poster-assign/speakers/search/${eventId}?search=${search}`,
    }),

    // unassigned files
    getUnassignFiles: builder.query({
      query: (eventId) => `/poster-assign/unassigned/${eventId}`,
      providesTags: ["Files"],
    }),

    // search unassigned files
    searchUnassignFiles: builder.query({
      query: ({ eventId, search, type }) =>
        `/poster-assign/unassigned/search/${eventId}?search=${search}&type=${type}`,
    }),

    // assigned documents
    getAssignedDocuments: builder.query({
      query: ({ eventId, type }) =>
        `/poster-assign/assigned/${eventId}?type=${type}`,
      providesTags: ["Files"],
    }),

    // assigned posters
    getAssignedPosters: builder.query({
      query: ({ eventId, type }) =>
        `/poster-assign/assigned/${eventId}?type=${type}`,
      providesTags: ["Files"],
    }),

    // reported files
    getReportedFiles: builder.query({
      query: (eventId) => `/poster-assign/reported/${eventId}`,
    }),

    // assign reviewer
    assignReviewer: builder.mutation({
      query: ({ eventId, body }) => ({
        url: `/poster-assign/create/${eventId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Files", "Reviewer"],
    }),

    // reassign reviewer
    reAssignReviewer: builder.mutation({
      query: ({ eventId, body }) => ({
        url: `/poster-assign/reassign/${eventId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Files", "Reviewer"],
    }),

    // send reminder
    sendReminder: builder.mutation({
      query: (assignmentId) => ({
        url: `/poster-assign/send-reminder/${assignmentId}`,
        method: "POST",
      }),
    }),

    // review poster/image (scoring)
    reviewImage: builder.mutation({
      query: ({ attachmentId, body }) => ({
        url: `/reviewer/attachments/${attachmentId}/image-review`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Files"],
    }),

    // approve document (PDF)
    approveDocument: builder.mutation({
      query: (attachmentId) => ({
        url: `/reviewer/attachments/${attachmentId}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["Files"],
    }),

    // reject document (PDF)
    rejectDocument: builder.mutation({
      query: ({ attachmentId, reason }) => ({
        url: `/reviewer/attachments/${attachmentId}/reject`,
        method: "PATCH",
        body: { reason },
      }),
      invalidatesTags: ["Files"],
    }),

    // revise document (PDF)
    reviseDocument: builder.mutation({
      query: ({ attachmentId, reason }) => ({
        url: `/reviewer/attachments/${attachmentId}/revise`,
        method: "PATCH",
        body: { reason },
      }),
      invalidatesTags: ["Files"],
    }),

    // flag admin document (PDF)
    flagAdminDocument: builder.mutation({
      query: ({ attachmentId, reason }) => ({
        url: `/reviewer/attachments/${attachmentId}/flag-admin`,
        method: "PATCH",
        body: { reason },
      }),
      invalidatesTags: ["Files"],
    }),

    // get top posters by rating (for dashboard)
    getTopPosters: builder.query({
      query: ({ eventId, limit = 3 }) =>
        `/poster-assign/top-posters/${eventId}?limit=${limit}`,
      providesTags: ["Files"],
    }),
  }),
});

export const {
  useGetAllReviewersQuery,
  useGetReviewerStatsQuery,
  useSearchReviewerQuery,
  useGetUnassignFilesQuery,
  useSearchUnassignFilesQuery,
  useGetAssignedDocumentsQuery,
  useGetAssignedPostersQuery,
  useGetReportedFilesQuery,
  useAssignReviewerMutation,
  useReAssignReviewerMutation,
  useSendReminderMutation,
  useReviewImageMutation,
  useApproveDocumentMutation,
  useRejectDocumentMutation,
  useReviseDocumentMutation,
  useFlagAdminDocumentMutation,
  useGetTopPostersQuery,
} = reviewerSlice;
