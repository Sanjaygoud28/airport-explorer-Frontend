import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../stores/authStore';
import { Loading } from '../components/common/Loading';
import { AccessDenied } from '../components/common/AccessDenied';

/**
 * Route Guard for Administrator-only routes (e.g. /admin).
 * Redirects guests to login and renders AccessDenied for non-admin users.
 */
export function AdminRoute({ children }) {
  const { isAuthenticated, role, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loading fullPage text="Validating administrator privileges..." />;
  }

  // Not logged in at all -> redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but not an admin -> show Access Denied
  if (role !== 'admin') {
    return <AccessDenied />;
  }

  return children;
}

export default AdminRoute;
