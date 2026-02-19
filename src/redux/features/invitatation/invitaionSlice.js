import { apiSlice } from "../../api/apiSlice";

const invitaionSlice =  apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sendInvitation: builder.mutation({  
            query: ({ data , id}) => ({
                url: `/invitation/create/${id}`,
                method: 'POST', 
                body: data,
            }),
        }),
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
       
    }),
});

export const { 
    useSendInvitationMutation, 
    useGetInvitationsQuery 
} = invitaionSlice;