import React from 'react';
import { useNavigate } from 'react-router';
import {
  User,
  Mail,
  Shield,
  LogOut,
  Calendar,
  Compass,
  Plane,
  Heart,
  KeyRound,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '../stores/authStore';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function Profile() {
  const { user, role, logout } = useAuth();
  console.log("PROFILE USER:", user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <PageContainer className="max-w-4xl space-y-8">
      {/* Header */}
      <div className="border-b pb-6">
        <div className="flex items-center gap-2 text-sky-600 font-semibold text-xs uppercase tracking-wider mb-1">
          <User className="h-4 w-4" />
          Member Account
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Explorer Profile
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your account credentials, preferences, and permissions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Identity Card */}
        <Card className="md:col-span-1 shadow-sm flex flex-col justify-between">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-sky-500/20 mb-3">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <CardTitle className="text-xl font-bold">{user?.name || 'Explorer'}</CardTitle>
            <CardDescription className="text-xs">{user?.email}</CardDescription>
            <div className="pt-2">
              <Badge
                variant={role === 'admin' ? 'destructive' : 'sky'}
                className="font-mono text-xs uppercase"
              >
                {role === 'admin' ? 'System Administrator' : 'Aviation Explorer'}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 pt-4 border-t text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Shield className="h-3.5 w-3.5" />
                Access Level
              </span>
              <span className="font-semibold text-slate-900 dark:text-white capitalize">
                {role}
              </span>
            </div>

             <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Calendar className="h-3.5 w-3.5" />
                Mobile Number
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {user?.mobile}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Calendar className="h-3.5 w-3.5" />
                Member Since
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">
                September 2026
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-500">
                <KeyRound className="h-3.5 w-3.5" />
                Auth Session
              </span>
              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> Active Cookie
              </span>
            </div>
          </CardContent>

          <CardFooter className="pt-4 border-t">
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="w-full gap-2 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </CardFooter>
        </Card>

        {/* Activity & Capabilities Card */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Privileges</CardTitle>
              <CardDescription>
                Overview of current permissions granted to your role.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3.5 rounded-lg border bg-slate-50 dark:bg-slate-900/50 flex items-start gap-3">
                <div className="h-8 w-8 rounded-md bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                  <Compass className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Worldwide Airport Exploration
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Query, search, and view detailed records for all commercial and regional airports.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg border bg-slate-50 dark:bg-slate-900/50 flex items-start gap-3">
                <div className="h-8 w-8 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Plane className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Interactive Map & Coordinates View
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Full access to Leaflet-powered satellite and street overlays with runway telemetry.
                  </p>
                </div>
              </div>

              {role === 'admin' ? (
                <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 flex items-start gap-3">
                  <div className="h-8 w-8 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-300">
                      Administrative Control Granted
                    </h4>
                    <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                      You have authorization to add, modify, and delete global airport database records in the Admin Dashboard.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 flex items-start gap-3">
                  <div className="h-8 w-8 rounded-md bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700">
                      Standard Explorer Role
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Administrative data modification requires elevated administrative credentials.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}

export default Profile;
