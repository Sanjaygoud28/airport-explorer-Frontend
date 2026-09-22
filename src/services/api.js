import axios from 'axios';
import { getAccessToken, setAccessToken } from './tokens';
// import { useNavigate } from 'react-router';


/**
 * Centralized Axios instance configured for Airport Explorer.
 * - Uses VITE_API_BASE_URL from environment variables.
 * - Sets withCredentials: true so HTTP-only authentication cookies (JWT refresh/access tokens)
 *   are automatically sent and received by the browser.
*/
// const navigate = useNavigate();
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  withCredentials: true, // Crucial for HTTP-only cookie JWT session management
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
)
// Response interceptor for centralized error formatting and token refresh hooks
api.interceptors.response.use(
  (response) => response,
  // TODO: Connect to existing backend API error handler
  // Example: If 401 occurs, trigger silent refresh token call if implemented on backend
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest);


    // Don't try to refresh the refresh request itself
    if (originalRequest?.url?.includes("/users/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest?.retry) {
      originalRequest.retry = true;
      // sending reuest to /users/auth/refresh
      try {
        const axiosResponse = await api.post("/users/refresh", {}, { withCredentials: true })

        const newAccessToken = axiosResponse.data.accessToken;

        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (error) {
        localStorage.removeItem("accessToken");
        // navigate("/");
        return Promise.reject(error)
      }
    }
    return Promise.reject(error);
  }
);

export default api;
