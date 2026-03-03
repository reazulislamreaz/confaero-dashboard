import { apiSlice } from "../../api/apiSlice";

const jobSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        ///// Jobs  
        getJobs: builder.query({
            query: ({page, limit = 10}) => `job/my?page=${page}&limit=${limit}`,
            providesTags: ['Jobs']
        }),
        getJobById: builder.query({
            query: (id) => `/job/my/${id}`,
            providesTags: ['Jobs']
        }),
        createJob: builder.mutation({
            query: ( body) => ({
                url: `/job`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Jobs'],
        }),
        updateJob: builder.mutation({
            query: ({ id, body }) => ({
                url: `/job/${id}`,
                method: 'PATCH',
                body: body,
            }),
            invalidatesTags: ['Jobs'],
        }),

        deleteJob: builder.mutation({
            query: (id) => ({
                url: `/job/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Jobs'],
        }),

    }),});

export const {  
    useGetJobsQuery,
    useGetJobByIdQuery,
    useCreateJobMutation,
    useUpdateJobMutation,
    useDeleteJobMutation,
} = jobSlice;