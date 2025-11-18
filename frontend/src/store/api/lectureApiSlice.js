import { LECTURES_URL } from "@/utils/constants";
import { apiSlice } from "./apiSlice";

export const lectureApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getLectures: builder.query({
            query: () => LECTURES_URL,
            providesTags: (result) =>
                result?.data?.lectures
                    ? [
                        ...result.data.lectures.map((l) => ({
                            type: "Lectures",
                            id: l._id,
                        })),
                        { type: "Lectures", id: "LIST" }
                    ]
                    : [{ type: "Lectures", id: "LIST" }],
        }),

        createLecture: builder.mutation({
            query: (data) => ({
                url: LECTURES_URL,
                method: "POST",
                body: data,
            }),
            invalidatesTags: [{ type: "Lectures", id: "LIST" }],
        }),

        updateLecture: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${LECTURES_URL}/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (r, e, { id }) => [
                { type: "Lectures", id },
                { type: "Lectures", id: "LIST" },
            ],
        }),

        deleteLecture: builder.mutation({
            query: (id) => ({
                url: `${LECTURES_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (r, e, id) => [
                { type: "Lectures", id },
                { type: "Lectures", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetLecturesQuery,
    useCreateLectureMutation,
    useUpdateLectureMutation,
    useDeleteLectureMutation,
} = lectureApiSlice;
