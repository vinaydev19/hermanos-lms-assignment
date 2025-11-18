import { USERS_URL } from "@/utils/constants";
import { apiSlice } from "./apiSlice";
import { getUser, logout } from "../slices/userSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data,
            }),
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(getUser(data.loggedUser));
                } catch (err) {
                    console.error("Login failed:", err);
                }
            },
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            }),
            async onQueryStarted(arg, { dispatch }) {
                dispatch(logout());
            },
        }),
        getMe: builder.query({
            query: () => ({
                url: `${USERS_URL}/me`,
                method: "GET",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(getUser(data.user));
                } catch (err) {
                    console.error(err);
                }
            },
        }),
        refresheToken: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/refresh-token`,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetMeQuery,
    useRefresheTokenMutation,
} = userApiSlice;
