// Define the structure of the API response
export interface UserInfoResponse {
	status: string;
	result: User[];
}

export interface RatingChange {
	contestId: number;
	contestName: string;
	handle: string;
	rank: number;
	ratingUpdateTimeSeconds: number; // Unix timestamp (number of seconds)
	oldRating: number;
	newRating: number;
}

export interface User {
	lastName: string; // Last name of the user
	country: string; // Country of the user
	lastOnlineTimeSeconds: number; // Unix timestamp of the last online time
	city: string; // City of the user
	rating: number; // Current rating of the user
	friendOfCount: number; // Number of users who have added this user as a friend
	titlePhoto: string; // URL of the user's title photo
	handle: string; // Codeforces handle of the user
	avatar: string; // URL of the user's avatar
	firstName: string; // First name of the user
	contribution: number; // Contribution points of the user
	organization: string; // Organization of the user
	rank: string; // Current rank of the user (e.g., "specialist")
	maxRating: number; // Maximum rating achieved by the user
	registrationTimeSeconds: number; // Unix timestamp of the user's registration time
	email?: string; // Email of the user (optional, as it may not always be present)
	maxRank: string; // Maximum rank achieved by the user (e.g., "expert")
}