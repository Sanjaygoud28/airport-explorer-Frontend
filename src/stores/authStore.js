import { create } from 'zustand';
import { authApi } from '../services/authApi';
import { setAccessToken } from '../services/tokens';

/**
 * Zustand Authentication & RBAC Store
 * 
 * Manages global client authentication state:
 * - user: object | null
 * - role: 'guest' | 'user' | 'admin'
 * - isAuthenticated: boolean
 * - isLoading: boolean
 * 
 * Note: Session tokens are managed securely via backend HTTP-only cookies.
 * No fake JWT tokens are stored in localStorage.
 */
export const useAuthStore = create((set, get) => ({
  user: null,
  role: 'guest',
  isAuthenticated: false,
  isLoading: true,

  /**
   * Log in user with credentials
   */
  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await authApi.login(credentials);
      const user = response.user;
      const role = user.role || 'user';
      setAccessToken(response.accessToken);

      set({
        user,
        role,
        isAuthenticated: true,
        isLoading: false,
      });
      return user;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  /**
   * Register a new user
   */
  signup: async (userData) => {
    set({ isLoading: true });
    try {
      const response = await authApi.signup(userData);
      const user = response.data;
      const role = user.role || 'user';
      setAccessToken(response.accessToken);
      set({
        user,
        role,
        isAuthenticated: true,
        isLoading: false,
      });
      return user;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  /**
   * Log out user and reset to Guest state
   */
  logout: async () => {
    set({ isLoading: true });
    try {
      await authApi.logout();
    } catch (error) {
      console.warn('Logout error:', error);
    } finally {
      // Import dynamically or assume it's done elsewhere?
      // Actually we should just remove it directly here.
      localStorage.removeItem("access-token");
      set({
        user: null,
        role: 'guest',
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  /**
   * Developer / Learning helper to test RBAC roles (Guest / User / Admin)
   * instantly without backend round-trips.
   */
  setMockRole: (targetRole) => {
    if (targetRole === 'admin') {
      set({
        user: {
          id: 'admin_1',
          name: 'Chief Aviation Officer',
          email: 'admin@airportexplorer.io',
          role: 'admin',
          title: 'System Administrator',
        },
        role: 'admin',
        isAuthenticated: true,
      });
    } else if (targetRole === 'user') {
      set({
        user: {
          id: 'user_1',
          name: 'Sanjay Goud',
          email: 'sanjay@example.com',
          role: 'user',
          title: 'Aviation Explorer',
        },
        role: 'user',
        isAuthenticated: true,
      });
    } else {
      set({
        user: null,
        role: 'guest',
        isAuthenticated: false,
      });
    }
  },

  /**
   * Verify session on startup (cookie check)
  //  */
  // initAuth: async () => {
  //   set({ isLoading: true });
  //   try {
  //     const currentUser = await authApi.getCurrentUser();
  //     if (currentUser) {
  //       set({
  //         user: currentUser,
  //         role: currentUser.role || 'user',
  //         isAuthenticated: true,
  //         isLoading: false,
  //       });
  //     } else {
  //       set({
  //         user: null,
  //         role: 'guest',
  //         isAuthenticated: false,
  //         isLoading: false,
  //       });
  //     }
  //   } catch (err) {
  //     set({
  //       user: null,
  //       role: 'guest',
  //       isAuthenticated: false,
  //       isLoading: false,
  //     });
  //   }
  // },



  initializeAuth: async () => {
    set({ isLoading: true });

    try {
      const response = await authApi.refresh();
      console.log("REFRESH RESPONSE:", response.data);

      const user = response.data;
      const role = user.role || "user";

      setAccessToken(response.accessToken);

      set({
        user,
        role,
        isAuthenticated: true,
        isLoading: false,
      });

      return user;
    } catch (error) {
      set({
        user: null,
        role: "guest",
        isAuthenticated: false,
        isLoading: false,
      });

      return null;
    }
  },


}));

/**
 * Convenience hook adapter allowing components to use either:
 * const { user, role, login, logout } = useAuth();
 * or:
 * const role = useAuthStore((state) => state.role);
 */
export const useAuth = () => useAuthStore();

export default useAuthStore;
