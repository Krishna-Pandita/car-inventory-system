import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Vehicle } from '../types';
import { cartReducer, CartItem } from './cartLogic';

interface CartContextType {
  cart: CartItem[];
  addToCart: (vehicle: Vehicle) => void;
  removeFromCart: (vehicleId: string) => void;
  updateQuantity: (vehicleId: string, count: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const saved = localStorage.getItem('dealership_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('dealership_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (vehicle: Vehicle) => {
    dispatch({ type: 'ADD_ITEM', payload: vehicle });
  };

  const removeFromCart = (vehicleId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: vehicleId });
  };

  const updateQuantity = (vehicleId: string, count: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: vehicleId, count } });
  };

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = cart.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.vehicle.price * item.count, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
