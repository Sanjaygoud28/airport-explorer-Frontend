import React, { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Compass, Map as MapIcon, LayoutGrid } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Loading } from '../components/common/Loading';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useAirports } from '../hooks/useAirportsQuery';
import { useDebounce } from '../hooks/useDebounce';
import { AirportCard } from '../components/airport/AirportCard';
import { FilterPanel } from '../components/airport/FilterPanel';
import { Pagination } from '../components/airport/Pagination';
import { AirportMap } from '../components/airport/AirportMap';

export function BrowseAirports() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');

  // Debounce search query to optimize API request frequency
  const debouncedSearch = useDebounce(searchQuery, 350);

  // TanStack Query: handles caching, loading states, error states, and pagination
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useAirports({
    search: debouncedSearch,
    country: selectedCountry,
    type: selectedType,
    page: currentPage,
    limit: 6,
  });

  const airports = data?.airports || [];
  const pagination = data?.pagination || { total: 0, page: 1, limit: 6, totalPages: 1 };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCountry('all');
    setSelectedType('all');
    setCurrentPage(1);
    setSearchParams({});
  };

  const countriesList = [
    'all',
    'India',
    'United States',
    'United Kingdom',
    'Singapore',
    'United Arab Emirates',
    'Japan',
    'France',
    'Germany',
    'Australia',
  ];

  return (
    <PageContainer>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sky-600 font-semibold text-xs uppercase tracking-wider mb-1">
            <Compass className="h-4 w-4" />
            Global Directory
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Browse Airports
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Explore airports, runways, and location metrics from around the world.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-xs text-slate-500 font-medium">
            Showing{' '}
            <span className="font-semibold text-slate-900 dark:text-white">
              {airports.length}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-slate-900 dark:text-white">
              {pagination.total}
            </span>{' '}
            airports
          </div>
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md flex items-center justify-center transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-sky-600' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-1.5 rounded-md flex items-center justify-center transition-colors cursor-pointer ${viewMode === 'map' ? 'bg-white dark:bg-slate-700 shadow-sm text-sky-600' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              title="Map View"
            >
              <MapIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <FilterPanel
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        onClearFilters={handleClearFilters}
        countriesList={countriesList}
        setCurrentPage={setCurrentPage}
      />

      {/* Main Content Area: Loading / Error / Empty / Grid */}
      {isLoading ? (
        <Loading type="cards" count={6} />
      ) : isError ? (
        <ErrorMessage
          message={error?.message || 'Failed to fetch airports'}
          onRetry={() => refetch()}
        />
      ) : airports.length === 0 ? (
        <EmptyState
          title="No airports match your filters"
          description="Try modifying your keyword search or adjusting the selected country and airport type filter."
          actionLabel="Clear All Filters"
          onAction={handleClearFilters}
        />
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {airports.map((airport) => (
                <AirportCard key={airport.id || airport.iataCode} airport={airport} />
              ))}
            </div>
          ) : (
            <div className="mb-6">
              <AirportMap airports={airports} height="500px" />
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </PageContainer>
  );
}

export default BrowseAirports;
