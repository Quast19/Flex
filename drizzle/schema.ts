import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Define the "account" table
export const account = pgTable("account", {
  id: text().primaryKey().notNull(),
  account_id: text().notNull(),
  provider_id: text().notNull(),
  user_id: text().notNull(),
  access_token: text(),
  refresh_token: text(),
  id_token: text(),
  access_token_expires_at: timestamp(),
  refresh_token_expires_at: timestamp(),
  scope: text(),
  password: text(),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
});

// Define the "session" table
export const session = pgTable("session", {
  id: text().primaryKey().notNull(),
  expires_at: timestamp().notNull(),
  token: text().notNull().unique(),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
  ip_address: text(),
  user_agent: text(),
  user_id: text().notNull(),
});

// Define the "user" table
export const user = pgTable("user", {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  email: text().notNull().unique(),
  email_verified: boolean().notNull(),
  image: text(),
  created_at: timestamp().notNull(),
  updated_at: timestamp().notNull(),
});

// Define the "verification" table
export const verification = pgTable("verification", {
  id: text().primaryKey().notNull(),
  identifier: text().notNull(),
  value: text().notNull(),
  expires_at: timestamp().notNull(),
  created_at: timestamp(),
  updated_at: timestamp(),
});
