import { apiSlice } from "../../api/apiSlice";

export const reviewerSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
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
} = reviewerSlice;
