import { Course } from "../models/course.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createCourse = asyncHandler(async (req, res, next) => {
    const { name, level, description } = req.body;

    if ([name, level, description].some(field => !field || field.trim() === '')) {
        throw new ApiError(400, "All fields are required")
    }

    if (!req.file) {
        throw new ApiError(400, "Course image is required")
    }

    const courseImageLocalPath = req.file.path;

    const courseImageCloudinary = await uploadOnCloudinary(courseImageLocalPath);

    if (!courseImageCloudinary) {
        throw new ApiError(500, "Error uploading course image")
    }

    const course = await Course.create({
        name,
        level,
        description,
        image: courseImageCloudinary.url,
    });

    return res.status(201).json(new ApiResponse(201, { course }, "Course created successfully",))
})

const getAllCourses = asyncHandler(async (req, res, next) => {
    const courses = await Course.find()

    return res.status(200).json(new ApiResponse(200, { courses }, "Courses fetched successfully"))
})

const getCourseById = asyncHandler(async (req, res, next) => {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId)

    if (!course) {
        throw new ApiError(404, "Course not found")
    }

    return res.status(200).json(new ApiResponse(200, { course }, "Course fetched successfully"))
})

const updateCourseById = asyncHandler(async (req, res, next) => {
    const courseId = req.params.courseId;
    const { name, level, description } = req.body;

    if ([name, level, description].every(field =>
        field === undefined || field === null || field.toString().trim() === ''
    )) {
        throw new ApiError(400, "At least one field must be provided for update")
    }

    const course = await Course.findById(courseId);

    if (!course) {
        throw new ApiError(404, "Course not found")
    }

    if (name) course.name = name;
    if (level) course.level = level;
    if (description) course.description = description;

    if (req.file) {
        const courseImageLocalPath = req.file.path;

        const courseImageCloudinary = await uploadOnCloudinary(courseImageLocalPath);

        if (!courseImageCloudinary) {
            throw new ApiError(500, "Error uploading course image")
        }

        course.image = courseImageCloudinary.url;
    }

    const updatedData = await course.save();

    return res
        .status(200)
        .json(new ApiResponse(200, { updatedData }, "Course updated successfully"));
})

const deleteCourseById = asyncHandler(async (req, res, next) => {
    const courseId = req.params.courseId;

    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
        throw new ApiError(404, "Course not found")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Course deleted successfully"));
})

export {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById
}