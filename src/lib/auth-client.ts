// client.ts (your existing auth client)
import { PUBLIC_BETTER_AUTH_URL } from "$env/static/public";
import { createAuthClient } from "better-auth/client";
import { writable } from "svelte/store";

export const authClient = createAuthClient(
  {
    baseURL: PUBLIC_BETTER_AUTH_URL
    // baseURL: dev ? 'http://localhost:5173': 'https://flex-ruddy.vercel.app'// the base url of your auth server
  }
);
// console.log(process.env.BETTER_AUTH_URL as string, " is the ")
export const session = writable(null);

// Sign-in function
export const signIn = async () => {
  const data = await authClient.signIn.social({ provider: "google" });
  console.log(data);
};
