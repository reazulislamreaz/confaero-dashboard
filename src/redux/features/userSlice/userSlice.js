
import derivative from "antd/es/theme/themes/default";
import { apiSlice } from "../../api/apiSlice";

const userSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({


   getAllUsers: builder.query({
  query: ({ id, role, search, limit, page }) => ({
    url: `/organizer/all-register/${id}?role=${role}&search=${search}&limit=${limit}&page=${page}`,
    method: "GET",
  }),
  providesTags: ["Users"],
}),

deleteUser: builder.mutation({
  query: ({ eventId, userId }) => ({
    url: `/organizer/attendee/${eventId}/${userId}`,
    method: "DELETE",
  }),
  invalidatesTags: ["Users"],
}),

detailUser: builder.query({
  query: ({ eventId, userId }) => ({
    url: `/organizer/attendee/${eventId}/${userId}`,
    method: "GET",
    }),
    providesTags: ["Users"],
}),


        adminLogin: builder.mutation({
            query: (data) => ({
                url: `/auth/login`,
                method: "POST",
                body: data
            })
        }),

    



    })
});

export const { 
    useAdminLoginMutation, 
    useGetAllUsersQuery,
    useDeleteUserMutation,
    useDetailUserQuery
 } = userSlice;