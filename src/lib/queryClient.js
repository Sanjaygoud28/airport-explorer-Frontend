import { QueryClient } from '@tanstack/react-query';

/**
 * Global TanStack Query (React Query) Client configuration.
 * - staleTime: 5 minutes (data remains fresh and avoids redundant refetches)
 * - gcTime: 10 minutes (garbage collection cache time)
 * - refetchOnWindowFocus: false (avoids unexpected refetches while switching windows)
 * - retry: 1 (retries failed network requests once before returning error)
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10,   // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default queryClient;
