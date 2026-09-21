import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  Search,
  Compass,
  MapPin,
  Shield,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { PageContainer } from '../components/layout/PageContainer';
import { useAdminStats } from '../hooks/useAirportsQuery';
import { useAirports } from '../hooks/useAirportsQuery';

export function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch metrics dynamically with TanStack Query
  const { data: stats } = useAdminStats();
  const { data: popularData } = useAirports({
    limit: 8,
  });
  const popularChips = popularData?.data || [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/airports?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/airports');
    }

  };

  const handleChipClick = (code) => {
    navigate(`/airports/${code}`);
  };

  return (

    <div className="flex flex-col min-h-screen">
      {/* Aviation Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-background to-background dark:from-slate-900/50 py-16 md:py-24 border-b">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70a_1px,transparent_1px),linear-gradient(to_bottom,#0284c70a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <PageContainer className="relative z-10 text-center">
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-xs font-semibold mb-6 border border-sky-200 dark:border-sky-800 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-sky-600" />
            <span>Global Aviation Intelligence Platform</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-none">
            Look up any airport,
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              by code or by name.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Search and discover detailed information about airports, cities, countries, runways, elevations, and geographic locations worldwide.
          </p>

          {/* Hero Search Box */}
          <div className="mt-8 max-w-2xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-card rounded-2xl border shadow-lg shadow-sky-500/5"
            >
              <div className="relative flex-1 w-full flex items-center">
                <Search className="absolute left-3.5 h-5 w-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search by airport name or IATA code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 h-12 text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none bg-transparent"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto h-12 px-6 gap-2 rounded-xl cursor-pointer"
              >
                <span>Search</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            {/* Popular Airport Quick Search Chips */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-600 dark:text-slate-400">
                Popular Hubs:
              </span>
              {popularChips.map((airport) => (
                <button
                  key={airport._id}
                  onClick={() => handleChipClick(airport.iataCode)}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  {airport.iataCode}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="p-4 rounded-xl bg-card border shadow-2xs text-center">
              <p className="text-2xl sm:text-3xl font-bold text-sky-600 font-mono">
                {(stats?.totalAirports || 1248).toLocaleString()}+
              </p>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Airports Indexed
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border shadow-2xs text-center">
              <p className="text-2xl sm:text-3xl font-bold text-indigo-600 font-mono">
                {stats?.totalCountries || 194}
              </p>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Countries Represented
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border shadow-2xs text-center">
              <p className="text-2xl sm:text-3xl font-bold text-emerald-600 font-mono">
                {(stats?.totalCities || 890)}+
              </p>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Cities Connected
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border shadow-2xs text-center">
              <p className="text-2xl sm:text-3xl font-bold text-amber-600 font-mono">
                100%
              </p>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Public Exploration
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-16 md:py-20 bg-background">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              A Complete Aviation Explorer
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Built with modern web standards, responsive Tailwind layouts, interactive maps, and role-based data management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="hover:border-sky-300 transition-all hover:shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Worldwide Airport Directory
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Browse comprehensive records including IATA, ICAO codes, elevation, timezone, and runway specifications with instant filters.
                </p>
                <Link
                  to="/airports"
                  className="inline-flex items-center text-sm font-semibold text-sky-600 hover:text-sky-700 gap-1"
                >
                  Explore Directory <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="hover:border-sky-300 transition-all hover:shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Interactive Leaflet Maps
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Inspect precise geographic coordinates, runway positioning, and terminal locations visually using OpenStreetMap and Leaflet.
                </p>
                <Link
                  to="/airports/HYD"
                  className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 gap-1"
                >
                  View Sample Map <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="hover:border-sky-300 transition-all hover:shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Role-Based Administration
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Tiered access levels for Guests, Authenticated Explorers, and Administrators with full CRUD management and protected routes.
                </p>
                <Link
                  to="/admin"
                  className="inline-flex items-center text-sm font-semibold text-amber-600 hover:text-amber-700 gap-1"
                >
                  Admin Portal <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}

export default Home;
