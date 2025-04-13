import { json, type RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/server/db"; // Your Drizzle DB instance
import { profile } from "$lib/server/db/schema"; // Your schema
import { eq } from "drizzle-orm"; // Import the equality operator
import { auth } from '../../../lib/auth'

export const GET: RequestHandler = async ({ request  }) => {
  const session = await auth.api.getSession({
      headers: request.headers,
      });

  if (!session || !session.user.id) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  //  Ensure userId is defined and a valid string
  if (!userId) {
    return json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    // Fetch profile by user ID
    const userProfile = await db
      .select()
      .from(profile)
      .where(eq(profile.userId, userId)) // Use 'eq()' for correct query
      .limit(1);

    if (userProfile.length === 0) {
      return json({ error: "Profile not found" }, { status: 404 });
    }
    return json(userProfile[0]); // Return the first result
  } catch (error) {
    console.error("Error fetching profile:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
};
