import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from "./schema";
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import "dotenv/config";

const client = postgres(process.env.DATABASE_URL!, { max: 1 });

const db = drizzle(client);

async function main() {
    console.log("migration started ...")
    await migrate(db, { migrationsFolder: "drizzle" })
    console.log("migration completed ...")
    process.exit(0);
}

main().catch((error) => {
    console.error(error)
    process.exit(0)
})