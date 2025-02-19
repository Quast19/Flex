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
    //console.log(session, "is the session");
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  //  Ensure userId is defined and a valid string
  if (!userId) {
    return json({ error: "User ID is required" }, { status: 400 });
  }
  //console.log(userId, " is the user Id");
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


export const POST: RequestHandler = async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !session.user.id) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    try {
        const body = await request.json();
        const {
            codeforcesHandle,
            leetCodeHandle,
            githubHandle,
            twitterHandle,
            linkedinHandle,
            bio
        } = body;

        // Get current timestamp
        const now = new Date();

        // Check if profile already exists
        const existingProfile = await db
            .select()
            .from(profile)
            .where(eq(profile.userId, userId))
            .limit(1);

        if (existingProfile.length > 0) {
            // Update existing profile
            await db
                .update(profile)
                .set({
                    codeforcesHandle,
                    leetCodeHandle,
                    githubHandle,
                    twitterHandle,
                    linkedinHandle,
                    bio,
                    updatedAt: now
                })
                .where(eq(profile.userId, userId));

            return json({ success: true, message: "Profile updated" });
        }

        // Insert new profile
        await db.insert(profile).values({
            userId,
            codeforcesHandle,
            leetCodeHandle,
            githubHandle,
            twitterHandle,
            linkedinHandle,
            bio,
            createdAt: now,
            updatedAt: now
        });

        return json({ success: true, message: "Profile created" });

    } catch (error) {
        console.error("Error processing profile:", error);
        return json({ error: "Internal server error" }, { status: 500 });
    }
};
