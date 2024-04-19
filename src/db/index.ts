import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import "dotenv/config";

const client = postgres(process.env.DATABASE_URL!, { max: 1 });

export const db = drizzle(client);