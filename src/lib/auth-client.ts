// client.ts (your existing auth client)
import { createAuthClient } from "better-auth/client";
import { writable } from "svelte/store";

export const authClient = createAuthClient(
  {
    baseURL: 'https://super-duper-system-rvqqp5j4qppcgq4-5173.app.github.dev' // the base url of your auth server
  }
);
export const session = writable(null);

// Sign-in function
export const signIn = async () => {
  const data = await authClient.signIn.social({ provider: "google" });
  console.log(data);
};
