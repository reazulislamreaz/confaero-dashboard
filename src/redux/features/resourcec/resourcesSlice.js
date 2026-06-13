import { Upload } from "antd";
import { apiSlice } from "../../api/apiSlice";


const resourcecSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        ///// Resources
        getDocuments: builder.query({
            query: ({eventId,page, limit = 10}) => `/document/${eventId}/?page=${page}&limit=${limit}`,
            providesTags: ['Resources']
        }),

        getDocumentDetails: builder.query({
            query: ({eventId, id}) => `/document/${eventId}/details/${id}`,
            providesTags: ['Resources']
        }),

        getPendingDocuments: builder.query({
            query: ({eventId,}) => `document/${eventId}/pending?status=pending`,
            providesTags: ['Resources']
        }),

 
        UploadDocument: builder.mutation({
            query: ({ eventId, body }) => ({
                url: `/document/${eventId}`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Resources'],
        }),

        deleteDocument: builder.mutation({
            query: (id) => ({   
                url: `/document/my/${id}`,
                method: 'DELETE',
            }), 
            invalidatesTags: ['Resources'],

        }),

        updateDocumentStatus: builder.mutation({
            query: ({id, status}) => ({   
                url: `/document/status/${id}`,
                method: 'PATCH',
                body: { status }
            }), 
            invalidatesTags: ['Resources'],
        }),


    }),});

export const {
    useGetDocumentsQuery,
    useGetDocumentDetailsQuery,
    useGetPendingDocumentsQuery,
    useUploadDocumentMutation,
    useDeleteDocumentMutation,
    useUpdateDocumentStatusMutation,
} = resourcecSlice;