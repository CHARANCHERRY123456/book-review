# 🚀 Book Management Platform

Welcome to the **ultimate MERN-powered Book Management & Review Platform**! This is not just another CRUD app—it's a full-featured, modern, and scalable system for book lovers, reviewers, and admins. Discover, review, and manage books with a seamless experience across devices.

---

## ✨ Why You'll Love This Project

- **Lightning-fast** React frontend with TypeScript, Tailwind CSS, and modern UI/UX
- **Robust** Node.js + Express REST API with JWT authentication, role-based access, and advanced security
- **Powerful** MongoDB backend with Mongoose, supporting rich queries, pagination, and aggregation
- **Admin dashboard** for book management and user moderation
- **Real-time review system**: Add, edit, and delete reviews with instant feedback
- **Personalized user profiles**: Favorite genres, avatars, bios, and more
- **Production-ready**: Logging, validation, error handling, and environment configs
- **Seed data** for instant demo and testing

---

## 🛠️ Tech Stack

**Frontend:**
- React + TypeScript
- React Router v6
- Context API for global state
- Tailwind CSS
- Axios

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Auth
- Winston Logger
- Express Validator
- Security: Helmet, CORS, Rate Limiting, XSS & NoSQL Injection Protection

---

## 🚦 Features

- 🔐 User authentication (register, login, JWT, profile management)
- 📚 Browse, search, and filter books (by title, author, genre)
- ⭐ Read, write, edit, and delete reviews (one per user per book)
- 🏆 Featured books & ratings
- 👤 User profiles with avatars, bios, and favorite genres
- 🛡️ Admin-only book management (add, update, delete, bulk upload)
- 📈 Pagination, sorting, and advanced queries
- 📝 RESTful API with clear structure and error messages
- 📦 Seed script for demo data

---

## 🏗️ Project Structure

```
book-management/
├── backend/
│   ├── src/
│   │   ├── config/         # DB & env config
│   │   ├── constants/      # Error messages, routes, roles
│   │   ├── features/       # auth, books, reviews, users
│   │   ├── middlewares/    # Auth, error handler, validation
│   │   ├── utils/          # Logger, JWT, async handler
│   │   ├── app.js          # Express app
│   │   └── server.js       # Server entry
│   ├── utils/seedData.js   # Demo data seeder
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # UI & feature components
│   │   ├── constants/      # API routes, roles, messages
│   │   ├── contexts/       # Auth context
│   │   ├── hooks/          # Custom hooks
│   │   ├── layouts/        # Header, Footer
│   │   ├── logger/         # Frontend logger
│   │   ├── pages/          # Route-level pages
│   │   ├── routes/         # Protected/Admin routes
│   │   ├── services/       # API clients
│   │   ├── styles/         # Global CSS
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx         # App entry
│   └── package.json
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### 1. Clone the repo
```bash
git clone <repo-url>
cd book-management
```

### 2. Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configure environment variables
- Backend: Create `.env` in `/backend` with your MongoDB URI, JWT secret, etc.
- Frontend: (Optional) Set `VITE_API_URL` if backend runs on a different port

### 4. Seed the database (optional, for demo data)
```bash
cd backend
npm run seed
```

### 5. Start the servers
```bash
# In one terminal
cd backend && npm start
# In another terminal
cd frontend && npm run dev
```

### 6. Open the app
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000/api](http://localhost:5000/api)

---

## 🚀 Deployment

- **Backend:** Deploy to Heroku, Render, AWS, etc. Set environment variables for production.
- **Frontend:** Build with `npm run build` and deploy `dist/` to Netlify, Vercel, or any static host.

---

## 🤝 Contributing

PRs, issues, and feature requests are welcome! Let’s build the best book platform together.

---

## 📄 License

MIT
