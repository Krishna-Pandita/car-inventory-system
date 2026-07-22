import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import prisma from '../src/config/prisma';

describe('Vehicles API (TDD)', () => {
  let customerToken: string;
  let adminToken: string;
  let vehicleId: string;

  beforeAll(async () => {
    await prisma.vehicle.deleteMany();
    await prisma.user.deleteMany();

    // Create customer and admin users
    const customerRes = await request(app)
      .post('/api/auth/register')
      .send({ email: 'customer@test.com', password: 'password123', name: 'Customer Test', role: 'CUSTOMER' });
    customerToken = customerRes.body.token;

    const adminRes = await request(app)
      .post('/api/auth/register')
      .send({ email: 'admin@test.com', password: 'password123', name: 'Admin Test', role: 'ADMIN' });
    adminToken = adminRes.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should allow adding a vehicle by authenticated admin', async () => {
    const res = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        make: 'Tesla',
        model: 'Model S',
        category: 'Electric',
        price: 89990,
        quantity: 5,
        year: 2024,
        imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399',
        description: 'Luxury electric sedan with incredible acceleration.',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.make).toBe('Tesla');
    expect(res.body.quantity).toBe(5);
    vehicleId = res.body.id;
  });

  it('should list all vehicles for authenticated user', async () => {
    const res = await request(app)
      .get('/api/vehicles')
      .set('Authorization', `Bearer ${customerToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should search vehicles by make, model, category, or price range', async () => {
    // Add another vehicle
    await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        make: 'Porsche',
        model: '911 GT3',
        category: 'Sports',
        price: 182900,
        quantity: 2,
        year: 2024,
      });

    // Search by make
    const makeRes = await request(app)
      .get('/api/vehicles/search?make=Tesla')
      .set('Authorization', `Bearer ${customerToken}`);
    expect(makeRes.status).toBe(200);
    expect(makeRes.body.length).toBe(1);
    expect(makeRes.body[0].make).toBe('Tesla');

    // Search by price range
    const priceRes = await request(app)
      .get('/api/vehicles/search?minPrice=150000&maxPrice=200000')
      .set('Authorization', `Bearer ${customerToken}`);
    expect(priceRes.status).toBe(200);
    expect(priceRes.body.length).toBe(1);
    expect(priceRes.body[0].make).toBe('Porsche');
  });

  it('should update vehicle details', async () => {
    const res = await request(app)
      .put(`/api/vehicles/${vehicleId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        price: 84990,
      });

    expect(res.status).toBe(200);
    expect(res.body.price).toBe(84990);
  });

  it('should prevent non-admin user from deleting a vehicle', async () => {
    const res = await request(app)
      .delete(`/api/vehicles/${vehicleId}`)
      .set('Authorization', `Bearer ${customerToken}`);

    expect(res.status).toBe(403);
  });

  it('should allow admin user to delete a vehicle', async () => {
    const res = await request(app)
      .delete(`/api/vehicles/${vehicleId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});
