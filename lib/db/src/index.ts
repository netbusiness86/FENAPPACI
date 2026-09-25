import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

// Netlify Database provides NETLIFY_DB_URL; DATABASE_URL is kept for local/other environments.
const connectionString = process.env.DATABASE_URL ?? process.env.NETLIFY_DB_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL or NETLIFY_DB_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });

export * from "./schema";
