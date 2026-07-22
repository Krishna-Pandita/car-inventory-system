import React from 'react';
import { Vehicle } from '../types';
import { VehicleCard } from './VehicleCard';
import { Car, SearchX } from 'lucide-react';

interface VehicleGridProps {
  vehicles: Vehicle[];
  isLoading: boolean;
  onPurchase: (vehicle: Vehicle) => void;
  onEdit?: (vehicle: Vehicle) => void;
  onRestock?: (vehicle: Vehicle) => void;
  onDelete?: (id: string) => void;
  onResetFilters?: () => void;
}

export const VehicleGrid: React.FC<VehicleGridProps> = ({
  vehicles,
  isLoading,
  onPurchase,
  onEdit,
  onRestock,
  onDelete,
  onResetFilters,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass-card h-[400px] rounded-2xl animate-pulse bg-slate-900/50 p-4 flex flex-col justify-between">
            <div className="h-48 bg-slate-800 rounded-xl" />
            <div className="space-y-3">
              <div className="h-4 bg-slate-800 rounded w-1/3" />
              <div className="h-6 bg-slate-800 rounded w-2/3" />
              <div className="h-4 bg-slate-800 rounded w-full" />
            </div>
            <div className="h-10 bg-slate-800 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="glass-card p-12 rounded-3xl text-center border border-slate-800 max-w-md mx-auto my-12">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500 mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-200">No Vehicles Found</h3>
        <p className="text-sm text-slate-400 mt-2 mb-6">
          No inventory matches your current search criteria or category filters.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all"
          >
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onPurchase={onPurchase}
          onEdit={onEdit}
          onRestock={onRestock}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
