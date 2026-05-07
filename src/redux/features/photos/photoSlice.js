import { apiSlice } from "../../api/apiSlice";

const photoSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        ///// Photos
        getPhotos: builder.query({
            query: ({ eventId, page, limit = 10, type }) => {
                let url = `/photo/events/${eventId}/photos?page=${page}&limit=${limit}`;
                if (type && type !== 'all') {
                    url += `&type=${type}`;
                }
                return url;
            },
            providesTags: ['Photos']
        }),
        UploadPhoto: builder.mutation({
            query: ({ eventId, body }) => ({
                url: `/photo/events/${eventId}/photos`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Photos'],
        }),
        deletePhoto: builder.mutation({
            query: (id) => ({   
                url: `/photo/photos/${id}`,
                method: 'DELETE',
            }), 
            invalidatesTags: ['Photos'],    
        }),


    }),});

export const {
    useGetPhotosQuery,
    useUploadPhotoMutation,
    useDeletePhotoMutation,
} = photoSlice;
