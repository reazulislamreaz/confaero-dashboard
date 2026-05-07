import { apiSlice } from "../../api/apiSlice";

const boothSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    ///// Exibutors & Sponsors
    getExibutors: builder.query({
        query: (eventId) => `/organizerBooth/events/${eventId}/booths`,
        providesTags: ['Exibutors']
    }),
    acceptBoothRequest: builder.mutation({
        query: ({ id, body }) => ({
            url: `/organizerBooth/booths/${id}/number`,
            method: 'PATCH',
            body:  body,
        }),
        invalidatesTags: ['Exibutors'],

    }),

    cancelBoothRequest: builder.mutation({
        query: ({id, body}) => ({
            url: `/organizerBooth/booths/${id}/cancel`,
            method: 'PATCH',
            body: body,
        }),
        invalidatesTags: ['Exibutors'],
    }),


    //// Sponsors 
    getSponsors: builder.query({
        query: (eventId) => `/organizerSponsor/all-sponsors/${eventId}`,
        providesTags: ['Sponsors']
    }),

    sponsorDetails: builder.query({
        query: (sponsorshipId) =>`/organizerSponsor/sponsor/${sponsorshipId}`,
        providesTags: ['Sponsors'],
    }),

    acceptSponsorshipRequest: builder.mutation({
        query: (sponsorshipId) => ({
            url: `/organizerSponsor/${sponsorshipId}/approve`,
            method: 'PATCH',
         
        }),
        invalidatesTags: ['Sponsors'],
    }),

    cancelSponsorshipRequest: builder.mutation({
        query: (sponsorshipId) => ({
            url: `/organizerSponsor/${sponsorshipId}/reject`,  
            method: 'PATCH',
            
        }),
        invalidatesTags: ['Sponsors'],
    }),

  }),
});

export const {
    useGetExibutorsQuery,
    useAcceptBoothRequestMutation,
    useCancelBoothRequestMutation,
    useGetSponsorsQuery,
    useSponsorDetailsQuery,
    useAcceptSponsorshipRequestMutation,
    useCancelSponsorshipRequestMutation,
} = boothSlice;
       