import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Pages
import HomePage from '../pages/HomePage';
import BooksPage from '../pages/BooksPage';
import BookDetailPage from '../pages/BookDetailPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import AddBookPage from '../pages/AddBookPage';
import NotFoundPage from '../pages/NotFoundPage';

// Guards
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

export const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/books/:id" element={<BookDetailPage />} />
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/" /> : <LoginPage />
      } />
      <Route path="/register" element={
        isAuthenticated ? <Navigate to="/" /> : <RegisterPage />
      } />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Admin routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/books/add" element={<AddBookPage />} />
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};