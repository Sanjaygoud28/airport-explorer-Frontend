import React from 'react';
import { useParams, Link } from 'react-router';
import {
  Plane,
  MapPin,
  Globe2,
  ArrowLeft,
  Building,
  Navigation,
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Loading } from '../components/common/Loading';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useAirportDetails } from '../hooks/useAirportsQuery';

// Fix standard Leaflet default icon paths in React/Webpack/Vite bundling
const defaultMarkerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function AirportDetails() {


  const { iataCode } = useParams();

  // TanStack Query hook for single airport retrieval & caching
  const {
    data: airport,
    isLoading,
    isError,
    error,
    refetch,
  } = useAirportDetails(iataCode);


  if (isLoading) {
    return (
      <PageContainer>
        <Loading type="details" text={`Fetching details for ${iataCode}...`} />
      </PageContainer>
    );
  }

  if (isError || !airport) {
    return (
      <PageContainer>
        <div className="space-y-4 max-w-xl mx-auto py-8">
          <Link to="/airports">
            <Button variant="ghost" size="sm" className="gap-2 cursor-pointer">
              <ArrowLeft className="h-4 w-4" /> Back to Directory
            </Button>
          </Link>
          <ErrorMessage
            title="Airport Not Found"
            message={error?.message || `Could not find airport data with code ${iataCode}`}
            onRetry={() => refetch()}
          />
        </div>
      </PageContainer>
    );
  }

  const hasCoords =
    typeof airport.latitude === 'number' && typeof airport.longitude === 'number';

  return (
    <PageContainer className="space-y-8">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/airports">
          <Button variant="outline" size="sm" className="gap-2 cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
            Back to Airports
          </Button>
        </Link>
        <Badge variant="outline" className="font-mono text-xs">
          Coordinates: {airport.latitude?.toFixed(4)}, {airport.longitude?.toFixed(4)}
        </Badge>
      </div>

      {/* Hero Title Card */}
      <div className="bg-gradient-to-r from-sky-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-3xl sm:text-4xl font-black text-sky-400 tracking-wider">
              {airport.iataCode}
            </span>
            <span className="text-slate-400 font-mono text-lg">/</span>
            <span className="font-mono text-xl text-slate-300">
              {airport.icaoCode}
            </span>
            <Badge variant="sky" className="bg-sky-500/20 text-sky-200 border-sky-400/40">
              {airport.type?.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {airport.name}
          </h1>
          <p className="text-sm text-slate-300 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-sky-400" />
            {airport.city}, {airport.country} ({airport.countryCode})
          </p>
        </div>

        <div className="flex flex-row md:flex-col gap-4 text-right border-t md:border-t-0 md:border-l border-slate-700/60 pt-4 md:pt-0 md:pl-6">
          <div>
            <p className="text-xs text-slate-400 font-medium">Elevation</p>
            <p className="text-xl font-bold font-mono text-white">
              {airport.elevation?.toLocaleString()} ft
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Timezone</p>
            <p className="text-sm font-mono text-sky-300">
              {airport.timezone || 'UTC'}
            </p>
          </div>
        </div>
      </div>

      {/* Hierarchical Relationship: Airport -> City -> Country */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Airport Level */}
        <Card className="border-sky-100 bg-sky-50/30 dark:bg-sky-950/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-sky-600 font-mono">
              <Plane className="h-4 w-4" />
              1. Airport Entity
            </div>
            <CardTitle className="text-lg">{airport.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
            <p><strong>IATA:</strong> {airport.iataCode}</p>
            <p><strong>ICAO:</strong> {airport.icaoCode}</p>
            <p><strong>Runways:</strong> {airport.runwaysCount || 2} operational</p>
          </CardContent>
        </Card>

        {/* City Level */}
        <Card className="border-indigo-100 bg-indigo-50/30 dark:bg-indigo-950/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-indigo-600 font-mono">
              <Building className="h-4 w-4" />
              2. City Hub
            </div>
            <CardTitle className="text-lg">{airport.city}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
            <p><strong>Primary Metropolitan:</strong> {airport.city}</p>
            <p><strong>Timezone:</strong> {airport.timezone}</p>
            <p><strong>Regional Code:</strong> {airport.countryCode}</p>
          </CardContent>
        </Card>

        {/* Country Level */}
        <Card className="border-emerald-100 bg-emerald-50/30 dark:bg-emerald-950/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-600 font-mono">
              <Globe2 className="h-4 w-4" />
              3. Sovereign State
            </div>
            <CardTitle className="text-lg">{airport.country}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
            <p><strong>Country Name:</strong> {airport.country}</p>
            <p><strong>ISO 2-Letter Code:</strong> {airport.countryCode}</p>
            <p><strong>Aviation Authority:</strong> ICAO Member State</p>
          </CardContent>
        </Card>
      </div>

      {/* Description & Overview */}
      {airport.description && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold">About This Airport</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {airport.description}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Interactive Leaflet Map Section */}
      <Card className="overflow-hidden border shadow-sm border-sky-100 bg-sky-50/30 dark:bg-sky-950/20">
        <CardHeader className="border-b bg-muted/40 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-sky-600" />
              <CardTitle className="text-base font-bold">
                Geographic Location & Map
              </CardTitle>
            </div>
            <Badge variant="outline" className="text-xs font-mono">
              OpenStreetMap + Leaflet
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {hasCoords ? (
            <div className="h-[380px] w-full relative z-0">
              <MapContainer
                center={[airport.latitude, airport.longitude]}
                zoom={12}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[airport.latitude, airport.longitude]}
                  icon={defaultMarkerIcon}
                >
                  <Popup>
                    <div className="p-1 text-slate-900">
                      <p className="font-bold text-sm">{airport.name}</p>
                      <p className="text-xs text-sky-600 font-mono font-bold">
                        IATA: {airport.iataCode} | ICAO: {airport.icaoCode}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {airport.city}, {airport.country}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-sm text-slate-400">
              Coordinates unavailable for this airport.
            </div>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  );
}

export default AirportDetails;
