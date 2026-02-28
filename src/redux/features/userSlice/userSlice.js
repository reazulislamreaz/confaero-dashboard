
import derivative from "antd/es/theme/themes/default";
import { apiSlice } from "../../api/apiSlice";
import { use } from "react";

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

///Add more user-related endpoints here as needed

 adminUsers: builder.query({
  query: () => ({
    url: `/superAdmin/users`,
    method: "GET",
  }),
  providesTags: ["AdminUsers"],
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
    useDetailUserQuery,

    useAdminUsersQuery
 } = userSlice;