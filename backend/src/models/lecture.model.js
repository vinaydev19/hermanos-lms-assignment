import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    date: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true
});

export const Lecture = mongoose.model("Lecture", lectureSchema);