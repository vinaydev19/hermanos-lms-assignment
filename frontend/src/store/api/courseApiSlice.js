import { COURSES_URL } from "@/utils/constants";
import { apiSlice } from "./apiSlice";

export const courseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourses: builder.query({
            query: () => COURSES_URL,
            providesTags: (result) =>
                result?.data?.courses
                    ? [
                        ...result.data.courses.map((c) => ({
                            type: "Courses",
                            id: c._id,
                        })),
                        { type: "Courses", id: "LIST" }
                    ]
                    : [{ type: "Courses", id: "LIST" }],
        }),
        getCourseById: builder.query({
            query: (id) => `${COURSES_URL}/${id}`,
            providesTags: (r, e, id) => [{ type: "Courses", id }],
        }),
        createCourse: builder.mutation({
            query: (formData) => ({
                url: COURSES_URL,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: [{ type: "Courses", id: "LIST" }],
        }),
        updateCourse: builder.mutation({
            query: ({ id, formData }) => ({
                url: `${COURSES_URL}/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: (r, e, { id }) => [
                { type: "Courses", id },
                { type: "Courses", id: "LIST" },
            ],
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `${COURSES_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (r, e, id) => [
                { type: "Courses", id },
                { type: "Courses", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetCoursesQuery,
    useGetCourseByIdQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
} = courseApiSlice;
