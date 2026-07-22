import { Vehicle } from '../types';

export interface CartItem {
  vehicle: Vehicle;
  count: number;
}

export type CartAction = 
  | { type: 'ADD_ITEM'; payload: Vehicle }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; count: number } }
  | { type: 'CLEAR_CART' };

export const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(item => item.vehicle.id === action.payload.id);
      if (existing) {
        return state.map(item =>
          item.vehicle.id === action.payload.id
            ? { ...item, count: item.count + 1 }
            : item
        );
      }
      return [...state, { vehicle: action.payload, count: 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter(item => item.vehicle.id !== action.payload);
    case 'UPDATE_QUANTITY':
      if (action.payload.count < 1) return state;
      return state.map(item =>
        item.vehicle.id === action.payload.id ? { ...item, count: action.payload.count } : item
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};
