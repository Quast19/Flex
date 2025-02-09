import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// Access the environment variable
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables.');
}

// Initialize the PostgreSQL client
const client = postgres(DATABASE_URL);

// Initialize Drizzle ORM
export const db = drizzle(client);