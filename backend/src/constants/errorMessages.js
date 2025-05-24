module.exports = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_ALREADY_EXISTS: 'Email is already registered',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    TOKEN_REQUIRED: 'Authentication token is required',
    INVALID_TOKEN: 'Invalid or expired token',
  },
  USER: {
    NOT_FOUND: 'User not found',
    UPDATE_FAILED: 'Failed to update user profile',
  },
  BOOK: {
    NOT_FOUND: 'Book not found',
    CREATE_FAILED: 'Failed to create book',
    UPDATE_FAILED: 'Failed to update book',
    DELETE_FAILED: 'Failed to delete book',
  },
  REVIEW: {
    NOT_FOUND: 'Review not found',
    CREATE_FAILED: 'Failed to create review',
    UPDATE_FAILED: 'Failed to update review',
    DELETE_FAILED: 'Failed to delete review',
  },
  VALIDATION: {
    REQUIRED_FIELDS: 'Please fill in all required fields',
    INVALID_ID: 'Invalid ID format',
    INVALID_EMAIL: 'Please provide a valid email address',
    PASSWORD_LENGTH: 'Password must be at least 6 characters',
    RATING_RANGE: 'Rating must be between 1 and 5',
  },
  SERVER: {
    INTERNAL_ERROR: 'Server error',
    NOT_FOUND: 'Resource not found',
    FORBIDDEN: 'Forbidden action',
  },
};