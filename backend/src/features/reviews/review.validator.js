import { body } from 'express-validator';
import { VALIDATION } from '../../constants/errorMessages.js';

// Validation rules for creating a review
export const createReviewValidator = [
  body('bookId')
    .notEmpty()
    .withMessage('Book ID is required')
    .isMongoId()
    .withMessage(VALIDATION.INVALID_ID),
    
  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage(VALIDATION.RATING_RANGE),
    
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Review content is required')
    .isLength({ min: 10 })
    .withMessage('Review must be at least 10 characters'),
];

// Validation rules for updating a review
export const updateReviewValidator = [
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage(VALIDATION.RATING_RANGE),
    
  body('content')
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage('Review must be at least 10 characters'),
];