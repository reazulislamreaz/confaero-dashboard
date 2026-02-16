import { apiSlice } from "../../api/apiSlice";

const eventSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
     getEvent: builder.query({
        query: () => `/organizer/events`,
        providesTags: [{type: "Events"}]
     })
    })
})

export const {
    useGetEventQuery,
} = eventSlice;