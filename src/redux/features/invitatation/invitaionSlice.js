import { apiSlice } from "../../api/apiSlice";

const invitaionSlice =  apiSlice.injectEndpoints({
    endpoints: (builder) => ({

         getInvitations: builder.query({
  query: ({ id, page = 1, limit = 9, role = '', status = '', search = '' }) => ({
    url: `/invitation/event/${id}`,
    method: 'GET',
    params: {
      page,
      limit,
      ...(role   && { role }),
      ...(status && { status }),
      ...(search && { search }),
    },
  }),
  providesTags: ['Invitations'],
   }),



        sendInvitation: builder.mutation({  
            query: ({ data , id}) => ({
                url: `/invitation/create/${id}`,
                method: 'POST', 
                body: data,
            }),
            invalidatesTags: ['Invitations'],
        }),
 
    sendInvitationForSpeker: builder.mutation({
  query: ({data, eventId}) => ({
    url: `/invitation/${eventId}/make-speaker`,
    method: 'POST',
    body: data,
  }),
  invalidatesTags: ['Invitations'], 
    }),

    deleteInvitation: builder.mutation({
  query: ({inviteId, eventId}) => ({
    url: `/invitation/${inviteId}/${eventId}`, 
    method: 'DELETE',
  }),
  invalidatesTags: ['Invitations'], 
    }),    

    resendInvitation: builder.mutation({
      query: ({ invitationId, eventId }) => ({
        url: `/invitation/${invitationId}/resend/${eventId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Invitations'],
    }),






    }),
});

export const { 
    useSendInvitationMutation, 
    useGetInvitationsQuery ,
    useSendInvitationForSpekerMutation,
    useDeleteInvitationMutation,
    useResendInvitationMutation,
} = invitaionSlice;