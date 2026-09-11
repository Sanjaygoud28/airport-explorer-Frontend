import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';
import { SearchBar } from './SearchBar';

export function FilterPanel({
  searchQuery,
  setSearchQuery,
  selectedCountry,
  setSelectedCountry,
  selectedType,
  setSelectedType,
  onClearFilters,
  countriesList,
  setCurrentPage
}) {
  return (
    <div className="bg-card p-4 sm:p-5 rounded-2xl border shadow-xs mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Input */}
        <SearchBar
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />

        {/* Country Selector */}
        <div>
          <select
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            <option value="all">All Countries</option>
            {countriesList
              .filter((c) => c !== 'all')
              .map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
          </select>
        </div>

        {/* Airport Type Selector */}
        <div>
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            <option value="all">All Airport Types</option>
            <option value="large_airport">Large International Airport</option>
            <option value="medium_airport">Medium Airport</option>
            <option value="small_airport">Small Airport</option>
          </select>
        </div>

        {/* Reset Filters Button */}
        <div>
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="w-full h-10 gap-2 border-slate-200 text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
