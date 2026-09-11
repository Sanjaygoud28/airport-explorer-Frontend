import axios from 'axios';

/**
 * Centralized Axios instance configured for Airport Explorer.
 * - Uses VITE_API_BASE_URL from environment variables.
 * - Sets withCredentials: true so HTTP-only authentication cookies (JWT refresh/access tokens)
 *   are automatically sent and received by the browser.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true, // Crucial for HTTP-only cookie JWT session management
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for centralized error formatting and token refresh hooks
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: Connect to existing backend API error handler
    // Example: If 401 occurs, trigger silent refresh token call if implemented on backend
    const customError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      status: error.response?.status,
      data: error.response?.data,
    };
    return Promise.reject(customError);
  }
);

export default api;
