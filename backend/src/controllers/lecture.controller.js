import { Lecture } from "../models/lecture.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";

const createLecture = asyncHandler(async (req, res, next) => {
    const { course, instructor, date } = req.body;

    if (!course || !instructor || !date) {
        throw new ApiError(400, "Course, instructor and date are required");
    }

    const isCourseExist = await Course.findById(course);

    if (!isCourseExist) {
        throw new ApiError(404, "Course not found");
    }

    const isInstructorExist = await User.findOne({ _id: instructor, role: "instructor" });

    if (!isInstructorExist) {
        throw new ApiError(404, "Instructor not found");
    }

    const isLectureExist = await Lecture.findOne({ instructor, date });

    if (isLectureExist) {
        throw new ApiError(409, "Lecture already scheduled for this instructor at the given date");
    }

    const lecture = await Lecture.create({ course, instructor, date });

    await Course.findByIdAndUpdate(course, { $push: { lectures: lecture._id } });

    return res.status(201).json(new ApiResponse(201, { lecture }, "Lecture created successfully",));
})

const getAllLectures = asyncHandler(async (req, res, next) => {
    let filter = {};

    if (req.user.role === "instructor") {
        filter.instructor = req.user._id;
    }

    const lectures = await Lecture.find(filter)
        .populate('course', "name level description")
        .populate('instructor', "name email");

    return res
        .status(200)
        .json(new ApiResponse(200, { lectures }, "Lectures retrieved successfully"));
});


const getLectureById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const lecture = await Lecture.findById(id).populate('course', "name level description").populate('instructor', "name email");

    if (!lecture) {
        throw new ApiError(404, "Lecture not found");
    }

    return res.status(200).json(new ApiResponse(200, { lecture }, "Lecture retrieved successfully"));
})

const updateLecture = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { course, instructor, date } = req.body;

    if (!course || !instructor || !date) {
        throw new ApiError(400, "Course, instructor and date are required");
    }

    const isCourseExist = await Course.findById(course);

    if (!isCourseExist) {
        throw new ApiError(404, "Course not found");
    }

    const isInstructorExist = await User.findOne({ _id: instructor, role: "instructor" });

    if (!isInstructorExist) {
        throw new ApiError(404, "Instructor not found");
    }

    const existingForDate = await Lecture.findOne({ instructor, date, _id: { $ne: id } });

    if (existingForDate) {
        throw new ApiError(409, "Lecture already scheduled for this instructor at the given date");
    }

    const oldLecture = await Lecture.findById(id);

    if (!oldLecture) {
        throw new ApiError(404, "Lecture not found");
    }

    const previousCourseId = oldLecture.course.toString();

    const updatedLecture = await Lecture.findByIdAndUpdate(
        id,
        {
            $set: {
                course,
                instructor,
                date
            }
        },
        { new: true }
    );

    if (previousCourseId !== course) {
        await Course.findByIdAndUpdate(
            previousCourseId,
            {
                $pull: {
                    lectures:
                        updatedLecture._id
                }
            }
        );
        await Course.findByIdAndUpdate(
            course,
            {
                $push: {
                    lectures: updatedLecture._id
                }
            }
        );
    }

    return res.status(200).json(new ApiResponse(200, { updatedLecture }, "Lecture updated successfully"));
})

const deleteLecture = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const lecture = await Lecture.findById(id);

    if (!lecture) {
        throw new ApiError(404, "Lecture not found");
    }

    await Course.findByIdAndUpdate(
        lecture.course,
        {
            $pull: {
                lectures: lecture._id
            }
        }
    );

    await Lecture.findByIdAndDelete(id);

    return res.status(200).json(new ApiResponse(200, null, "Lecture deleted successfully"));
})

export {
    createLecture,
    getAllLectures,
    getLectureById,
    updateLecture,
    deleteLecture
}