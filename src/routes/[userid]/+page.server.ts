import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { profile } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async ({ params }) => {
    const userId = params.userid;

    try {
        const userProfile = await db
            .select()
            .from(profile)
            .where(eq(profile.userId, userId))
            .limit(1);

        if (userProfile.length === 0) {
            return { error: "Profile not found" };
        }

        const profileData = userProfile[0];

        const results = await Promise.allSettled([
            profileData.codeforcesHandle
                ? fetch(`https://codeforces.com/api/user.info?handles=${profileData.codeforcesHandle}`).then(r => r.json())
                : Promise.resolve(null),

            profileData.codechefHandle
                ? fetch(`https://codechef-api.vercel.app/handle/${profileData.codechefHandle}`).then(r => r.json())
                : Promise.resolve(null),

            profileData.githubHandle
                ? fetch(`https://api.github.com/users/${profileData.githubHandle}`).then(r => r.json())
                : Promise.resolve(null),

            profileData.leetCodeHandle
                ? fetch("https://leetcode.com/graphql", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        query: `
                          {
                            userContestRanking(username: "${profileData.leetCodeHandle}") {
                              attendedContestsCount
                              rating
                              globalRanking
                              totalParticipants
                              topPercentage    
                            }
                            userContestRankingHistory(username: "${profileData.leetCodeHandle}") {
                              attended
                              trendDirection
                              problemsSolved
                              totalProblems
                              finishTimeInSeconds
                              rating
                              ranking
                              contest {
                                title
                                startTime
                              }
                            }
                          }
                        `
                    })
                }).then(r => r.json())
                : Promise.resolve(null)
        ]);

        const [codeforcesData, codechefData, githubData, leetcodeData] = results.map(r =>
            r.status === "fulfilled" ? r.value : null
        );

        return {
            platformData: {
                codeforces: codeforcesData?.result?.[0] ?? null,
                codechef: codechefData ?? null,
                github: githubData ?? null,
                leetcode: leetcodeData?.data ?? null
            },
            socialHandles: {
                twitter: profileData.twitterHandle ?? null,
                linkedin: profileData.linkedinHandle ?? null
            }
        };
    } catch (error) {
        console.error("Error fetching platform data:", error);
        return { error: "Internal server error" };
    }
};
