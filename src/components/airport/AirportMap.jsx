import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router';
import { Button } from '../ui/button';

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

export function AirportMap({ airports, zoom = 2, center = [20, 0], height = '600px' }) {
  const navigate = useNavigate();
  

  return (
    
    <div className="w-full relative z-0 border rounded-xl overflow-hidden shadow-sm" style={{ height }}>
      
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {airports.map((airport) => {
          if (typeof airport.latitude !== 'number' || typeof airport.longitude !== 'number') {
            return null;
          }

          return (
            <Marker
              key={airport.id || airport.iataCode}
              position={[airport.latitude, airport.longitude]}
              icon={defaultMarkerIcon}
            >
              <Popup>
                <div className="p-1 text-slate-900 min-w-[200px]">
                  <p className="font-bold text-sm mb-1">{airport.name}</p>
                  <p className="text-xs text-sky-600 font-mono font-bold">
                    IATA: {airport.iataCode} | ICAO: {airport.icaoCode}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 mb-3">
                    {airport.city}, {airport.country}
                  </p>
                  <Button 
                    size="sm" 
                    className="w-full text-xs" 
                    onClick={() => navigate(`/airports/${airport.iataCode}`)}
                  >
                    View Details
                  </Button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
