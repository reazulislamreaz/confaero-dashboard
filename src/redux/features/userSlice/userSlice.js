
import { apiSlice } from "../../api/apiSlice";

const authSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

     getAllUsers: builder.query({
        query: ({ role, search }) => ({
            url: `/organizer/all-register/697ecdf91d03df1518019a5b?role=${role}&search=${search}`,
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
    useForgotPasswordMutation
 } = authSlice;