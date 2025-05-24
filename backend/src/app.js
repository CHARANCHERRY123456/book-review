import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// For __dirname replacement in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import route constants
import { CORS_ORIGIN } from './config/env.js';

// Import route files
import authRoutes from './features/auth/auth.routes.js';
import userRoutes from './features/users/user.routes.js';
import bookRoutes from './features/books/book.routes.js';
import reviewRoutes from './features/reviews/review.routes.js';

// Import middleware
import errorHandler from './middlewares/errorHandler.js';
import requestLogger from './middlewares/requestLogger.js';

import { AUTH, USERS, BOOKS, REVIEWS } from './constants/routes.js';

// Create Express app
const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: CORS_ORIGIN,
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

export default app;