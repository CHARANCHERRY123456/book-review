const { validationResult } = require('express-validator');
const ErrorResponse = require('../utils/errorResponse');

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

module.exports = validate;