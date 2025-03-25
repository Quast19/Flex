import type { PageServerLoad } from "./$types";
import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db"; // Your Drizzle DB instance
import { profile } from "$lib/server/db/schema"; // Your schema
import { eq } from "drizzle-orm"; // Import the equality operator
//import { auth } from '../../../lib/auth'
export const load: PageServerLoad = async ({params}) => {
    const userId = params.userid;
    //console.log(userId);\
    let data;
    try {
        // Fetch profile by user ID
        const userProfile = await db
          .select()
          .from(profile)
          .where(eq(profile.userId, userId)) // Use 'eq()' for correct query
          .limit(1);
        
        console.log(userProfile, " This is User Profile");
        if (userProfile.length === 0) {
          return json({ error: "Profile not found" }, { status: 404 });
        }
        if (userProfile.length > 0 && userProfile[0].codeforcesHandle != null) {
            const response = await fetch(`https://codeforces.com/api/user.info?handles=${userProfile[0].codeforcesHandle}`);
            data =  await response.json();
            console.log(data);
            return data;
        }
        //return json(userProfile[0]); // Return the first result
      } catch (error) {
        console.error("Error fetching profile:", error);
        return json({ error: "Internal server error" }, { status: 500 });
      }
    return data;
    //crypto.randomUUID()
};

