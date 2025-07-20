import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { profile } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { GitHubResponse, UserInfoResponse } from "$lib/components/codeforcesProfiles/profileBuilder.types";


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
            
            profileData.codeforcesHandle
            ? fetch(`https://codeforces.com/api/user.rating?handle=${profileData.codeforcesHandle}`).then(r => r.json())
            : Promise.resolve(null),


            profileData.codeforcesHandle
                ? fetch(`https://codeforces.com/api/user.status?handle=${profileData.codeforcesHandle}&verdict=ok`).then(r => r.json())
                : Promise.resolve(null),

            profileData.githubHandle
                ? fetch(`https://api.github.com/users/${profileData.githubHandle}`).then(r => r.json())
                : Promise.resolve(null),

            profileData.githubHandle
                ? fetch(`https://api.github.com/users/${profileData.githubHandle}/repos`).then(r => r.json())
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
                        matchedUser(username: "${profileData.leetCodeHandle}") {
                            submitStats {
                                acSubmissionNum {
                                difficulty
                                count
                                submissions
                                }
                            }
                            badges {
                                id
                                displayName
                                icon
                                creationDate
                            }
                            problemsSolvedBeatsStats { 
                                difficulty
                                percentage    
                            }
                            submitStatsGlobal{
                                acSubmissionNum{
                                    difficulty
                                    count
                                }
                            }
                        }
                            allQuestionsCount {    
                            difficulty    
                            count  
                            }
                    }`
                })
            }).then(r => r.json())
            : Promise.resolve(null)
        ]);

        const [codeforcesData, codeforcesRatings, codeforcesSubmissions, githubData, githubRepos, leetcodeData] = results.map(r =>
            r.status === "fulfilled" ? r.value : null
        );

        return {
            platformData: {
                codeforces: codeforcesData as UserInfoResponse | null,
                codeforcesSub: codeforcesSubmissions,
                codeforcesRating: codeforcesRatings,
                github: githubData as GitHubResponse | null,
                githubRepos: githubRepos,
                leetcode: leetcodeData ?? "No data",
                codeforcesHandle: profileData.codeforcesHandle,
                codechefHandle: profileData.codechefHandle,
                leetCodeHandle: profileData.leetCodeHandle,
                githubHandle: profileData.githubHandle
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
