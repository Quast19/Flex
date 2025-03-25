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

export interface CodechefResponse {
  success: boolean;
  status: number;
  profile: string;
  name: string;
  currentRating: number;
  highestRating: number;
  countryFlag: string;
  countryName: string;
  globalRank: number | null;
  countryRank: number | null;
  stars: string;
  heatMap: {
    date: string;
    value: number;
  }[];
  ratingData: {
    code: string;
    getyear: string;
    getmonth: string;
    getday: string;
    reason: string | null;
    penalised_in: string | null;
    rating: string;
    rank: string;
    name: string;
    end_date: string;
    color: string;
  }[];
}


export interface LeetcodeResponse {
  status: string;
  message: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  submissionCalendar: {
    [timestamp: string]: number;
  };
}

export interface GitHubResponse {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}


