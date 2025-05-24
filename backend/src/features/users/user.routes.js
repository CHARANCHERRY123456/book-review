import express from 'express';
import { getUserProfile, updateUserProfile, getUserById, getAllUsers } from './user.controller.js';
import { protect, authorize } from '../../middlewares/auth';
import { updateProfileValidator } from './user.validator';
import validate from '../../middlewares/validate';
import { USERS } from '../../constants/routes';

const router = express.Router();

// Get and update current user profile (protected)
router.get(USERS.PROFILE, protect, getUserProfile);
router.put(USERS.PROFILE, protect, updateProfileValidator, validate, updateUserProfile);

// Get user by ID (public)
router.get(USERS.BY_ID, getUserById);

// Admin: Get all users
router.get('/', protect, authorize('admin'), getAllUsers);

export default router;