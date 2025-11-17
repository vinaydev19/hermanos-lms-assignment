import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true, // URL to the course image
    },
    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lecture",
        }
    ],
}, {
    timestamps: true
})

export const Course = mongoose.model("Course", courseSchema);