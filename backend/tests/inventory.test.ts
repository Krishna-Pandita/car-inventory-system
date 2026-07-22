import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import prisma from '../src/config/prisma';

describe('Inventory API (TDD)', () => {
  let customerToken: string;
  let adminToken: string;
  let testVehicleId: string;

  beforeAll(async () => {
    await prisma.vehicle.deleteMany();
    await prisma.user.deleteMany();

    const customerRes = await request(app)
      .post('/api/auth/register')
      .send({ email: 'buyer@test.com', password: 'password123', name: 'Buyer Test', role: 'CUSTOMER' });
    customerToken = customerRes.body.token;

    const adminRes = await request(app)
      .post('/api/auth/register')
      .send({ email: 'manager@test.com', password: 'password123', name: 'Manager Test', role: 'ADMIN' });
    adminToken = adminRes.body.token;

    const vRes = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        make: 'BMW',
        model: 'M4 Competition',
        category: 'Sports',
        price: 79100,
        quantity: 1, // Only 1 stock
        year: 2024,
      });

    testVehicleId = vRes.body.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should decrease quantity upon purchase', async () => {
    const res = await request(app)
      .post(`/api/vehicles/${testVehicleId}/purchase`)
      .set('Authorization', `Bearer ${customerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.vehicle.quantity).toBe(0);
  });

  it('should reject purchase when vehicle is out of stock (quantity 0)', async () => {
    const res = await request(app)
      .post(`/api/vehicles/${testVehicleId}/purchase`)
      .set('Authorization', `Bearer ${customerToken}`);

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/out of stock/i);
  });

  it('should reject restock attempt by non-admin customer', async () => {
    const res = await request(app)
      .post(`/api/vehicles/${testVehicleId}/restock`)
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ count: 5 });

    expect(res.status).toBe(403);
  });

  it('should allow admin to restock vehicle', async () => {
    const res = await request(app)
      .post(`/api/vehicles/${testVehicleId}/restock`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ count: 5 });

    expect(res.status).toBe(200);
    expect(res.body.vehicle.quantity).toBe(5);
  });
});
