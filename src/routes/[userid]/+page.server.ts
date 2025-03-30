import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db"; // Your Drizzle DB instance
import { profile } from "$lib/server/db/schema"; // Your schema
import { eq } from "drizzle-orm"; // Import the equality operator

export const load: PageServerLoad = async ({ params }) => {
    const userId = params.userid;
    let data;

    try {
        // Fetch profile by user ID
        const userProfile = await db
            .select()
            .from(profile)
            .where(eq(profile.userId, userId))
            .limit(1);

        console.log(userId, " is the user Id");
        console.log(userProfile, " This is User Profile");

        if (userProfile.length === 0) {
            return { error: "Profile not found" }; // ✅ Plain object
        }

        if (userProfile.length > 0 && userProfile[0].codeforcesHandle != null) {
            const response = await fetch(
                `https://codeforces.com/api/user.info?handles=${userProfile[0].codeforcesHandle}`
            );
            data = await response.json();
            console.log(data);
            return { data };
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
        return { error: "Internal server error" }; // ✅ Plain object
    }

    return { data };
};
