import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Plane, LogIn, Lock, Mail, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '../stores/authStore';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, setMockRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickFill = (roleType) => {
    if (roleType === 'admin') {
      setEmail('admin@airportexplorer.io');
      setPassword('adminPass123!');
    } else {
      setEmail('explorer@airportexplorer.io');
      setPassword('userPass123!');
    }
  };

  return (
    <PageContainer className="flex items-center justify-center min-h-[75vh]">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-md shadow-sky-500/20 mb-2">
            <Plane className="h-6 w-6 -rotate-45" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Sign in to access personalized airport features and administration.
          </p>
        </div>

        <Card className="shadow-lg border-slate-200 dark:border-slate-800">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl">Account Login</CardTitle>
              <CardDescription>
                Enter your registered email and password.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {errorMessage && (
                <Alert variant="destructive" className="py-2.5">
                  <AlertDescription className="text-xs">
                    {errorMessage}
                  </AlertDescription>
                </Alert>
              )}

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Fill Test Credentials Helper */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border text-xs space-y-1.5">
                <span className="font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-sky-500" />
                  Quick Fill Test Credentials:
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickFill('user')}
                    className="px-2 py-1 rounded bg-sky-100 hover:bg-sky-200 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-medium cursor-pointer"
                  >
                    User Login
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('admin')}
                    className="px-2 py-1 rounded bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-medium cursor-pointer"
                  >
                    Admin Login
                  </button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-2">
              <Button
                type="submit"
                className="w-full h-11 gap-2 cursor-pointer font-semibold shadow-sm"
                disabled={isSubmitting}
              >
                <LogIn className="h-4 w-4" />
                {isSubmitting ? 'Authenticating...' : 'Login to Account'}
              </Button>

              <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-semibold text-sky-600 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
}

export default Login;
