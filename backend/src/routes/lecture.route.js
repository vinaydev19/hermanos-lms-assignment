import { Router } from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/roles.middleware.js";
import {
    createLecture,
    getAllLectures,
    getLectureById,
    updateLecture,
    deleteLecture
} from '../controllers/lecture.controller.js';

const router = Router();

router.route('/').post(verifyJWT, authorizeRoles('admin'), createLecture);
router.route('/').get(verifyJWT, authorizeRoles('admin', 'instructor'), getAllLectures);
router.route('/:id').get(verifyJWT, authorizeRoles('admin', 'instructor'), getLectureById);
router.route('/:id').put(verifyJWT, authorizeRoles('admin'), updateLecture);
router.route('/:id').delete(verifyJWT, authorizeRoles('admin'), deleteLecture);

export default router;
