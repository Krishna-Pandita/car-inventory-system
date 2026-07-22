import { describe, it, expect } from 'vitest';
import { cartReducer, CartAction } from '../context/cartLogic'; // Using a pure logic file for tests since Context tests need React Testing Library

describe('Shopping Cart Logic', () => {
  const mockVehicle = {
    id: '123',
    make: 'Toyota',
    model: 'Camry',
    category: 'Sedan',
    price: 25000,
    quantity: 5,
    year: 2024,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  it('should add an item to an empty cart', () => {
    const initialState = [];
    const action: CartAction = { type: 'ADD_ITEM', payload: mockVehicle };
    
    const newState = cartReducer(initialState, action);
    
    expect(newState).toHaveLength(1);
    expect(newState[0].vehicle.id).toBe('123');
    expect(newState[0].count).toBe(1);
  });

  it('should increment quantity if item already exists', () => {
    const initialState = [{ vehicle: mockVehicle, count: 1 }];
    const action: CartAction = { type: 'ADD_ITEM', payload: mockVehicle };
    
    const newState = cartReducer(initialState, action);
    
    expect(newState).toHaveLength(1);
    expect(newState[0].count).toBe(2);
  });

  it('should update quantity manually', () => {
    const initialState = [{ vehicle: mockVehicle, count: 1 }];
    const action: CartAction = { type: 'UPDATE_QUANTITY', payload: { id: '123', count: 5 } };
    
    const newState = cartReducer(initialState, action);
    
    expect(newState[0].count).toBe(5);
  });

  it('should not allow updating quantity below 1', () => {
    const initialState = [{ vehicle: mockVehicle, count: 2 }];
    const action: CartAction = { type: 'UPDATE_QUANTITY', payload: { id: '123', count: 0 } };
    
    const newState = cartReducer(initialState, action);
    
    expect(newState[0].count).toBe(2); // Should ignore the action or cap at 1
  });

  it('should remove an item', () => {
    const initialState = [{ vehicle: mockVehicle, count: 1 }];
    const action: CartAction = { type: 'REMOVE_ITEM', payload: '123' };
    
    const newState = cartReducer(initialState, action);
    
    expect(newState).toHaveLength(0);
  });
});
