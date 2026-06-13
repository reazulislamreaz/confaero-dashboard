import { apiSlice } from "../../api/apiSlice";

const jobSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        ///// Jobs  
        getJobs: builder.query({
            query: ({page, limit = 10, search, type}) => {
                const endpoint = type === 'Review Job Post' ? 'job/review' : 'job/my';
                const searchParam = search ? `&search=${search}` : '';
                return `${endpoint}?page=${page}&limit=${limit}${searchParam}`;
            },
            providesTags: ['Jobs']
        }),
        getJobById: builder.query({
            query: (id) => `/job/my/${id}`,
            providesTags: (result, error, id) => [{ type: 'Jobs', id }]
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
            query: ({ id, data }) => ({
                url: `/job/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Jobs', id }, { type: 'Jobs', id: 'LIST' }],
        }),
        updateJobStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/job/${id}/status`,
                method: 'PATCH',
                body: { status },
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
    useUpdateJobStatusMutation,
} = jobSlice;