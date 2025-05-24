# Book Review Platform

A comprehensive MERN stack application for discovering, reviewing, and sharing books.

## Features

- User authentication (register, login, profile management)
- Browse, search, and filter books
- View detailed book information
- Read and write book reviews
- Admin dashboard for managing books
- Responsive design for all devices

## Technology Stack

### Frontend
- React with TypeScript
- React Router v6 for routing
- Context API for state management
- Tailwind CSS for styling
- React hooks for component logic
- Axios for API requests

### Backend
- Node.js + Express for RESTful API
- MongoDB with Mongoose for data persistence
- JWT for authentication
- Winston for logging
- Express Validator for input validation

## Project Structure

The project follows a feature-based folder structure with clean architecture principles:

### Frontend Structure
```
frontend/
├── src/
│   ├── assets/               # Images, icons
│   ├── components/           # Reusable UI components
│   ├── constants/            # API routes, messages, roles, etc.
│   ├── contexts/             # React Context for auth and global state
│   ├── features/             # Feature folders (books, reviews, users)
│   ├── hooks/                # Custom hooks
│   ├── layouts/              # Navbar, Footer, Layout components
│   ├── logger/               # Frontend logger utility
│   ├── pages/                # Route-level pages
│   ├── routes/               # React Router route definitions
│   ├── services/             # API calls
│   ├── styles/               # Global CSS
│   ├── types/                # TypeScript interfaces
│   ├── utils/                # Utility functions
│   ├── App.tsx
│   └── main.tsx
```

### Backend Structure
```
backend/
├── src/
│   ├── config/               # DB connection, environment config
│   ├── constants/            # Messages, error strings
│   ├── features/             # Feature-wise folder (auth, books, reviews, users)
│   │   ├── auth/             # Controllers, services, routes, validators
│   │   ├── books/
│   │   ├── reviews/
│   │   └── users/
│   ├── middlewares/          # auth, error handler, validation middleware
│   ├── utils/                # Logger (winston), JWT token generation utils
│   ├── app.js                # Express app setup
│   └── server.js             # Server entry point
├── .env
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/book-review-platform.git
cd book-review-platform
```

2. Install backend dependencies:
```
cd backend
npm install
cp .env.example .env  # Copy and configure environment variables
```

3. Install frontend dependencies:
```
cd ../frontend
npm install
```

4. Set up environment variables:
   - Backend: Edit the `.env` file with your MongoDB URI and JWT secret
   - Frontend: Create a `.env` file with `VITE_API_URL=http://localhost:5000/api`

### Running the application

1. Start the backend server:
```
cd backend
npm run dev
```

2. Seed the database with sample data (optional):
```
cd backend
npm run seed
```

3. Start the frontend development server:
```
cd frontend
npm run dev
```

4. Access the application at `http://localhost:3000`

## Deployment

### Backend
1. Set environment variables for production
2. Build and deploy to your preferred hosting service (Heroku, AWS, etc.)

### Frontend
1. Build the frontend:
```
cd frontend
npm run build
```
2. Deploy the `dist` folder to a static hosting service (Netlify, Vercel, etc.)

## License
MIT