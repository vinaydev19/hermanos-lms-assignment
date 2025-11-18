import { Router } from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/roles.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById
} from '../controllers/course.controller.js';

const router = Router();

router.route('/').post(verifyJWT, authorizeRoles('admin'), upload.single('image'), createCourse);
router.route('/').get(verifyJWT, authorizeRoles('admin'), getAllCourses);
router.route('/:courseId').get(verifyJWT, authorizeRoles('admin'), getCourseById);
router.route('/:courseId').put(verifyJWT, authorizeRoles('admin'), upload.single('image'), updateCourseById);
router.route('/:courseId').delete(verifyJWT, authorizeRoles('admin'), deleteCourseById);

export default router;