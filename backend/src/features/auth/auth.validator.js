import { body } from 'express-validator';
import { VALIDATION } from '../../constants/errorMessages.js';

// Validation rules for user registration
export const registerValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
    
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage(VALIDATION.INVALID_EMAIL)
    .normalizeEmail(),
    
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage(VALIDATION.PASSWORD_LENGTH),
];

// Validation rules for user login
export const loginValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage(VALIDATION.INVALID_EMAIL),
    
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required'),
];