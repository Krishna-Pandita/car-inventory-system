import { Request, Response } from 'express';
import {
  createVehicle,
  getAllVehicles,
  searchVehicles,
  updateVehicle,
  deleteVehicle,
} from '../services/vehicleService';

export const create = async (req: Request, res: Response) => {
  try {
    const { make, model, category, price, quantity, year, imageUrl, description } = req.body;
    if (!make || !model || !category || price === undefined) {
      return res.status(400).json({ error: 'Make, model, category, and price are required' });
    }

    const vehicle = await createVehicle({ make, model, category, price, quantity, year, imageUrl, description });
    return res.status(201).json(vehicle);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || 'Failed to add vehicle' });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const vehicles = await getAllVehicles();
    return res.status(200).json(vehicles);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to fetch vehicles' });
  }
};

export const search = async (req: Request, res: Response) => {
  try {
    const { make, model, category, minPrice, maxPrice } = req.query;
    const query = {
      make: make ? String(make) : undefined,
      model: model ? String(model) : undefined,
      category: category ? String(category) : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    };

    const vehicles = await searchVehicles(query);
    return res.status(200).json(vehicles);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Search failed' });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await updateVehicle(id, req.body);
    return res.status(200).json(vehicle);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || 'Failed to update vehicle' });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteVehicle(id);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || 'Failed to delete vehicle' });
  }
};
