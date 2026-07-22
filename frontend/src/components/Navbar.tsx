import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Car, ShieldCheck, User as UserIcon, LogOut, Plus, LogIn } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenAddVehicle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenAddVehicle }) => {
  const { user, isAuthenticated, isAdmin, logout, quickLogin } = useAuth();

  return (
    <header className="sticky top-0 z-40 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg glow-cyan">
            <Car className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                DriveHub
              </span>
              <span className="text-cyan-400 font-semibold tracking-wider text-xs px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 uppercase">
                Inventory
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Dealership Management Kata</p>
          </div>
        </div>

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
              <span>Add Vehicle</span>
            </button>
          )}

          {/* User Auth Profile Badge */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3 pl-2">
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
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200 font-semibold text-sm transition-all"
            >
              <LogIn className="w-4 h-4 text-cyan-400" />
              <span>Sign In</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
