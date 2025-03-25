// client.ts (your existing auth client)
// import { dev } from "$app/environment";
import { createAuthClient } from "better-auth/client";
import { writable } from "svelte/store";

export const authClient = createAuthClient(
  {
    baseURL: 'https://flex-ruddy.vercel.app'// the base url of your auth server
  }
);
// console.log(process.env.BETTER_AUTH_URL as string, " is the ")
export const session = writable(null);

// Sign-in function
export const signIn = async () => {
  const data = writable(await authClient.signIn.social({ provider: "google" }));
  // console.log(data);
  return data;
};
