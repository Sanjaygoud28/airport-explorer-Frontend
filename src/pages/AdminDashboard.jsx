import React, { useState } from 'react';
import {
  LayoutDashboard,
  Plus,
  Edit2,
  Trash2,
  Globe2,
  Plane,
  Building,
  AlertTriangle,
  Search,
  CheckCircle,
} from 'lucide-react';

import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Loading } from '../components/common/Loading';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useAdminStats, useAirports, useDeleteAirport } from '../hooks/useAirportsQuery';
import { AirportFormModal } from '../components/admin/AirportFormModal';

export function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dialog state for delete confirmation
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAirportToDelete, setSelectedAirportToDelete] = useState(null);
  
  // Dialog state for add/edit form
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [airportToEdit, setAirportToEdit] = useState(null);

  const [notification, setNotification] = useState('');

  // TanStack Query: fetch stats & airport list
  const {
    data: stats,
    isLoading: isStatsLoading,
  } = useAdminStats();

  const {
    data: airportsData,
    isLoading: isAirportsLoading,
    isError,
    error,
    refetch,
  } = useAirports();

  // TanStack Query mutation for deleting airport with automatic cache invalidation
  const deleteMutation = useDeleteAirport();

  const airports = airportsData?.data || [];
  const loading = isStatsLoading || isAirportsLoading;

  const handleDeleteConfirm = async () => {
    if (!selectedAirportToDelete) return;
    try {
      await deleteMutation.mutateAsync(selectedAirportToDelete._id);
      setNotification(`Airport "${selectedAirportToDelete.name}" deleted successfully.`);
      setTimeout(() => setNotification(''), 4000);
    } catch (err) {
      alert('Delete failed: ' + (err.message || 'Unknown error'));
    } finally {
      setDeleteModalOpen(false);
      setSelectedAirportToDelete(null);
    }
  };

  const filteredAirports = airports.filter(
    (a) =>
      a.iataCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.city?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <LayoutDashboard className="h-4 w-4" />
            Administrative Portal
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage, verify, and maintain global airport datasets with TanStack Query.
          </p>
        </div>

        <Button
          onClick={() => {
            setAirportToEdit(null);
            setFormModalOpen(true);
          }}
          className="gap-2 bg-sky-600 hover:bg-sky-700 shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          + Add Airport
        </Button>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center shrink-0">
              <Plane className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Airports</p>
              <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                {stats?.totalAirports?.toLocaleString() || '1,248'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center shrink-0">
              <Globe2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Countries</p>
              <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                {stats?.totalCountries || '194'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <Building className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Cities</p>
              <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                {stats?.totalCities?.toLocaleString() || '890'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Airport Management Section */}
      <Card className="border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <CardHeader className="border-b bg-muted/20 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg">Airport Records Management</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">
                Browse, edit attributes, or decommission existing airport entries.
              </p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Filter table rows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="p-8">
              <Loading text="Loading airport records via TanStack Query..." />
            </div>
          ) : isError ? (
            <div className="p-6">
              <ErrorMessage
                message={error?.message || 'Failed to load records'}
                onRetry={() => refetch()}
              />
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 font-semibold text-xs border-b">
                    <tr>
                      <th className="py-3.5 px-4">Airport</th>
                      <th className="py-3.5 px-4">IATA Code</th>
                      <th className="py-3.5 px-4">City</th>
                      <th className="py-3.5 px-4">Country</th>
                      <th className="py-3.5 px-4">Type</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredAirports.map((airport) => (
                      <tr
                        key={airport._id || airport.iataCode}
                        className="hover:bg-slate-50/70 dark:hover:bg-slate-900/30 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">
                          {airport.name}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-sky-600">
                          {airport.iataCode}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                          {airport.city?.name}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
{airport.city?.country?.name}                        </td>
                        <td className="py-3.5 px-4">
                          <Badge variant="outline" className="text-[10px] capitalize font-normal">
                            {airport.type?.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setAirportToEdit(airport);
                              setFormModalOpen(true);
                            }}
                            className="h-8 px-2 text-slate-600 hover:text-sky-600 cursor-pointer"
                          >
                            <Edit2 className="h-3.5 w-3.5 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={deleteMutation.isPending}
                            onClick={() => {
                              setSelectedAirportToDelete(airport);
                              setDeleteModalOpen(true);
                            }}
                            className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Responsive Cards View */}
              <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
                {filteredAirports.map((airport) => (
                  <div key={airport._id || airport.iataCode} className="p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-lg font-bold text-sky-600">
                        {airport.iataCode}
                      </span>
                      <Badge variant="outline" className="text-[10px] capitalize">
                        {airport.type?.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="font-semibold text-sm">{airport.name}</p>
                    <p className="text-xs text-slate-500">
                      {airport.city?.name}, {airport.city?.country?.name}
                    </p>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setAirportToEdit(airport);
                          setFormModalOpen(true);
                        }}
                        className="h-8 text-xs cursor-pointer"
                      >
                        <Edit2 className="h-3 w-3 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={deleteMutation.isPending}
                        onClick={() => {
                          setSelectedAirportToDelete(airport);
                          setDeleteModalOpen(true);
                        }}
                        className="h-8 text-xs cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal Dialog */}
      {deleteModalOpen && selectedAirportToDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card rounded-xl border max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 text-red-600">
              <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-950/60 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Confirm Deletion
                </h3>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300">
              Are you sure you want to delete{' '}
              <span className="font-bold text-slate-900 dark:text-white">
                {selectedAirportToDelete.name} ({selectedAirportToDelete.iataCode})
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setSelectedAirportToDelete(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={deleteMutation.isPending}
                onClick={handleDeleteConfirm}
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete Airport'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      <AirportFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        airport={airportToEdit}
        onSuccess={(msg) => {
          setNotification(msg);
          setTimeout(() => setNotification(''), 4000);
        }}
      />
    </PageContainer>
  );
}

export default AdminDashboard;
