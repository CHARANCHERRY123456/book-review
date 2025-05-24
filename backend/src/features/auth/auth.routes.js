import express from 'express';
import { login, register } from './auth.controller.js';
import { protect } from '../../middlewares/auth.js';
import { registerValidator, loginValidator } from './auth.validator.js';
import validate from '../../middlewares/validate.js';
import { AUTH } from '../../constants/routes.js';

const router = express.Router();

// Register route
router.post(AUTH.REGISTER, registerValidator, validate, register);

// Login route
router.post(AUTH.LOGIN, loginValidator, validate, login);

// Logout route (protected)
router.post(AUTH.LOGOUT, protect, logout);

export default router;