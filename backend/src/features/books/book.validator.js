const { body } = require('express-validator');

// Validation rules for creating a book
exports.createBookValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot be more than 100 characters'),
    
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required')
    .isLength({ max: 100 })
    .withMessage('Author name cannot be more than 100 characters'),
    
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
    
  body('genre')
    .isArray()
    .withMessage('Genre must be an array')
    .notEmpty()
    .withMessage('At least one genre is required'),
    
  body('publicationYear')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage(`Year must be between 1000 and ${new Date().getFullYear()}`),
];

// Validation rules for updating a book
exports.updateBookValidator = [
  body('title')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Title cannot be more than 100 characters'),
    
  body('author')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Author name cannot be more than 100 characters'),
    
  body('genre')
    .optional()
    .isArray()
    .withMessage('Genre must be an array'),
    
  body('publicationYear')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage(`Year must be between 1000 and ${new Date().getFullYear()}`),
];