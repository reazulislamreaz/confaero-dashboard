import { apiSlice } from "../api/apiSlice";

const uploadFile = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
            query: (data) => ({
                url: `/upload/chat-attachment`,
                method: "POST",
                body: data
            })
        }),

    }),
});

export const { useUploadFileMutation } = uploadFile;