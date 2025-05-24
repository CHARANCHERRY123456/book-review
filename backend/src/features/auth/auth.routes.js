const express = require('express');
const { register, login, logout } = require('./auth.controller');
const { protect } = require('../../middlewares/auth');
const { registerValidator, loginValidator } = require('./auth.validator');
const validate = require('../../middlewares/validate');
const { AUTH } = require('../../constants/routes');

const router = express.Router();

// Register route
router.post(AUTH.REGISTER, registerValidator, validate, register);

// Login route
router.post(AUTH.LOGIN, loginValidator, validate, login);

// Logout route (protected)
router.post(AUTH.LOGOUT, protect, logout);

module.exports = router;