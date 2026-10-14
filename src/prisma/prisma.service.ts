import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const rawUrl = process.env.DATABASE_URL;
    if (!rawUrl) throw new Error('DATABASE_URL must be configured.');

    const connectionUrl = new URL(rawUrl);
    for (const key of ['sslmode', 'sslrootcert', 'sslcert', 'sslkey']) {
      connectionUrl.searchParams.delete(key);
    }

    const adapter = new PrismaPg({
      connectionString: connectionUrl.toString(),
      ssl: { ca: readFileSync(resolve(process.cwd(), 'certs/prod-ca-2021.crt'), 'utf8') },
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
