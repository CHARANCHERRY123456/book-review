const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
require('dotenv').config();

// Load environment variables
const { CORS_ORIGIN } = require('./config/env');

// Import route files
const authRoutes = require('./features/auth/auth.routes');
const userRoutes = require('./features/users/user.routes');
const bookRoutes = require('./features/books/book.routes');
const reviewRoutes = require('./features/reviews/review.routes');

// Import middleware
const errorHandler = require('./middlewares/errorHandler');
const requestLogger = require('./middlewares/requestLogger');

// Import route constants
const { AUTH, USERS, BOOKS, REVIEWS } = require('./constants/routes');

// Create Express app
const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: '*', // Allow all origins in development
  credentials: true,
}));

// Set security HTTP headers
app.use(helmet());

// Request logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Custom request logger
app.use(requestLogger);

// Mount routers
app.use(AUTH.BASE, authRoutes);
app.use(USERS.BASE, userRoutes);
app.use(BOOKS.BASE, bookRoutes);
app.use(REVIEWS.BASE, reviewRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../../frontend/build')));

  // Serve index.html for all routes not defined above
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
  });
}

// Error handler middleware (must be after routes)
app.use(errorHandler);

module.exports = app;