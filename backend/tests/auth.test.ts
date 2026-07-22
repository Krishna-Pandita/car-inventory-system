import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import prisma from '../src/config/prisma';

describe('Auth API (TDD)', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should register a new customer user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'john@example.com',
        password: 'password123',
        name: 'John Doe',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.email).toBe('john@example.com');
    expect(res.body.user.role).toBe('CUSTOMER');
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('should fail registration with duplicate email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'john@example.com',
        password: 'password123',
        name: 'John Duplicate',
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should login an existing user with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('john@example.com');
  });

  it('should reject login with incorrect password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john@example.com',
        password: 'wrongpassword',
      });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});
