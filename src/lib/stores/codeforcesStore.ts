import { writable, derived } from 'svelte/store';
import type { UserInfoResponse} from '../components/codeforcesProfile.types';

// Declare stores
export const apiResult = writable<UserInfoResponse | null>(null);
export const apiError = writable<string | null>(null);

// Derived store to compute user rating
export const userRating = derived(
	apiResult,
	($apiResult): number | null => {
		if ($apiResult && $apiResult.status === 'OK' && $apiResult.result.length > 0) {
			return $apiResult.result[0].rating; // Extract user rating from the API result
		}
		return null;
	}
);

export const maxRating = derived(
	apiResult,
	($apiResult): number | null => {
		if ($apiResult && $apiResult.status === 'OK' && $apiResult.result.length > 0) {
			return $apiResult.result[0].maxRating; // Extract user rating from the API result
		}
		return null;
	}
);

/**
 * Fetch data from the API and update the store
 * @param {string} handle - The Codeforces handle
 */
export async function fetchUserData(handle: string) {
	try {
		const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
		if (!response) {
			throw new Error('Network response was not ok');
		}
		const data: UserInfoResponse = await response.json();
		apiResult.set(data); // Update the store with the typed API result
		apiError.set(null);  // Clear any previous errors
	} catch (error) {
		console.error('Error fetching user data:', error);
		apiError.set(error instanceof Error ? error.message : 'An unknown error occurred'); // Update the store with the error message
		apiResult.set(null); // Clear any previous data
	}
}