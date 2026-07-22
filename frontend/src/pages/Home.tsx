import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { Vehicle, VehicleFilters } from '../types';
import { vehiclesAPI, inventoryAPI } from '../services/api';
import { Navbar } from '../components/Navbar';
import { StatsBar } from '../components/StatsBar';
import { SearchFilterBar } from '../components/SearchFilterBar';
import { VehicleGrid } from '../components/VehicleGrid';
import { AuthModal } from '../components/AuthModal';
import { VehicleModal } from '../components/VehicleModal';
import { RestockModal } from '../components/RestockModal';
import { ToastContainer, ToastMessage } from '../components/Toast';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const Home: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<VehicleFilters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isRestockOpen, setIsRestockOpen] = useState(false);
  const [restockVehicleItem, setRestockVehicleItem] = useState<Vehicle | null>(null);

  const { isAuthenticated, isAdmin } = useAuth();

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, text }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch Inventory
  const fetchVehicles = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await vehiclesAPI.getAll();
      setVehicles(data);
    } catch (err: any) {
      if (err.response?.status !== 401) {
        showToast(err.response?.data?.error || 'Failed to fetch inventory', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles, isAuthenticated]);

  // Apply filters locally & via search API
  useEffect(() => {
    let result = [...vehicles];

    if (filters.make) {
      const term = filters.make.toLowerCase();
      result = result.filter(
        (v) =>
          v.make.toLowerCase().includes(term) ||
          v.model.toLowerCase().includes(term) ||
          (v.description && v.description.toLowerCase().includes(term))
      );
    }

    if (filters.category) {
      result = result.filter((v) => v.category === filters.category);
    }

    if (filters.minPrice !== undefined) {
      result = result.filter((v) => v.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter((v) => v.price <= filters.maxPrice!);
    }

    if (filters.inStockOnly) {
      result = result.filter((v) => v.quantity > 0);
    }

    setFilteredVehicles(result);
  }, [vehicles, filters]);

  // Unique categories list
  const categories = Array.from(new Set(vehicles.map((v) => v.category)));

  // Handlers
  const handlePurchase = async (vehicle: Vehicle) => {
    if (!isAuthenticated) {
      showToast('Please sign in to purchase a vehicle', 'error');
      setIsAuthOpen(true);
      return;
    }

    try {
      const res = await inventoryAPI.purchase(vehicle.id);
      showToast(`Congratulations! Purchased ${vehicle.make} ${vehicle.model} successfully!`);
      // Update local state
      setVehicles((prev) =>
        prev.map((v) => (v.id === vehicle.id ? res.vehicle : v))
      );
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Purchase failed', 'error');
    }
  };

  const handleSaveVehicle = async (data: Partial<Vehicle>) => {
    try {
      if (editingVehicle) {
        const updated = await vehiclesAPI.update(editingVehicle.id, data);
        showToast(`Updated ${updated.make} ${updated.model} details`);
        setVehicles((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
      } else {
        const created = await vehiclesAPI.create(data);
        showToast(`Added ${created.make} ${created.model} to inventory`);
        setVehicles((prev) => [created, ...prev]);
      }
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to save vehicle', 'error');
      throw err;
    }
  };

  const handleRestockVehicle = async (id: string, count: number) => {
    try {
      const res = await inventoryAPI.restock(id, count);
      showToast(res.message);
      setVehicles((prev) => prev.map((v) => (v.id === id ? res.vehicle : v)));
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Restock failed', 'error');
      throw err;
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this vehicle from inventory?')) {
      return;
    }
    try {
      await vehiclesAPI.delete(id);
      showToast('Vehicle removed from catalog');
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to delete vehicle', 'error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Navbar */}
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAddVehicle={() => {
          setEditingVehicle(null);
          setIsVehicleModalOpen(true);
        }}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/60 border border-slate-800 p-8 mb-8 shadow-2xl">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Premium Car Dealership & Inventory System
            </h1>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Browse and manage a modern car inventory with secure authentication, real-time stock updates, seamless purchase workflows, and powerful admin controls for vehicle management.
            </p>
          </div>
        </div>

        {/* Stats */}
        <StatsBar vehicles={vehicles} />

        {/* Search & Filter */}
        <SearchFilterBar
          filters={filters}
          onFilterChange={setFilters}
          onReset={() => setFilters({})}
          categories={categories}
        />

        {/* Vehicle Grid */}
        <VehicleGrid
          vehicles={filteredVehicles}
          isLoading={isLoading}
          onPurchase={handlePurchase}
          onEdit={(v) => {
            setEditingVehicle(v);
            setIsVehicleModalOpen(true);
          }}
          onRestock={(v) => {
            setRestockVehicleItem(v);
            setIsRestockOpen(true);
          }}
          onDelete={handleDeleteVehicle}
          onResetFilters={() => setFilters({})}
        />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Apex Motors. Your trusted destination for premium vehicles. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals & Toasts */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(msg) => showToast(msg)}
      />

      <VehicleModal
        isOpen={isVehicleModalOpen}
        vehicle={editingVehicle}
        onClose={() => {
          setIsVehicleModalOpen(false);
          setEditingVehicle(null);
        }}
        onSubmit={handleSaveVehicle}
      />

      <RestockModal
        isOpen={isRestockOpen}
        vehicle={restockVehicleItem}
        onClose={() => {
          setIsRestockOpen(false);
          setRestockVehicleItem(null);
        }}
        onRestock={handleRestockVehicle}
      />

      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};
