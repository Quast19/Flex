// src/stores/platformStatsStore.ts
import { writable, derived } from 'svelte/store';
import type { UserInfoResponse as CodeforcesResponse } from '../components/codeforcesProfiles/profileBuilder.types';
import type { CodechefResponse } from '../components/codeforcesProfiles/profileBuilder.types';
import type { LeetcodeResponse } from '../components/codeforcesProfiles/profileBuilder.types';
import type { GitHubResponse } from '../components/codeforcesProfiles/profileBuilder.types';
import githubsvg from '$lib/images/github.svg'
// 1. Codeforces
export const apiResultCodeforces = writable<CodeforcesResponse | null>(null);
export const apiErrorCodeforces = writable<string | null>(null);

export const userRatingCodeforces = derived(apiResultCodeforces, ($result) =>
	$result?.result[0]?.rating ?? null
);
export const maxRatingCodeforces = derived(apiResultCodeforces, ($result) =>
	$result?.result[0]?.maxRating ?? null
);

export async function fetchUserDataCodeforces(handle: string) {
	try {
		const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
		const data: CodeforcesResponse = await response.json();
		apiResultCodeforces.set(data);
		apiErrorCodeforces.set(null);
	} catch (error) {
		apiErrorCodeforces.set(error instanceof Error ? error.message : 'Unknown error');
		apiResultCodeforces.set(null);
	}
}

// 2. Codechef
export const apiResultCodechef = writable<CodechefResponse | null>(null);
export const apiErrorCodechef = writable<string | null>(null);

export const userRatingCodechef = derived(apiResultCodechef, ($result) =>
	$result?.currentRating ?? null
);
export const maxRatingCodechef = derived(apiResultCodechef, ($result) =>
	$result?.highestRating ?? null
);

export async function fetchUserDataCodechef(handle: string) {
	try {
		const response = await fetch(`https://codechef-api.vercel.app/handle/${handle}`);
		const data: CodechefResponse = await response.json();
		apiResultCodechef.set(data);
		apiErrorCodechef.set(null);
	} catch (error) {
		apiErrorCodechef.set(error instanceof Error ? error.message : 'Unknown error');
		apiResultCodechef.set(null);
	}
}

// 3. LeetCode
export const apiResultLeetCode = writable<LeetcodeResponse | null>(null);
export const apiErrorLeetCode = writable<string | null>(null);

export const userRatingLeetCode = derived(apiResultLeetCode, ($result) =>
	$result?.totalSolved ?? null
);
export const maxRatingLeetCode = derived(apiResultLeetCode, ($result) =>
	$result?.ranking ?? null
);

export async function fetchUserDataLeetCode(handle: string) {
	try {
		const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${handle}`);
		const data: LeetcodeResponse = await response.json();
		apiResultLeetCode.set(data);
		apiErrorLeetCode.set(null);
	} catch (error) {
		apiErrorLeetCode.set(error instanceof Error ? error.message : 'Unknown error');
		apiResultLeetCode.set(null);
	}
}

// 4. GitHub (example: public repo count or followers)
export const apiResultGitHub = writable<GitHubResponse | null>(null);
export const apiErrorGitHub = writable<string | null>(null);

export const githubFollowers = derived(apiResultGitHub, ($result) =>
	$result?.followers ?? null
);
export const githubPublicRepos = derived(apiResultGitHub, ($result) =>
	$result?.public_repos ?? null
);

export async function fetchUserDataGitHub(handle: string) {
	try {
		const response = await fetch(`https://api.github.com/users/${handle}`, {
			headers: {
				Accept: 'application/vnd.github.v3+json',
			},
		});
		if (!response.ok) throw new Error('GitHub API error: ' + response.status);
		const data: GitHubResponse = await response.json();
		apiResultGitHub.set(data);
		apiErrorGitHub.set(null);
	} catch (error) {
		apiErrorGitHub.set(error instanceof Error ? error.message : 'Unknown error');
		apiResultGitHub.set(null);
	}
}
export const combinedPlatforms = derived(
	[
		userRatingCodeforces,
		maxRatingCodeforces,
		userRatingCodechef,
		maxRatingCodechef,
		userRatingLeetCode,
		maxRatingLeetCode,
		githubFollowers,
		githubPublicRepos

	],
	([
		$userRatingCodeforces,
		$maxRatingCodeforces,
		$userRatingCodechef,
		$maxRatingCodechef,
		$userRatingLeetCode,
		$maxRatingLeetCode,
		$githubFollowers,
		$githubPublicRepos
	]) => [
			{
			image: './CodeforcesLogo.svg',
			key: 'codeforcesHandle',
			name: 'Codeforces',
			description: 'Get Codeforces statistics after entering the handle.',
			placeholder: 'Codeforces Handle',
			showRating: true,
			maxRating: $maxRatingCodeforces,
			userRating: $userRatingCodeforces,
			firstTag: 'Max Rating',
			secondTag: 'User Rating'
		},
			{
			image: "./LeetCode.png",
			key: 'leetCodeHandle',
			name: 'LeetCode',
			description: 'Get LeetCode statistics after entering the handle.',
			placeholder: 'LeetCode Handle',
			showRating: true,
			maxRating: $maxRatingLeetCode,
			userRating: $userRatingLeetCode,
			firstTag: 'Ranking',
			secondTag: 'Total Solved'
		},
			{
			image:'CodechefLogo.svg',
			key: 'codechefHandle',
			name: 'CodeChef',
			description: 'Get CodeChef statistics after entering the handle.',
			placeholder: 'CodeChef Handle',
			showRating: true,
			maxRating: $maxRatingCodechef,
			userRating: $userRatingCodechef,
			firstTag: 'Max Rating',
			secondTag: 'User Rating'
		},
			{
			image: githubsvg,
			key: 'githubHandle',
			name: 'GitHub',
			description: 'Get GitHub statistics after entering the username.',
			placeholder: 'GitHub Username',
			showRating: true,
			maxRating: $githubFollowers,
			userRating: $githubPublicRepos,
			firstTag: 'Followers',
			secondTag: 'Repo Count'
		}
	]
);
