
import { apiSlice } from "../../api/apiSlice";

const notificationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: ({ eventId, page = 1, limit = 10 }) => 
        `/messageOrganizer/notifications/${eventId}?page=${page}&limit=${limit}`,
      providesTags: ['Notifications']
    }),

    markAsRead: builder.mutation({
      query: ({ notificationId, eventId }) => ({
        url: `/messageOrganizer/notifications/${notificationId}/${eventId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notifications'],
    }),

    markAllAsRead: builder.mutation({
      query: ({ eventId }) => ({
        url: `/messageOrganizer/notifications/read-all/${eventId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notifications'],
    })
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation
} = notificationSlice;