/**
 * Backward compatibility adapter for AuthContext.
 * State management has been upgraded to Zustand in `src/stores/authStore.js`.
 */
export { useAuth, useAuthStore } from '../stores/authStore';
export { default } from '../stores/authStore';
