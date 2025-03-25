import { json, type RequestHandler } from "@sveltejs/kit";
import { db } from "../../../lib/server/db";
import { profile } from "../../../lib/server/db/schema"; // Your schema
import { eq } from "drizzle-orm"; // Import the equality operator
import { auth } from '../../../lib/auth'

export const GET: RequestHandler = async ({ locals  }) => {
  const session = locals.auth; // Extract session from BetterAuth

    if (!session) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }

    return json({ user: session.user });
    //return json({ user: session.user });
};