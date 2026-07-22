import React from 'react';
import { Vehicle } from '../types';
import { Car, CheckCircle2, AlertTriangle, DollarSign } from 'lucide-react';

interface StatsBarProps {
  vehicles: Vehicle[];
}

export const StatsBar: React.FC<StatsBarProps> = ({ vehicles }) => {
  const totalModels = vehicles.length;
  const totalStockUnits = vehicles.reduce((sum, v) => sum + v.quantity, 0);
  const outOfStockCount = vehicles.filter((v) => v.quantity === 0).length;
  const totalInventoryValue = vehicles.reduce((sum, v) => sum + v.price * v.quantity, 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      
      {/* Total Models */}
      <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
          <Car className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Models Listed</p>
          <p className="text-2xl font-extrabold text-white mt-0.5">{totalModels}</p>
        </div>
      </div>

      {/* Available Units */}
      <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Available Stock</p>
          <p className="text-2xl font-extrabold text-emerald-400 mt-0.5">{totalStockUnits} Units</p>
        </div>
      </div>

      {/* Out of Stock */}
      <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sold Out Models</p>
          <p className="text-2xl font-extrabold text-amber-400 mt-0.5">{outOfStockCount}</p>
        </div>
      </div>

      {/* Valuation */}
      <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
          <DollarSign className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Inventory Value</p>
          <p className="text-2xl font-extrabold text-cyan-300 mt-0.5">
            ${totalInventoryValue.toLocaleString()}
          </p>
        </div>
      </div>

    </div>
  );
};
