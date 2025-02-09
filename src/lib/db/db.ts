import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Load environment variables (for local development)
import { config } from 'dotenv';
config();

// Get the database URL from environment variables
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables.');
}

// Initialize the PostgreSQL client
const client = postgres(DATABASE_URL);

// Initialize Drizzle ORM
export const db = drizzle(client);