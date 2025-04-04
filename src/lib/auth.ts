import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./server/db"; // your drizzle instance
import * as schema from '../lib/server/db/schema';
import { env } from "$env/dynamic/private";


export const auth = betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg", // or "mysql", "sqlite"
      schema: {
        ...schema
      }
    }),
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    },
    trustedOrigins: env.ALLOWED_ORIGINS?.split(",") || [],
  });
  