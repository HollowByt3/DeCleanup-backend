import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';

config();

export default {
    schema: './src/db/schema.ts',
    out: './drizzle',
    dialect: "postgresql",
    dbCredentials: {
        url: process.env["DATABASE_URL"] ||  "postgresql://postgres:postgres@localhost:5432/postgres",    },
    verbose: true,
    strict: true,
} satisfies Config; 