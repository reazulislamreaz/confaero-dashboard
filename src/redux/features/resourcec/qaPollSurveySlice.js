import { apiSlice } from "../../api/apiSlice";

// All routes are under /api/v1/resouce/... (note: backend uses "resouce" not "resources")

const qaPollSurveySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ── Q&A ──────────────────────────────────────────────
    // GET /resouce/event/qna/:eventId
    getQAs: builder.query({
      query: (eventId) => `/resouce/event/qna/${eventId}`,
      providesTags: ["QA"],
    }),

    // POST /resouce/qna/:eventId
    createQA: builder.mutation({
      query: ({ eventId, ...body }) => ({
        url: `/resouce/qna/${eventId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["QA"],
    }),

    // PATCH /resouce/qna/:id/:eventId
    updateQA: builder.mutation({
      query: ({ id, eventId, ...body }) => ({
        url: `/resouce/qna/${id}/${eventId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["QA"],
    }),

    // DELETE /resouce/qna/:id/:eventId
    deleteQA: builder.mutation({
      query: ({ id, eventId }) => ({
        url: `/resouce/qna/${id}/${eventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["QA"],
    }),

    // ── Poll ─────────────────────────────────────────────
    // GET /resouce/event/poll/:eventId
    getPolls: builder.query({
      query: (eventId) => `/resouce/event/poll/${eventId}`,
      providesTags: ["Poll"],
    }),

    // POST /resouce/poll/:eventId
    createPoll: builder.mutation({
      query: ({ eventId, ...body }) => ({
        url: `/resouce/poll/${eventId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Poll"],
    }),

    // PATCH /resouce/poll/:pollId/:eventId
    updatePoll: builder.mutation({
      query: ({ id, eventId, ...body }) => ({
        url: `/resouce/poll/${id}/${eventId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Poll"],
    }),

    // DELETE /resouce/poll/:pollId/:eventId
    deletePoll: builder.mutation({
      query: ({ id, eventId }) => ({
        url: `/resouce/poll/${id}/${eventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Poll"],
    }),

    // POST /resouce/poll/:pollId/:eventId/submit  (user vote)
    votePoll: builder.mutation({
      query: ({ pollId, eventId, selectedOptionIndex }) => ({
        url: `/resouce/poll/${pollId}/${eventId}/submit`,
        method: "POST",
        body: { selectedOptionIndex },
      }),
      invalidatesTags: ["Poll"],
    }),

    // GET /resouce/poll/:pollId/:eventId/votes
    getPollVotes: builder.query({
      query: ({ pollId, eventId }) => `/resouce/poll/${pollId}/${eventId}/votes`,
      providesTags: ["Poll"],
    }),

    // ── Survey ───────────────────────────────────────────
    // GET /resouce/survey/:eventId/analytics
    // Returns { summary: { totalResponses, averageRating, positiveFeedback }, submissions, meta }
    getSurveyAnalytics: builder.query({
      query: ({ eventId, page = 1, limit = 10 }) =>
        `/resouce/survey/${eventId}/analytics?page=${page}&limit=${limit}`,
      providesTags: ["Survey"],
    }),
  }),
});

export const {
  // Q&A
  useGetQAsQuery,
  useCreateQAMutation,
  useUpdateQAMutation,
  useDeleteQAMutation,
  // Poll
  useGetPollsQuery,
  useCreatePollMutation,
  useUpdatePollMutation,
  useDeletePollMutation,
  useVotePollMutation,
  useGetPollVotesQuery,
  // Survey
  useGetSurveyAnalyticsQuery,
} = qaPollSurveySlice;
