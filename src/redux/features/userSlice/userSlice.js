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

    changePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/change-password`,
        method: "POST",
        body: data,
      }),
    }),
    // update user
    // Update user profile
    updateProfile: builder.mutation({
      query: ({ data, image }) => {
        const formData = new FormData();

        formData.append("data", JSON.stringify(data));

        if (image) {
          formData.append("image", image);
        }

        return {
          url: `/user/update-profile/organizer`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Users"], // refresh profile after update
    }),

    // Fetch user profile
    fetchUserProfile: builder.query({
      query: () => ({
        url: `/user/my-profile/organizer`,
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

    adminUserDetaisl: builder.query({
      query: (userId) => ({
        url: `/superAdmin/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["AdminUsers"],
    }),

    adminLogin: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
    }),

    adminDeleteUser: builder.mutation({
      query: (userId) => ({
        url: `/superAdmin/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminUsers"],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useDetailUserQuery,

  useAdminUsersQuery,
  useAdminUserDetaislQuery,
  useAdminDeleteUserMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useFetchUserProfileQuery
} = userSlice;
