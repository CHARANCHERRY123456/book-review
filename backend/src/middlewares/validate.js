import { validationResult } from 'express-validator';
import ErrorResponse from '../utils/errorResponse.js';

/**
 * Middleware to validate request using express-validator
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    // Extract validation messages
    const errorMessages = errors.array().map(error => error.msg);
    
    // Return first error or all errors as an array
    const message = errorMessages.length === 1 
      ? errorMessages[0] 
      : errorMessages;
      
    return next(new ErrorResponse(message, 400));
  }
  
  next();
};

export default validate;