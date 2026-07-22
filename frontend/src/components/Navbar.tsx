import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { inventoryAPI } from '../services/api';
import { Car, ShieldCheck, User as UserIcon, LogOut, Plus, LogIn, ShoppingCart, X, Trash2, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenAddVehicle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenAddVehicle }) => {
  const { user, isAuthenticated, isAdmin, logout, quickLogin } = useAuth();
  const { cart, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      setIsCartOpen(false);
      onOpenAuth();
      return;
    }
    
    setIsCheckingOut(true);
    setCheckoutMessage(null);
    try {
      // Very simple bulk checkout for the kata
      for (const item of cart) {
        // Just purchasing one unit of each type for simplicity
        // as the backend endpoint only takes an ID
        await inventoryAPI.purchase(item.vehicle.id);
      }
      setCheckoutMessage('Checkout successful! Enjoy your new vehicles!');
      setTimeout(() => {
        clearCart();
        setIsCartOpen(false);
        setCheckoutMessage(null);
        window.location.reload(); // Quick refresh to update inventory amounts across the app
      }, 2000);
    } catch (err: any) {
      setCheckoutMessage(err.response?.data?.error || 'Checkout failed. Items may be out of stock.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg glow-cyan group-hover:scale-105 transition-transform">
              <Car className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent group-hover:text-white transition-colors">
                  DriveHub
                </span>
              </div>
          
            </div>
          </Link>

          {/* User Actions & Role Controls */}
          <div className="flex items-center gap-3">
            
            {/* Quick Demo Switcher */}
            <div className="hidden md:flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-medium px-2">Demo Role:</span>
              <button
                onClick={() => quickLogin('CUSTOMER')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  isAuthenticated && !isAdmin
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => quickLogin('ADMIN')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  isAdmin
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Admin Add Vehicle Action */}
            {isAdmin && (
              <button
                onClick={onOpenAddVehicle}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Vehicle</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-900/50 transition-all ml-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-tr from-cyan-500 to-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg border-2 border-slate-950">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Auth Profile Badge */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3 pl-2 border-l border-slate-800 ml-1">
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl">
                  {isAdmin ? (
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-blue-400" />
                  )}
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-slate-100">{user?.name}</p>
                    <p className="text-[10px] font-medium text-slate-400 tracking-wide uppercase">
                      {user?.role}
                    </p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-900/50 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200 font-semibold text-sm transition-all ml-2"
              >
                <LogIn className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

          </div>
        </div>
      </header>

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" 
            onClick={() => setIsCartOpen(false)}
          />
          <div className="relative w-full max-w-md bg-slate-900 h-full border-l border-slate-800 shadow-2xl flex flex-col transform transition-transform duration-300">
            
            {/* Cart Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-cyan-500" />
                Your Cart
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500">
                  <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
                  <p>Your cart is empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 text-cyan-500 hover:underline text-sm font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.vehicle.id} className="flex gap-4 p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 items-center">
                    <img 
                      src={item.vehicle.imageUrl || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=200&q=80'} 
                      alt={item.vehicle.model}
                      className="w-20 h-20 object-cover rounded-xl bg-slate-900"
                    />
                    <div className="flex-1">
                      <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-wider">{item.vehicle.make}</p>
                      <h4 className="text-sm font-bold text-white mb-1">{item.vehicle.model}</h4>
                      <div className="flex items-center justify-between">
                        <p className="text-emerald-400 font-bold text-sm">
                          ${item.vehicle.price.toLocaleString()} 
                        </p>
                        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.vehicle.id, item.count - 1)}
                            disabled={item.count <= 1}
                            className="w-6 h-6 flex items-center justify-center rounded-md bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-slate-300 w-4 text-center">{item.count}</span>
                          <button
                            onClick={() => updateQuantity(item.vehicle.id, item.count + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-md bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.vehicle.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-xl transition-colors self-start"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-800 bg-slate-950/80 backdrop-blur-md">
                
                {checkoutMessage && (
                  <div className={`p-3 rounded-xl text-sm font-medium mb-4 ${
                    checkoutMessage.includes('successful') 
                      ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900' 
                      : 'bg-rose-950/50 text-rose-400 border border-rose-900'
                  }`}>
                    {checkoutMessage}
                  </div>
                )}

                <div className="flex items-center justify-between mb-6">
                  <span className="text-slate-400 font-medium">Subtotal</span>
                  <span className="text-2xl font-black text-white">${totalPrice.toLocaleString()}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-slate-950 font-bold flex items-center justify-center gap-2 hover:from-emerald-400 hover:to-cyan-500 shadow-xl shadow-emerald-900/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Checkout
                    </>
                  )}
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
