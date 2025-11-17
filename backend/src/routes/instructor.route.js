import { Router } from 'express';
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
    createInstructor,
    getAllInstructors,
    updateInstructor,
    deleteInstructor
} from '../controllers/instructor.controller.js';

const router = Router();

// Define instructor-specific routes here
router.route('/').post(verifyJWT, authorizeRoles('admin'), createInstructor);
router.route('/').get(verifyJWT, authorizeRoles('admin', 'instructor'), getAllInstructors);
router.route('/:id').put(verifyJWT, authorizeRoles('admin'), updateInstructor);
router.route('/:id').delete(verifyJWT, authorizeRoles('admin'), deleteInstructor);

export default router;