import React, { useState, useEffect } from 'react';
import { X, Save, Building, MapPin, Globe2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useCreateAirport, useUpdateAirport } from '../../hooks/useAirportsQuery';
import api from '../../services/api';

import CreateAdminModal from '../../pages/CreateAdminModal';
export function AirportFormModal({ isOpen, onClose, airport = null, onSuccess }) {
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    iataCode: '',
    icaoCode: '',
    city: '',
    country: '',
    countryCode: '',
    type: 'large_airport',
    elevation: '',
    latitude: '',
    longitude: '',
    timezone: '',
    runwaysCount: '',
    description: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  // const [isCreateAdminOpen, setIsCreateAdminOpen] = useState(false);

  const createMutation = useCreateAirport();
  const updateMutation = useUpdateAirport();

  const isEditing = !!airport;
  const isPending = createMutation.isPending || updateMutation.isPending;


  useEffect(() => {
    if (isOpen) {
      if (isEditing) {
        setFormData({
          name: airport.name || '',
          iataCode: airport.iataCode || '',
          icaoCode: airport.icaoCode || '',
          city: airport.city?.id || airport.city?._id || '',
          country: airport.city?.country?.name || '',
          type: airport.type || 'large_airport',
          elevationFt: airport.elevationFt || '',
          latitudeDeg: airport.latitudeDeg || '',
          longitudeDeg: airport.longitudeDeg || '',

        });
      } else {
        setFormData({
          name: '',
          iataCode: '',
          icaoCode: '',
          city: '',
          // country: '',
          type: 'large_airport',
          elevationFt: '',
          latitudeDeg: '',
          longitudeDeg: '',

        });
      }
      setErrorMessage('');
    }
  }, [isOpen, isEditing, airport]);

  useEffect(() => {
    api.get('/Cities/').then((res) => setCities(res.data.data));
  }, []);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic validation
    if (!formData.name || !formData.iataCode || !formData.city) {
      setErrorMessage('Please fill out Name, IATA Code, City, and Country.');
      return;
    }

    try {
      // Format number fields
      const formattedData = {
        ...formData,
        elevationFt: formData.elevationFt
          ? Number(formData.elevationFt)
          : undefined,

        latitudeDeg: formData.latitudeDeg
          ? Number(formData.latitudeDeg)
          : undefined,

        longitudeDeg: formData.longitudeDeg
          ? Number(formData.longitudeDeg)
          : undefined,
      };

      if (isEditing) {
        await updateMutation.mutateAsync({ id: airport._id, airportData: formattedData });
        if (onSuccess) onSuccess(`Airport ${formattedData.iataCode} updated successfully.`);
      } else {
        await createMutation.mutateAsync(formattedData);
        if (onSuccess) onSuccess(`Airport ${formattedData.iataCode} added successfully.`);
      }
      onClose();
    } catch (err) {
      setErrorMessage(err.message || 'Failed to save airport record.');
    }
  };


  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border max-w-3xl w-full flex flex-col shadow-xl max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building className="h-5 w-5 text-sky-600" />
              {isEditing ? 'Edit Airport Record' : 'Add New Airport'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {isEditing
                ? `Updating details for ${airport.iataCode}`
                : 'Enter details for a new airport facility'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {errorMessage && (
            <div className="p-3 mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
              {errorMessage}
            </div>
          )}

          <form id="airportForm" onSubmit={handleSubmit} className="space-y-6">

            {/* Essential Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 border-b pb-2">
                <Globe2 className="h-4 w-4 text-sky-500" /> Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Name *</label>
                  <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Heathrow Airport" required />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">IATA *</label>
                    <Input name="iataCode" value={formData.iataCode} onChange={handleChange} placeholder="LHR" maxLength={3} className="uppercase font-mono" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ICAO</label>
                    <Input name="icaoCode" value={formData.icaoCode} onChange={handleChange} placeholder="EGLL" maxLength={4} className="uppercase font-mono" />
                  </div>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 border-b pb-2">
                <MapPin className="h-4 w-4 text-indigo-500" /> Geography & Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">City *</label>
                  <Input name="city" value={formData.city} onChange={handleChange} placeholder="London" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Country *</label>
                  <Input name="country" value={formData.country} onChange={handleChange} placeholder="United Kingdom" required />
                </div> */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">City *</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name} ({city.country})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Latitude</label>
                  <Input name="latitudeDeg" type="number" step="0.0001" value={formData.latitudeDeg} onChange={handleChange} placeholder="51.4700" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Longitude</label>
                  <Input name="longitudeDeg" type="number" step="0.0001" value={formData.longitudeDeg} onChange={handleChange} placeholder="-0.4543" />
                </div>


              </div>
            </div>

            {/* Operational Info */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Airport Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="large_airport">Large Airport</option>
                    <option value="medium_airport">Medium Airport</option>
                    <option value="small_airport">Small Airport</option>
                  </select>
                </div>

              </div>

            </div>


            {/* <Button onClick={() => setIsCreateAdminOpen(true)}>Create Admin</Button> */}
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3 rounded-b-xl">
          <Button variant="outline" onClick={onClose} disabled={isPending} className="cursor-pointer">
            Cancel
          </Button>
          <Button form="airportForm" type="submit" disabled={isPending} className="gap-2 bg-sky-600 hover:bg-sky-700 cursor-pointer">
            <Save className="h-4 w-4" />
            {isPending ? 'Saving...' : 'Save Record'}
          </Button>
        </div>
      </div>

    </div>

  );
}

export default AirportFormModal;
