import { apiSlice } from "../../api/apiSlice";



const taskSlice = apiSlice.injectEndpoints({
     endpoints: (builder) => ({
        getTask : builder.query({
            query: ({ eventId, page, limit }) =>`/volunteer/volunteers?limit=${limit}&page=${page}&eventId=${eventId}`
        }),

        getTaskById: builder.query({
        query:(id) => `/volunteer/${id}`
     }),

        assignTask: builder.mutation({
            query: (data) => ({
                url: `/volunteer/create`,
                method: "POST",
                body: data
            })
        }),

        getVoluntearEamil: builder.query({
            query: (eventId) => `/volunteer/${eventId}/volunteer/search`
        }),

   
   


     })
})


export const {
    useGetTaskQuery,
    useGetTaskByIdQuery,
    useAssignTaskMutation,
    useGetVoluntearEamilQuery
} = taskSlice

