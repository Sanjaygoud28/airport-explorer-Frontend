import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../stores/authStore';
import { Loading } from '../components/common/Loading';

/**
 * Route Guard for authenticated user routes (e.g. /profile).
 * Redirects unauthenticated guests to /login while preserving origin path.
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loading fullPage text="Checking authentication status..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
