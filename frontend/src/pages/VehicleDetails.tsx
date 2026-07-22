import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Vehicle } from '../types';
import { vehiclesAPI, inventoryAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { ArrowLeft, ShoppingCart, Plus, Layers, ShieldCheck, Zap, Gauge } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/Toast';

export const VehicleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    const toastId = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id: toastId, type, text }]);
  };

  const removeToast = (toastId: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
  };

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        // Fetch all and find (since there's no single GET endpoint yet)
        const allVehicles = await vehiclesAPI.getAll();
        const found = allVehicles.find(v => v.id === id);
        if (found) {
          setVehicle(found);
        } else {
          showToast('Vehicle not found', 'error');
        }
      } catch (err: any) {
        showToast('Error loading vehicle details', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      showToast('Please sign in to purchase', 'error');
      return;
    }
    if (!vehicle) return;

    try {
      const res = await inventoryAPI.purchase(vehicle.id);
      showToast(`Congratulations! Purchased ${vehicle.make} ${vehicle.model} successfully!`);
      setVehicle(res.vehicle);
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Purchase failed', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <p>Vehicle not found.</p>
        <button onClick={() => navigate('/')} className="mt-4 text-cyan-400 hover:underline">
          Return Home
        </button>
      </div>
    );
  }

  const defaultImage = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80';
  const isOutOfStock = vehicle.quantity === 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar onOpenAuth={() => {}} onOpenAddVehicle={() => {}} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Inventory</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Image Section */}
          <div className="rounded-3xl overflow-hidden glass-card border border-slate-800 relative">
            <img 
              src={vehicle.imageUrl || defaultImage} 
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-cover min-h-[400px]"
              onError={(e) => { (e.target as HTMLImageElement).src = defaultImage; }}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-slate-900/80 backdrop-blur-md text-cyan-400 border border-cyan-800/40 shadow-md">
                {vehicle.category}
              </span>
              <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-slate-900/80 backdrop-blur-md text-slate-300 border border-slate-800">
                {vehicle.year}
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="mb-2">
              <h2 className="text-xl font-bold uppercase tracking-widest text-cyan-500 mb-1">{vehicle.make}</h2>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {vehicle.model}
              </h1>
            </div>

            <div className="text-4xl font-black text-emerald-400 my-6">
              ${vehicle.price.toLocaleString()}
            </div>

            <div className="prose prose-invert max-w-none text-slate-300 mb-8 leading-relaxed">
              <p>{vehicle.description || `${vehicle.year} ${vehicle.make} ${vehicle.model} - High performance ${vehicle.category} vehicle.`}</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-900/30 flex items-center justify-center text-blue-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Inventory</p>
                  <p className="text-lg font-bold text-slate-200">{vehicle.quantity} Units Left</p>
                </div>
              </div>
              
              <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-900/30 flex items-center justify-center text-amber-400">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Condition</p>
                  <p className="text-lg font-bold text-slate-200">New</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handlePurchase}
                  disabled={isOutOfStock}
                  className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    isOutOfStock
                      ? 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                      : 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-600/30 shadow-xl shadow-emerald-950/20 active:scale-[0.98]'
                  }`}
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>{isOutOfStock ? 'Sold Out' : 'Buy Now'}</span>
                </button>
                
                <button
                  onClick={() => {
                    addToCart(vehicle);
                    showToast(`Added ${vehicle.make} ${vehicle.model} to cart`);
                  }}
                  disabled={isOutOfStock}
                  className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    isOutOfStock
                      ? 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 shadow-xl shadow-cyan-950/50 active:scale-[0.98]'
                  }`}
                >
                  <Plus className="w-6 h-6" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};
