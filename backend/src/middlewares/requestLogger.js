import logger from '../utils/logger';

/**
 * Middleware to log all incoming requests
 */
const requestLogger = (req, res, next) => {
  // Log request details
  logger.info(`${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    body: req.method !== 'GET' ? req.body : undefined,
    query: Object.keys(req.query).length ? req.query : undefined,
  });

  // Record response time
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode}`, {
      duration: `${duration}ms`,
    });
  });

  next();
};

export default requestLogger;