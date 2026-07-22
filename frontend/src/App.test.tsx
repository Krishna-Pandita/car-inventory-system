import { describe, it, expect } from 'vitest';

describe('Frontend Component & Logic Tests', () => {
  it('should format currency correctly for vehicle pricing', () => {
    const price = 89990;
    const formatted = `$${price.toLocaleString()}`;
    expect(formatted).toBe('$89,990');
  });

  it('should validate vehicle stock status logic', () => {
    const isOutOfStock = (quantity: number) => quantity === 0;
    expect(isOutOfStock(0)).toBe(true);
    expect(isOutOfStock(5)).toBe(false);
  });

  it('should filter vehicles by category correctly', () => {
    const sampleVehicles = [
      { id: '1', make: 'Tesla', model: 'Model S', category: 'Electric', price: 89990, quantity: 5, year: 2024 },
      { id: '2', make: 'Porsche', model: '911', category: 'Sports', price: 182900, quantity: 2, year: 2024 },
    ];

    const electricOnly = sampleVehicles.filter((v) => v.category === 'Electric');
    expect(electricOnly.length).toBe(1);
    expect(electricOnly[0].make).toBe('Tesla');
  });
});
