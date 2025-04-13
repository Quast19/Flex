<script lang="ts">
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	let { data } = $props();
	// Extract the user data from the result array (if it exists)
	const { platformData: platform, socialHandles: social } = data;
	// Function to get the appropriate color for the user's rank
	function getRankColor(rank: string) {
		switch (rank) {
			case 'newbie':
				return 'text-gray-500';
			case 'pupil':
				return 'text-green-500';
			case 'specialist':
				return 'text-cyan-500';
			case 'expert':
				return 'text-blue-500';
			case 'candidate master':
				return 'text-purple-500';
			case 'master':
				return 'text-orange-500';
			case 'international master':
				return 'text-orange-600';
			case 'grandmaster':
				return 'text-red-500';
			case 'international grandmaster':
				return 'text-red-600';
			case 'legendary grandmaster':
				return 'text-red-700';
			default:
				return 'text-gray-700';
		}
	}

	// Format date from timestamp
	function formatDate(timestamp: any) {
		if (!timestamp) return '';
		return new Date(timestamp * 1000).toLocaleDateString();
	}
</script>

<!-- CODEFORCES -->
<h2 class="mt-6 text-xl font-bold">Social Profiles</h2>
<ul>
	{#if social?.twitter}
		<li>
			<a
				href={`https://twitter.com/${social?.twitter}`}
				target="_blank"
				class="text-blue-500 hover:underline"
			>
				Twitter: @{social?.twitter}
			</a>
		</li>
	{/if}

	{#if social?.linkedin}
		<li>
			<a href={`${social?.linkedin}`} target="_blank" class="text-blue-700 hover:underline">
				LinkedIn
			</a>
		</li>
	{/if}
</ul>
{#if platform}
	<h2 class="text-xl font-bold">Codeforces</h2>
	{#if platform.codeforces}
		<p>Handle: {platform.codeforces.handle}</p>
		<p>Rating: {platform.codeforces.rating}</p>
		<p>Rank: {platform.codeforces.rank}</p>
	{/if}

	<h2 class="mt-4 text-xl font-bold">CodeChef</h2>
	{#if platform.codechef}
		<p>Name: {platform.codechef.name}</p>
		<p>Current Rating: {platform.codechef.currentRating}</p>
		<p>Stars: {platform.codechef.stars}</p>
	{/if}

	<h2 class="mt-4 text-xl font-bold">GitHub</h2>
	{#if platform.github}
		<p>Username: {platform.github.login}</p>
		<p>Public Repos: {platform.github.public_repos}</p>
		<p>Followers: {platform.github.followers}</p>
	{/if}

	<h2 class="mt-4 text-xl font-bold">LeetCode</h2>
	{#if platform.leetcode}
		<p>Rating: {platform.leetcode.userContestRanking?.rating}</p>
		<p>Global Ranking: {platform.leetcode.userContestRanking?.globalRanking}</p>
		<p>Top Percentage: {platform.leetcode.userContestRanking?.topPercentage}%</p>
	{/if}
{/if}
