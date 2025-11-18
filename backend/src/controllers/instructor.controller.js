import { User } from '../models/user.model.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createInstructor = asyncHandler(async (req, res, next) => {
    const { name, email, password, role = 'instructor' } = req.body;

    if ([name, email, password, role].some(field => !field || field.trim() === '')) {
        throw new ApiError(400, "All fields are required")
    }

    if (role !== 'instructor') {
        throw new ApiError(400, "Role must be 'instructor'")
    }

    const existInstructor = await User.findOne({ email });

    if (existInstructor) {
        throw new ApiError(409, "Instructor with this email already exists")
    }

    const instructor = await User.create({ name, email, password, role });

    return res
        .status(201)
        .json(new ApiResponse(201, { instructor }, "Instructor created successfully"));
})

const getAllInstructors = asyncHandler(async (req, res, next) => {
    const instructors = await User.find({ role: 'instructor' })

    return res
        .status(200)
        .json(new ApiResponse(200, { instructors }, "Instructors retrieved successfully"));
})

const updateInstructor = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    console.log("Updating instructor:", id, name, email, password);
        

    if ([name, email, password].every(field =>
        field === undefined || field === null || field.toString().trim() === ''
    )) {
        throw new ApiError(400, "At least one field must be provided for update")
    }

    const instructor = await User.findOne({ _id: id, role: 'instructor' });

    if (!instructor) {
        throw new ApiError(404, "Instructor not found")
    }

    if (name) instructor.name = name;
    if (email) instructor.email = email;
    if (password) instructor.password = password;

    const updatedData = await instructor.save();

    return res
        .status(200)
        .json(new ApiResponse(200, { updatedData }, "Instructor updated successfully"));
})

const deleteInstructor = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const instructor = await User.findOneAndDelete({ _id: id, role: 'instructor' });

    if (!instructor) {
        throw new ApiError(404, "Instructor not found")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Instructor deleted successfully"));
})

export {
    createInstructor,
    getAllInstructors,
    updateInstructor,
    deleteInstructor
}