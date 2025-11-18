import { INSTRUCTORS_URL } from "@/utils/constants";
import { apiSlice } from "./apiSlice";

export const instructorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getInstructors: builder.query({
            query: () => INSTRUCTORS_URL,
            providesTags: ['Instructors'],
        }),

        createInstructor: builder.mutation({
            query: (data) => ({
                url: INSTRUCTORS_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Instructors'],
        }),

        updateInstructor: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${INSTRUCTORS_URL}/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (r, e, { id }) => [
                { type: 'Instructors', id: instructorId }
            ],
        }),

        deleteInstructor: builder.mutation({
            query: (id) => ({
                url: `${INSTRUCTORS_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Instructors'],
        }),
    }),
});

export const {
    useGetInstructorsQuery,
    useCreateInstructorMutation,
    useUpdateInstructorMutation,
    useDeleteInstructorMutation,
} = instructorApiSlice;
