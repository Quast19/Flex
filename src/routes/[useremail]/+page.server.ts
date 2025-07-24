import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { profile, user } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { GitHubResponse, UserInfoResponse } from "$lib/components/codeforcesProfiles/profileBuilder.types";
import { error } from "@sveltejs/kit";


export const load: PageServerLoad = async ({ params }) => {
    let useremail = params.useremail;
    useremail += "@gmail.com";
    console.log(useremail);
    let userId = '1';
    let userName = 'foobar';
    try {
        let userRecord = await db.select().from(user).where(eq(user.email, useremail)).limit(1);
        if (userRecord.length === 0) {
            useremail = useremail.replace('@gmail.com', '');
            userRecord = await db.select().from(user).where(eq(user.id, useremail)).limit(1);
        }
        if (userRecord.length === 0) {
            console.log(userRecord, " sikandar");
            error(404, "User not found");
        }
        userId = userRecord[0].id; 
        userName = userRecord[0].name;
        const userProfile = await db
            .select()
            .from(profile)
            .where(eq(profile.userId, userId))
            .limit(1);

        if (userProfile.length === 0) {
            error(500, "Profile not found for the user");
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

        const [codeforcesData, codeforcesRatings, codeforcesSubmissions,  githubData, githubRepos, leetcodeData] = results.map(r =>
            r.status === "fulfilled" ? r.value : null
        );

        return {
            platformData: {
                codeforces: codeforcesData as UserInfoResponse | null,
                codeforcesRating: codeforcesRatings,
                codeforcesSub: codeforcesSubmissions,
                github: githubData as GitHubResponse | null,
                githubRepos: githubRepos,
                leetcode: leetcodeData ?? "No data",
                codeforcesHandle: profileData.codeforcesHandle,
                leetCodeHandle: profileData.leetCodeHandle,
                githubHandle: profileData.githubHandle,
                userName: userName,
            },
            socialHandles: {
                twitter: profileData.twitterHandle ?? null,
                linkedin: profileData.linkedinHandle ?? null
            }
        };
    } catch (error) {
        console.error("Error fetching platform data:", error);
        throw error;
    }
};
