import React from 'react';
import { VehicleFilters } from '../types';
import { Search, Filter, RotateCcw, DollarSign } from 'lucide-react';

interface SearchFilterBarProps {
  filters: VehicleFilters;
  onFilterChange: (filters: VehicleFilters) => void;
  onReset: () => void;
  categories: string[];
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  categories,
}) => {
  return (
    <div className="glass-card p-6 rounded-2xl mb-8 border border-slate-800 space-y-4">
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search make, model, or specs (e.g. Tesla, Porsche, GT3)..."
            value={filters.make || ''}
            onChange={(e) => onFilterChange({ ...filters, make: e.target.value })}
            className="w-full pl-11 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>

        {/* Category Select */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={filters.category || ''}
              onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
              className="appearance-none bg-slate-900 border border-slate-700/80 px-4 py-3 pr-10 rounded-xl text-sm font-medium text-slate-200 focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <Filter className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Reset Filters */}
          <button
            onClick={onReset}
            title="Reset Filters"
            className="p-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-slate-700 rounded-xl transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Secondary Filters: Price Range & Stock Status */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
        
        {/* Price Range inputs */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-cyan-400" /> Price Range:
          </span>
          <input
            type="number"
            placeholder="Min $"
            value={filters.minPrice || ''}
            onChange={(e) =>
              onFilterChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })
            }
            className="w-28 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500"
          />
          <span className="text-slate-600">-</span>
          <input
            type="number"
            placeholder="Max $"
            value={filters.maxPrice || ''}
            onChange={(e) =>
              onFilterChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })
            }
            className="w-28 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Stock Toggle */}
        <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-medium select-none">
          <input
            type="checkbox"
            checked={!!filters.inStockOnly}
            onChange={(e) => onFilterChange({ ...filters, inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-950"
          />
          <span>Show In-Stock Only</span>
        </label>

      </div>
    </div>
  );
};
