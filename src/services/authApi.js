import api from './api';

/**
 * Authentication Service
 * Handles user authentication, registration, session checks, and logout.
 * All functions are prepared with TODO comments for connecting to the existing backend API.
 */
export const authApi = {
  /**
   * Log in user with email and password.
   * Backend will issue HTTP-only cookies containing JWT tokens.
   */
  login: async (credentials) => {
    // TODO: Connect to existing backend API: POST /auth/login
    // return (await api.post('/auth/login', credentials)).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: 'u_101',
            name: credentials.email.split('@')[0] || 'Aviation Enthusiast',
            email: credentials.email,
            role: credentials.email.includes('admin') ? 'admin' : 'user',
          },
          message: 'Login successful',
        });
      }, 500);
    });
  },

  /**
   * Register a new user account.
   */
  signup: async (userData) => {
    // TODO: Connect to existing backend API: POST /auth/signup
    // return (await api.post('/auth/signup', userData)).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: 'u_' + Date.now(),
            name: userData.name,
            email: userData.email,
            role: 'user',
          },
          message: 'Registration successful',
        });
      }, 500);
    });
  },

  /**
   * Get current authenticated user profile using active session cookie.
   */
  getCurrentUser: async () => {
    // TODO: Connect to existing backend API: GET /auth/me or /auth/profile
    // return (await api.get('/auth/me')).data;
    return null;
  },

  /**
   * Log out user and clear HTTP-only session cookies.
   */
  logout: async () => {
    // TODO: Connect to existing backend API: POST /auth/logout
    // return (await api.post('/auth/logout')).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Logged out successfully' });
      }, 200);
    });
  },
};

export default authApi;
