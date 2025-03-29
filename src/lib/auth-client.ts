// client.ts (your existing auth client)
// import { dev } from "$app/environment";
import type { Session } from "better-auth";
import { createAuthClient } from "better-auth/client";
import { writable, type Writable } from "svelte/store";
export const authClient = createAuthClient(
  {
    baseURL: 'http://localhost:5173/'// the base url of your auth server
  }
);
// console.log(process.env.BETTER_AUTH_URL as string, " is the ")
export const session: Writable<Session | null> = writable(null);

// Fetch and update session on startup
const fetchSession = async () => {
  const userSession = await authClient.getSession();
  if(userSession.data != undefined && userSession.data.session)
  session.set(userSession.data.session);
};
fetchSession(); // Ensure session is populated on app load
// Sign-in function
export const signIn = async () => {
  const data = writable(await authClient.signIn.social({ provider: "google" }));
  // console.log(data);
  return {data};
};
