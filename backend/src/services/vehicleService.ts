import prisma from '../config/prisma';

export interface VehicleDTO {
  make: string;
  model: string;
  category: string;
  price: number;
  quantity?: number;
  year?: number;
  imageUrl?: string;
  description?: string;
}

export interface SearchQuery {
  make?: string;
  model?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const createVehicle = async (data: VehicleDTO) => {
  return await prisma.vehicle.create({
    data: {
      make: data.make,
      model: data.model,
      category: data.category,
      price: Number(data.price),
      quantity: data.quantity !== undefined ? Number(data.quantity) : 0,
      year: data.year ? Number(data.year) : 2024,
      imageUrl: data.imageUrl || null,
      description: data.description || null,
    },
  });
};

export const getAllVehicles = async () => {
  return await prisma.vehicle.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const searchVehicles = async (query: SearchQuery) => {
  const where: any = {};

  if (query.make) {
    where.make = { contains: query.make };
  }
  if (query.model) {
    where.model = { contains: query.model };
  }
  if (query.category) {
    where.category = { contains: query.category };
  }
  if (query.minPrice !== undefined || query.maxPrice !== undefined) {
    where.price = {};
    if (query.minPrice !== undefined) {
      where.price.gte = Number(query.minPrice);
    }
    if (query.maxPrice !== undefined) {
      where.price.lte = Number(query.maxPrice);
    }
  }

  return await prisma.vehicle.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
};

export const updateVehicle = async (id: string, data: Partial<VehicleDTO>) => {
  const existing = await prisma.vehicle.findUnique({ where: { id } });
  if (!existing) {
    throw new Error('Vehicle not found');
  }

  const updateData: any = {};
  if (data.make !== undefined) updateData.make = data.make;
  if (data.model !== undefined) updateData.model = data.model;
  if (data.category !== undefined) updateData.category = data.category;
  if (data.price !== undefined) updateData.price = Number(data.price);
  if (data.quantity !== undefined) updateData.quantity = Number(data.quantity);
  if (data.year !== undefined) updateData.year = Number(data.year);
  if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
  if (data.description !== undefined) updateData.description = data.description;

  return await prisma.vehicle.update({
    where: { id },
    data: updateData,
  });
};

export const deleteVehicle = async (id: string) => {
  const existing = await prisma.vehicle.findUnique({ where: { id } });
  if (!existing) {
    throw new Error('Vehicle not found');
  }

  await prisma.vehicle.delete({ where: { id } });
  return { message: 'Vehicle deleted successfully' };
};
