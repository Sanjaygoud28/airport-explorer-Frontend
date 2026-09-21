import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../stores/authStore';
import { PageContainer } from '../components/layout/PageContainer';
import { Loader2 } from 'lucide-react';

export function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      // Small delay for better UX before redirecting
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 800);
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <PageContainer className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <Loader2 className="h-10 w-10 text-sky-600 animate-spin" />
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Logging out...
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Please wait while we securely end your session.
        </p>
      </div>
    </PageContainer>
  );
}

export default Logout;
