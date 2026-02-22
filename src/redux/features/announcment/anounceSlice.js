import { apiSlice } from "../../api/apiSlice";

const announceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    ///// Announcements
    getAnnouncements: builder.query({
        query: ({eventId,page, limit = 10}) => `/announcement/get-all/${eventId}/?page=${page}&limit=${limit}`,
        providesTags: ['Announcements']
    }),

    createAnnouncement: builder.mutation({
        query: ({ eventId, body }) => ({
            url: `/announcement/${eventId}`,
            method: 'POST',
            body: body,
        }),
        invalidatesTags: ['Announcements'],
    }),

    updateAnnouncement: builder.mutation({
        query: ({ announcementId,eventId, body }) => ({
    url: `/announcement/${announcementId}/${eventId}`,
            method: 'PATCH',
            body: body,
        }),
        invalidatesTags: ['Announcements'],
    }),
    deleteAnnouncement: builder.mutation({
        query: ({ announcementId,eventId }) => ({   
            url: `/organizerAnnouncement/announcements/${announcementId}/${eventId}`,
            method: 'DELETE',
        }), 
        invalidatesTags: ['Announcements'],
    }),
  }),
});

export const {
    useGetAnnouncementsQuery,
    useCreateAnnouncementMutation,
    useUpdateAnnouncementMutation,
    useDeleteAnnouncementMutation,
} = announceSlice;