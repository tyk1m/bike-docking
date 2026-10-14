import 'reflect-metadata';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const connectionUrl = new URL(process.env.DATABASE_URL ?? '');
for (const key of ['sslmode', 'sslrootcert', 'sslcert', 'sslkey']) {
  connectionUrl.searchParams.delete(key);
}

const adapter = new PrismaPg({
  connectionString: connectionUrl.toString(),
  ssl: { ca: readFileSync(resolve(process.cwd(), 'certs/prod-ca-2021.crt'), 'utf8') },
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const bikes = [
    { id: 'BD-001', name: 'Bike #BD-001', type: 'City Bike', station: 'JKUAT Main Gate', price: 50, image: '/images/BD-001.jpg' },
    { id: 'BD-002', name: 'Bike #BD-002', type: 'Mountain Bike', station: 'Gate B Station', price: 70, image: '/images/BD-002.jpg' },
    { id: 'BD-003', name: 'Bike #BD-003', type: 'City Bike', station: 'Juja Mall', price: 50, image: '/images/BD-003.jpg' },
  ];

  for (const bike of bikes) {
    await prisma.bike.upsert({
      where: { id: bike.id },
      update: { name: bike.name, type: bike.type, station: bike.station, price: bike.price, image: bike.image },
      create: bike,
    });
  }
}

main()
  .catch((error: unknown) => {
    process.stderr.write(`Database seed failed: ${error instanceof Error ? error.message : 'unknown error'}\n`);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
