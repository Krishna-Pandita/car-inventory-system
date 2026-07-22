import { Request, Response } from 'express';
import { purchaseVehicle, restockVehicle } from '../services/inventoryService';

export const purchase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await purchaseVehicle(id);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || 'Purchase failed' });
  }
};

export const restock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { count } = req.body;
    const result = await restockVehicle(id, count);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || 'Restock failed' });
  }
};
