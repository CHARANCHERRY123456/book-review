/**
 * Wrapper for async middleware to eliminate try-catch blocks
 * @param {Function} fn - Async middleware function
 * @returns {Function} - Express middleware
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;