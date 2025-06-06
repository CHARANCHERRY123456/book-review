const asyncHandler = require('../../utils/asyncHandler');
const ErrorResponse = require('../../utils/errorResponse');
const { generateToken } = require('../../utils/jwtUtils');
const User = require('../users/user.model');
const { AUTH } = require('../../constants/errorMessages');
const logger = require('../../utils/logger');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorResponse(AUTH.EMAIL_ALREADY_EXISTS, 400));
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  logger.info(`New user registered: ${email}`);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
  });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }

  // Check if user exists
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse(AUTH.INVALID_CREDENTIALS, 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse(AUTH.INVALID_CREDENTIALS, 401));
  }

  // Generate token
  const token = generateToken(user);

  logger.info(`User logged in: ${email}`);

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

/**
 * @desc    Logout user / clear cookie
 * @route   POST /api/auth/logout
 * @access  Private
 */
exports.logout = asyncHandler(async (req, res, next) => {
  logger.info(`User logged out: ${req.user?.email || 'Unknown'}`);

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});