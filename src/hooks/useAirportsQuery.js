import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { airportApi } from '../services/airportApi';

/**
 * Hook to query paginated & filtered airports list with TanStack Query.
 * Automatic caching, stale-while-revalidate, and pagination handling.
 */
export function useAirports(params = {}, enabled = true) {
  return useQuery({
    queryKey: ['airports'],
    queryFn: () => airportApi.getAirports(params),
    enabled,
    placeholderData: (previousData) => previousData, // Smooth pagination transitions
  });
}

/**
 * Hook to fetch detailed airport data by IATA code.
 */
export function useAirportDetails(iataCode) {
  return useQuery({
    queryKey: ['airport', iataCode?.toUpperCase()],
    queryFn: () => airportApi.getAirportByIata(iataCode),
    enabled: !!iataCode,
  });
}

/**
 * Hook for live search queries across airport database.
 */
export function useSearchAirports(query) {
  return useQuery({
    queryKey: ['airports-search', query],
    queryFn: () => airportApi.searchAirports(query),
    enabled: !!query && query.trim().length > 0,
    staleTime: 1000 * 60 * 2, // 2 minutes for search results
  });
}

/**
 * Hook for fetching administrator statistical summary.
 */
export function useAdminStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => airportApi.getAdminStats(),
  });
}

/**
 * Mutation hook for deleting an airport record.
 * Automatically invalidates 'airports' and 'admin-stats' cache on success.
 */
export function useDeleteAirport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => airportApi.deleteAirport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['airports'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    },
  });
}

/**
 * Mutation hook for creating a new airport record.
 */
export function useCreateAirport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (airportData) => airportApi.createAirport(airportData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['airports'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    },
  });
}

/**
 * Mutation hook for updating an existing airport record.
 */
export function useUpdateAirport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, airportData }) => airportApi.updateAirport(id, airportData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['airports'] });
      queryClient.invalidateQueries({ queryKey: ['airport'] });
    },
  });
}
