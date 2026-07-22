import axios from 'axios';
import { User, Vehicle, VehicleFilters, AuthResponse } from '../types';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (data: { email: string; password: string; name: string; role?: string }): Promise<AuthResponse> => {
    const res = await api.post('/auth/register', data);
    return res.data;
  },
  login: async (data: { email: string; password: string }): Promise<AuthResponse> => {
    const res = await api.post('/auth/login', data);
    return res.data;
  },
};

export const vehiclesAPI = {
  getAll: async (): Promise<Vehicle[]> => {
    const res = await api.get('/vehicles');
    return res.data;
  },
  search: async (filters: VehicleFilters): Promise<Vehicle[]> => {
    const params: Record<string, any> = {};
    if (filters.make) params.make = filters.make;
    if (filters.model) params.model = filters.model;
    if (filters.category) params.category = filters.category;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;

    const res = await api.get('/vehicles/search', { params });
    return res.data;
  },
  create: async (data: Partial<Vehicle>): Promise<Vehicle> => {
    const res = await api.post('/vehicles', data);
    return res.data;
  },
  update: async (id: string, data: Partial<Vehicle>): Promise<Vehicle> => {
    const res = await api.put(`/vehicles/${id}`, data);
    return res.data;
  },
  delete: async (id: string): Promise<{ message: string }> => {
    const res = await api.delete(`/vehicles/${id}`);
    return res.data;
  },
};

export const inventoryAPI = {
  purchase: async (id: string): Promise<{ message: string; vehicle: Vehicle }> => {
    const res = await api.post(`/vehicles/${id}/purchase`);
    return res.data;
  },
  restock: async (id: string, count: number): Promise<{ message: string; vehicle: Vehicle }> => {
    const res = await api.post(`/vehicles/${id}/restock`, { count });
    return res.data;
  },
};

export default api;
