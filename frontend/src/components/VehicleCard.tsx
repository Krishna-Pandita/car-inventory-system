import React from 'react';
import { Vehicle } from '../types';
import { ShoppingCart, RefreshCw, Edit3, Trash2, Tag, Calendar, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface VehicleCardProps {
  vehicle: Vehicle;
  onPurchase: (vehicle: Vehicle) => void;
  onEdit?: (vehicle: Vehicle) => void;
  onRestock?: (vehicle: Vehicle) => void;
  onDelete?: (id: string) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onPurchase,
  onEdit,
  onRestock,
  onDelete,
}) => {
  const { isAdmin } = useAuth();
  const isOutOfStock = vehicle.quantity === 0;

  const defaultImage =
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-slate-800/80 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 flex flex-col group">
      
      {/* Image Container */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
        <img
          src={vehicle.imageUrl || defaultImage}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />

        {/* Category & Year Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 backdrop-blur-md text-cyan-400 border border-cyan-800/40 shadow-md">
            {vehicle.category}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-slate-300 border border-slate-800">
            {vehicle.year}
          </span>
        </div>

        {/* Stock Status Badge */}
        <div className="absolute top-3 right-3">
          {isOutOfStock ? (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-950/90 text-rose-300 border border-rose-800/60 shadow-lg animate-pulse">
              Sold Out
            </span>
          ) : vehicle.quantity <= 2 ? (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950/90 text-amber-300 border border-amber-800/60 shadow-lg">
              Low Stock ({vehicle.quantity})
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-800/60 shadow-lg">
              In Stock ({vehicle.quantity})
            </span>
          )}
        </div>

        {/* Title & Price inside image gradient overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">{vehicle.make}</p>
          <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight">
            {vehicle.model}
          </h3>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Specs & Description */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-500" /> Stock: <strong className="text-slate-200">{vehicle.quantity} units</strong>
            </span>
            <span className="flex items-center gap-1 font-bold text-lg text-emerald-400">
              ${vehicle.price.toLocaleString()}
            </span>
          </div>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {vehicle.description || `${vehicle.year} ${vehicle.make} ${vehicle.model} - High performance ${vehicle.category} vehicle.`}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          
          {/* Main Purchase Action */}
          <button
            onClick={() => onPurchase(vehicle)}
            disabled={isOutOfStock}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              isOutOfStock
                ? 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-cyan-600 text-slate-950 hover:from-emerald-400 hover:to-cyan-500 shadow-lg shadow-emerald-950/50 active:scale-[0.98]'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{isOutOfStock ? 'Out of Stock' : 'Purchase Vehicle'}</span>
          </button>

          {/* Admin Tools Bar */}
          {isAdmin && (
            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                onClick={() => onRestock && onRestock(vehicle)}
                className="flex-1 py-1.5 px-2 bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800 text-amber-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restock</span>
              </button>

              <button
                onClick={() => onEdit && onEdit(vehicle)}
                className="flex-1 py-1.5 px-2 bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 text-blue-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => onDelete && onDelete(vehicle.id)}
                className="p-1.5 bg-slate-900 border border-slate-800 hover:border-rose-500/50 hover:bg-rose-950/40 text-rose-400 rounded-lg text-xs transition-all"
                title="Delete Vehicle"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
