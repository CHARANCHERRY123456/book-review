import asyncHandler from '../../utils/asyncHandler.js';
import ErrorResponse from '../../utils/errorResponse.js';
import User from './user.model.js';
import Review from '../reviews/review.model.js';
import { USER } from '../../constants/errorMessages.js';
import logger from '../../utils/logger.js';

/**
 * @desc    Get current user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
export const getUserProfile = asyncHandler(async (req, res, next) => {
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
export const updateUserProfile = asyncHandler(async (req, res, next) => {
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
export const getUserById = asyncHandler(async (req, res, next) => {
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

/**
 * @desc    Get all users (admin only)
 * @route   GET /api/users
 * @access  Admin
 */
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select('-password');
  res.status(200).json(users);
});