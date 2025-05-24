import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../constants/roles';

const AdminRoute: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const isAdmin = user?.role === ROLES.ADMIN;

  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;