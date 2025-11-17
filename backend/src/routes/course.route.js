import { Router } from 'express';
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
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
router.route('/:id').get(verifyJWT, authorizeRoles('admin'), getCourseById);
router.route('/:id').put(verifyJWT, authorizeRoles('admin'), upload.single('image'), updateCourseById);
router.route('/:id').delete(verifyJWT, authorizeRoles('admin'), deleteCourseById);

export default router;