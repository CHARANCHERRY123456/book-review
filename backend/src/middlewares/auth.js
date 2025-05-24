import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import { verifyToken } from '../utils/jwtUtils.js';
import User from '../features/users/user.model.js';
import { AUTH } from '../constants/errorMessages.js';
import { ROLES } from '../constants/roles.js';

/**
 * Middleware to protect routes - require authentication
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Get token from Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return next(new ErrorResponse(AUTH.TOKEN_REQUIRED, 401));
  }

  try {
    // Verify token
    const decoded = verifyToken(token);

    // Get user from database
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return next(new ErrorResponse(AUTH.INVALID_TOKEN, 401));
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorResponse(AUTH.INVALID_TOKEN, 401));
  }
});

/**
 * Middleware to authorize based on user role
 * @param {...String} roles - Roles allowed to access the route
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    console.info("here is the data->", req.user, roles);

    if (!req.user) {
      return next(new ErrorResponse(AUTH.TOKEN_REQUIRED, 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse(AUTH.UNAUTHORIZED, 403));
    }

    next();
  };
};