import { User } from '../models/user.model.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

const isProd = process.env.NODE_ENV === 'production';

const accessCookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'None' : 'Lax',
    path: '/',
    maxAge: 15 * 60 * 1000 // 15 minutes
};

const refreshCookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'None' : 'Lax',
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Could not generate tokens")
    }
}

const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body

    if ([name, email, password, role].some(field => !field || field.trim() === '')) {
        throw new ApiError(400, "All fields are required")
    }

    const existUser = await User.findOne({ email })

    if (existUser) {
        throw new ApiError(409, `User with email ${email} already exists`)
    }

    const user = await User.create({ name, email, password, role })

    const loggodInUser = await User.findById(user._id).select('-password -refreshToken')

    return res
        .status(201)
        .json(new ApiResponse(201, { loggodInUser }, "User registered successfully"))
})

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if ([email, password].some(field => !field || field.trim() === '')) {
        throw new ApiError(400, "All fields are required")
    }

    const findUser = await User.findOne({ email });

    if (!findUser) {
        throw new ApiError(404, "User not found")
    }

    const isPasswordValid = await findUser.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(findUser._id);

    const loggedUser = await User.findById(findUser._id).select('-password -refreshToken');

    return res
        .status(200)
        .cookie('accessToken', accessToken, accessCookieOptions)
        .cookie('refreshToken', refreshToken, refreshCookieOptions)
        .json(new ApiResponse(200, { loggedUser }, "User logged in successfully"));
})

const logoutUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        { new: true }
    );

    return res
        .status(200)
        .clearCookie('accessToken', accessCookieOptions)
        .clearCookie('refreshToken', refreshCookieOptions)
        .json(new ApiResponse(200, null, "User logged out successfully"));
})

const refreshAccessToken = asyncHandler(async (req, res, next) => {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token not found, please login again")
    }

    try {
        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decoded._id);

        if (user?.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "Invalid refresh token, please login again")
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id);

        return res
            .status(200)
            .cookie('accessToken', accessToken, accessCookieOptions)
            .cookie('refreshToken', newRefreshToken, refreshCookieOptions)
            .json(new ApiResponse(200, null, "Access token refreshed successfully"));
    } catch (error) {
        throw new ApiError(401, "Invalid refresh token, please login again")
    }
})

const getCurrentUser = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;

    const user = await User.findById(userId).select('-password -refreshToken');

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { user }, "Current user fetched successfully"));
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser
}