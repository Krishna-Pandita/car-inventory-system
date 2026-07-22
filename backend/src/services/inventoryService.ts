import prisma from '../config/prisma';

export const purchaseVehicle = async (id: string) => {
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle) {
    throw new Error('Vehicle not found');
  }

  if (vehicle.quantity <= 0) {
    throw new Error('Vehicle is out of stock');
  }

  const updated = await prisma.vehicle.update({
    where: { id },
    data: {
      quantity: vehicle.quantity - 1,
    },
  });

  return { message: 'Vehicle purchased successfully', vehicle: updated };
};

export const restockVehicle = async (id: string, count: number = 1) => {
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle) {
    throw new Error('Vehicle not found');
  }

  const incrementAmount = Math.max(1, Number(count) || 1);

  const updated = await prisma.vehicle.update({
    where: { id },
    data: {
      quantity: vehicle.quantity + incrementAmount,
    },
  });

  return { message: 'Vehicle restocked successfully', vehicle: updated };
};
