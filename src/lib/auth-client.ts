// client.ts (your existing auth client)
import { createAuthClient } from "better-auth/client";
import { writable } from "svelte/store";

export const authClient = createAuthClient();
export const session = writable(null);

// Sign-in function
export const signIn = async () => {
  const data = await authClient.signIn.social({ provider: "google" });
  console.log(data);
};
