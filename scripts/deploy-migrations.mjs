import { createHash, randomUUID } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import pg from 'pg';

const { Client } = pg;
const rawUrl = process.env.DATABASE_URL;
if (!rawUrl) throw new Error('DATABASE_URL must be configured.');

const connectionUrl = new URL(rawUrl);
for (const key of ['sslmode', 'sslaccept', 'sslrootcert', 'sslcert', 'sslkey']) {
  connectionUrl.searchParams.delete(key);
}

const client = new Client({
  connectionString: connectionUrl.toString(),
  ssl: { ca: await readFile(resolve('certs/prod-ca-2021.crt'), 'utf8') },
  connectionTimeoutMillis: 10_000,
});

async function main() {
  await client.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
      "id" VARCHAR(36) NOT NULL PRIMARY KEY,
      "checksum" VARCHAR(64) NOT NULL,
      "finished_at" TIMESTAMPTZ,
      "migration_name" VARCHAR(255) NOT NULL,
      "logs" TEXT,
      "rolled_back_at" TIMESTAMPTZ,
      "started_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
      "applied_steps_count" INTEGER NOT NULL DEFAULT 0
    )
  `);

  const migrationsPath = resolve('prisma/migrations');
  const directories = (await readdir(migrationsPath, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && /^\d{14}_[a-z0-9_]+$/.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  for (const migrationName of directories) {
    const sql = await readFile(join(migrationsPath, migrationName, 'migration.sql'), 'utf8');
    const checksum = createHash('sha256').update(sql).digest('hex');
    const existing = await client.query(
      'SELECT "checksum", "finished_at" FROM "_prisma_migrations" WHERE "migration_name" = $1 ORDER BY "started_at" DESC LIMIT 1',
      [migrationName],
    );
    if (existing.rowCount && existing.rows[0].finished_at) {
      if (existing.rows[0].checksum !== checksum) throw new Error(`Applied migration checksum changed: ${migrationName}`);
      continue;
    }

    await client.query('BEGIN');
    try {
      const migrationId = randomUUID();
      await client.query(
        'INSERT INTO "_prisma_migrations" ("id", "checksum", "migration_name") VALUES ($1, $2, $3)',
        [migrationId, checksum, migrationName],
      );
      await client.query(sql);
      await client.query(
        'UPDATE "_prisma_migrations" SET "finished_at" = now(), "applied_steps_count" = 1 WHERE "id" = $1',
        [migrationId],
      );
      await client.query('COMMIT');
      process.stdout.write(`Applied ${migrationName}\n`);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    }
  }
}

main()
  .catch((error) => {
    const code = typeof error?.code === 'string' ? ` (${error.code})` : '';
    process.stderr.write(`Database migration failed${code}. No migration error details or credentials were printed.\n`);
    process.exitCode = 1;
  })
  .finally(() => client.end().catch(() => {}));
