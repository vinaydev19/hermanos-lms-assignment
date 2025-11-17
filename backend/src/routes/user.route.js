import { Router } from 'express';
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser
} from '../controllers/user.controller.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/me')
    .get(verifyJWT, authorizeRoles('admin', 'instructor'), getCurrentUser);

export default router;