import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AdminRoute } from './routes/AdminRoute';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
// import { useAuth } from "./stores/authStore";
import { useAuthStore } from "./stores/authStore";
import { useEffect } from 'react';
// Pages
import { Home } from './pages/Home';
import { BrowseAirports } from './pages/BrowseAirports';
import { AirportDetails } from './pages/AirportDetails';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Logout } from './pages/Logout';
import { Profile } from './pages/Profile';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFound } from './pages/NotFound';
// import CreateAdminModal from './pages/CreateAdminModal';

export function App() {
  const initializeAuth = useAuthStore(
    (state) => state.initializeAuth
  );

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);


  return (
    <QueryClientProvider client={queryClient}>  //providesreact query functionality

      <Router>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          {/* Dynamic RBAC Navbar (Guest, User, Admin) powered by Zustand */}
          <Navbar />

          {/* Main Application Body */}
          <main className="flex-1 flex flex-col">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/airports" element={<BrowseAirports />} />
              <Route path="/airports/:iataCode" element={<AirportDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Logout />} />
              {/* <Route path="/create-admin" element={<CreateAdminModal />} /> */}
              {/* Authenticated Explorer Route (RBAC Protected) */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Administrator Route (RBAC Protected) */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Global Aviation Footer */}
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
