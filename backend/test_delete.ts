import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  await prisma.vehicle.deleteMany({ where: { make: 'Test' } });
}
run();
