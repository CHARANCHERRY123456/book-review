const asyncHandler = require('../../utils/asyncHandler');
const ErrorResponse = require('../../utils/errorResponse');
const { USER } = require('../../constants/errorMessages');
const logger = require('../../utils/logger');
const userService = require('./user.service');

/**
 * @desc    Get current user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const result = await userService.getUserProfile(req.user.id);
  if (!result) return next(new ErrorResponse(USER.NOT_FOUND, 404));
  const { user, reviewCount } = result;
  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    bio: user.bio,
    avatar: user.avatar,
    favoriteGenres: user.favoriteGenres,
    reviewCount,
    createdAt: user.createdAt,
  });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  const { name, bio, favoriteGenres } = req.body;
  const fieldsToUpdate = {};
  if (name) fieldsToUpdate.name = name;
  if (bio !== undefined) fieldsToUpdate.bio = bio;
  if (favoriteGenres) fieldsToUpdate.favoriteGenres = favoriteGenres;
  fieldsToUpdate.updatedAt = Date.now();
  const result = await userService.updateUserProfile(req.user.id, fieldsToUpdate);
  if (!result) return next(new ErrorResponse(USER.NOT_FOUND, 404));
  const { user, reviewCount } = result;
  logger.info(`User profile updated: ${user.email}`);
  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    bio: user.bio,
    avatar: user.avatar,
    favoriteGenres: user.favoriteGenres,
    reviewCount,
    updatedAt: user.updatedAt,
  });
});

/**
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 * @access  Public
 */
exports.getUserById = asyncHandler(async (req, res, next) => {
  const result = await userService.getUserById(req.params.id);
  if (!result) return next(new ErrorResponse(USER.NOT_FOUND, 404));
  const { user, reviewCount } = result;
  res.status(200).json({
    id: user._id,
    name: user.name,
    bio: user.bio,
    avatar: user.avatar,
    favoriteGenres: user.favoriteGenres,
    reviewCount,
    createdAt: user.createdAt,
  });
});