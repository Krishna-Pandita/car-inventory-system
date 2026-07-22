import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Car Dealership database...');

  // Clean old data
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const customerPassword = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@dealership.com',
      password: adminPassword,
      name: 'Sarah Connor (Dealership Manager)',
      role: 'ADMIN',
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: 'customer@dealership.com',
      password: customerPassword,
      name: 'Alex Mercer (Buyer)',
      role: 'CUSTOMER',
    },
  });

  console.log(`👤 Created Users: Admin (${admin.email}), Customer (${customer.email})`);

  // Create Vehicles
  const vehicles = [
    {
      make: 'Tesla',
      model: 'Model S Plaid',
      category: 'Electric',
      price: 89990,
      quantity: 4,
      year: 2024,
      imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
      description: 'Tri-Motor All-Wheel Drive, 1,020 hp, 0-60 mph in 1.99 seconds with vectoring control.',
    },
    {
      make: 'Porsche',
      model: '911 GT3 RS',
      category: 'Sports',
      price: 241300,
      quantity: 2,
      year: 2024,
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      description: 'Naturally aspirated 4.0-liter 6-cylinder engine delivering motorsport performance.',
    },
    {
      make: 'BMW',
      model: 'M4 Competition xDrive',
      category: 'Sports',
      price: 86300,
      quantity: 5,
      year: 2024,
      imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
      description: 'M TwinPower Turbo inline 6-cylinder engine with 503 hp and M xDrive precision.',
    },
    {
      make: 'Audi',
      model: 'RS e-tron GT',
      category: 'Electric',
      price: 147500,
      quantity: 3,
      year: 2024,
      imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
      description: 'Pure electric grand tourer with dual synchronous electric motors and carbon roof.',
    },
    {
      make: 'Mercedes-AMG',
      model: 'G 63 SUV',
      category: 'Luxury',
      price: 179000,
      quantity: 1,
      year: 2024,
      imageUrl: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=800&q=80',
      description: 'Handcrafted AMG 4.0L V8 biturbo engine with iconic design and off-road dominance.',
    },
    {
      make: 'Rivian',
      model: 'R1T Adventure',
      category: 'Truck',
      price: 79000,
      quantity: 0, // Out of stock demo!
      year: 2024,
      imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      description: 'Quad-Motor all-wheel drive, zero emissions, built for extreme off-road adventures.',
    },
  ];

  for (const v of vehicles) {
    await prisma.vehicle.create({ data: v });
  }

  console.log(`🚗 Seeded ${vehicles.length} realistic vehicles into inventory.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
