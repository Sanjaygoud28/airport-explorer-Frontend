import api from './api';
import { MOCK_AIRPORTS, MOCK_ADMIN_STATS } from '../data/mockData';

/**
 * Airport Service
 * Handles fetching, filtering, searching, and managing airport data.
 * Ready to integrate with the Node/Express backend endpoints.
 */
export const airportApi = {
  /**
   * Fetch paginated list of airports with optional query filters (country, type, search, page, limit).
   */
  getAirports: async (params = {}) => {
    // TODO: Connect to existing backend API: GET /airports
    // const response = await api.get('/airports', { params });
    // return response.data;
    
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...MOCK_AIRPORTS];

        if (params.search) {
          const q = params.search.toLowerCase();
          filtered = filtered.filter(
            (a) =>
              a.iataCode.toLowerCase().includes(q) ||
              a.name.toLowerCase().includes(q) ||
              a.city.toLowerCase().includes(q) ||
              a.country.toLowerCase().includes(q)
          );
        }

        if (params.country && params.country !== 'all') {
          filtered = filtered.filter((a) => a.country.toLowerCase() === params.country.toLowerCase());
        }

        if (params.type && params.type !== 'all') {
          filtered = filtered.filter((a) => a.type === params.type);
        }

        const page = parseInt(params.page, 10) || 1;
        const limit = parseInt(params.limit, 10) || 6;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        resolve({
          airports: filtered.slice(startIndex, endIndex),
          pagination: {
            total: filtered.length,
            page,
            limit,
            totalPages: Math.ceil(filtered.length / limit) || 1,
          },
        });
      }, 400);
    });
  },

  /**
   * Fetch single airport details by its unique IATA code.
   */
  getAirportByIata: async (iataCode) => {
    // TODO: Connect to existing backend API: GET /airports/:iataCode
    // const response = await api.get(`/airports/${iataCode}`);
    // return response.data;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = MOCK_AIRPORTS.find(
          (a) => a.iataCode.toUpperCase() === (iataCode || '').toUpperCase()
        );
        if (found) {
          resolve(found);
        } else {
          reject(new Error(`Airport with IATA code "${iataCode}" was not found.`));
        }
      }, 300);
    });
  },

  /**
   * Search airports dynamically by keyword (IATA or Airport Name).
   */
  searchAirports: async (query) => {
    // TODO: Connect to existing backend API: GET /airports/search?q=...
    // const response = await api.get('/airports/search', { params: { q: query } });
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        if (!query || !query.trim()) {
          resolve([]);
          return;
        }
        const q = query.toLowerCase().trim();
        const results = MOCK_AIRPORTS.filter(
          (a) =>
            a.iataCode.toLowerCase().includes(q) ||
            a.name.toLowerCase().includes(q) ||
            a.city.toLowerCase().includes(q)
        );
        resolve(results);
      }, 250);
    });
  },

  /**
   * Fetch admin statistics summary.
   */
  getAdminStats: async () => {
    // TODO: Connect to existing backend API: GET /admin/stats
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_ADMIN_STATS);
      }, 200);
    });
  },

  /**
   * Admin: Add new airport.
   */
  createAirport: async (airportData) => {
    // TODO: Connect to existing backend API: POST /airports
    // const response = await api.post('/airports', airportData);
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...airportData,
          id: String(Date.now()),
        });
      }, 400);
    });
  },

  /**
   * Admin: Update existing airport.
   */
  updateAirport: async (id, airportData) => {
    // TODO: Connect to existing backend API: PUT /airports/:id
    // const response = await api.put(`/airports/${id}`, airportData);
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...airportData, id });
      }, 400);
    });
  },

  /**
   * Admin: Delete airport by ID.
   */
  deleteAirport: async (id) => {
    // TODO: Connect to existing backend API: DELETE /airports/:id
    // const response = await api.delete(`/airports/${id}`);
    // return response.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Airport removed successfully', id });
      }, 400);
    });
  },
};

export default airportApi;
