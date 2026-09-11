import React from 'react';
import { ShieldAlert, ArrowLeft, LogIn } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../ui/button';

/**
 * Access Denied component for RBAC authorization protection (403).
 */
export function AccessDenied({
  title = 'Access Restricted',
  message = 'You do not have administrative privileges to access this page. Please log in with an administrator account.',
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center text-center max-w-md p-8 bg-card rounded-2xl border shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 mb-6 ring-8 ring-amber-50/50">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          {title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          {message}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Link to="/">
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              <ArrowLeft className="h-4 w-4" />
              Return Home
            </Button>
          </Link>
          <Link to="/login">
            <Button className="w-full sm:w-auto gap-2">
              <LogIn className="h-4 w-4" />
              Admin Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;
