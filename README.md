# Book Management

A MERN (MongoDB, Express, React, Node.js) stack application for managing books.

## Features

- Add, edit, delete, and view Reviews
- RESTful API backend (Node.js, Express)
- MongoDB database
- React frontend

## Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd book-management
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables:**
   - Create a `.env` file in the backend directory with your MongoDB URI and other settings.

5. **Start the backend server:**
   ```bash
   cd ../backend
   npm start
   ```

6. **Start the frontend app:**
   ```bash
   cd ../frontend
   npm start
   ```

## Usage

- Access the frontend at `http://localhost:3000`
- The backend API runs at `http://localhost:5000` (default)

## License

MIT
