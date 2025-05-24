const express = require('express');
const { getUserProfile, updateUserProfile, getUserById } = require('./user.controller');
const { protect } = require('../../middlewares/auth');
const { updateProfileValidator } = require('./user.validator');
const validate = require('../../middlewares/validate');
const { USERS } = require('../../constants/routes');

const router = express.Router();

// Get and update current user profile (protected)
router.get(USERS.PROFILE, protect, getUserProfile);
router.put(USERS.PROFILE, protect, updateProfileValidator, validate, updateUserProfile);

// Get user by ID (public)
router.get(USERS.BY_ID, getUserById);

module.exports = router;