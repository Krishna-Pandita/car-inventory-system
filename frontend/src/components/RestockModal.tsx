import React, { useState } from 'react';
import { Vehicle } from '../types';
import { X, RefreshCw } from 'lucide-react';

interface RestockModalProps {
  isOpen: boolean;
  vehicle: Vehicle | null;
  onClose: () => void;
  onRestock: (id: string, count: number) => Promise<void>;
}

export const RestockModal: React.FC<RestockModalProps> = ({
  isOpen,
  vehicle,
  onClose,
  onRestock,
}) => {
  const [count, setCount] = useState<number>(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !vehicle) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onRestock(vehicle.id, Number(count));
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Restock failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-card w-full max-w-md rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">Restock Inventory</h3>
            <p className="text-xs text-slate-400">
              {vehicle.make} {vehicle.model} (Current Stock: {vehicle.quantity})
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-800/60 text-rose-300 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
              Additional Quantity to Add
            </label>
            <input
              type="number"
              min="1"
              required
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700/80 rounded-xl text-lg font-bold text-amber-300 focus:outline-none focus:border-amber-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              New Total Stock will be: <strong>{vehicle.quantity + (Number(count) || 0)} units</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            {[1, 5, 10, 20].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setCount(num)}
                className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                  count === num
                    ? 'bg-amber-600/30 border-amber-500 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                +{num}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-extrabold text-sm shadow-lg hover:from-amber-400 hover:to-orange-500 transition-all disabled:opacity-50"
          >
            {loading ? 'Restocking...' : `Confirm Restock (+${count} Units)`}
          </button>
        </form>
      </div>
    </div>
  );
};
