// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // If still loading, don't render anything yet
  if (loading) {
    return <div>Loading authentication...</div>;
  }

  // If user is authenticated, render the child routes
  // Otherwise, redirect to login page
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;