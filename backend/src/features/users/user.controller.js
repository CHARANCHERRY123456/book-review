const asyncHandler = require('../../utils/asyncHandler');
const ErrorResponse = require('../../utils/errorResponse');
const User = require('./user.model');
const Review = require('../reviews/review.model');
const { USER } = require('../../constants/errorMessages');
const logger = require('../../utils/logger');

/**
 * @desc    Get current user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorResponse(USER.NOT_FOUND, 404));
  }

  // Get review count
  const reviewCount = await Review.countDocuments({ user: user._id });

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

  // Fields to update
  const fieldsToUpdate = {};
  if (name) fieldsToUpdate.name = name;
  if (bio !== undefined) fieldsToUpdate.bio = bio;
  if (favoriteGenres) fieldsToUpdate.favoriteGenres = favoriteGenres;
  fieldsToUpdate.updatedAt = Date.now();

  // Update user
  const user = await User.findByIdAndUpdate(
    req.user.id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    return next(new ErrorResponse(USER.NOT_FOUND, 404));
  }

  // Get review count
  const reviewCount = await Review.countDocuments({ user: user._id });

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
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(USER.NOT_FOUND, 404));
  }

  // Get review count
  const reviewCount = await Review.countDocuments({ user: user._id });

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