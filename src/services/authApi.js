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
    const response = await api.post("/users/login", credentials);
    return response.data;
  },

  /**
   * Register a new user account.
   */
  signup: async (userData) => {
    // TODO: Connect to existing backend API: POST /auth/signup
    // return (await api.post('/auth/signup', userData)).data;
    const response = await api.post("/users/signup", userData);
    return response.data;
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

    const response = await api.post("/users/logout");
    return response.data;
  },


  refresh: async () => {
    const response = await api.post("/users/refresh");
    console.log(response.data)
    return response.data;
  },

  createAdmin: async (adminData) => {
    const response = await api.post('/users/create-admin', adminData);
    console.log(response.data)



    return response.data;
  }
};

export default authApi;
