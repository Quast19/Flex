<script lang="ts">
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	import ProfileHeader from './profileHeader.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageData } from './$types';
	import CodeforcesBar from '$lib/components/Visualizations/CodeforcesBar.svelte';
	let {
		data
	}: {
		data: PageData;
	} = $props();
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

<ProfileHeader socialHandles={data.socialHandles} />
<h1
	class="mx-auto max-w-xl
         bg-gradient-to-b from-black via-gray-800 to-gray-400
         bg-clip-text pb-2
         text-center text-3xl font-semibold
         leading-snug text-transparent dark:from-white dark:via-neutral-400
         dark:to-neutral-600 sm:pb-3 sm:text-4xl
         md:pb-4 md:text-5xl lg:text-6xl"
>
	{data.platformData?.codeforces?.result[0].firstName +
		' ' +
		data.platformData?.codeforces?.result[0].lastName}
</h1>
<div class="flex flex-wrap justify-center gap-12 text-blue-600">
	<Button
		variant="outline"
		target="_blank"
		href="https://codeforces.com/profile/{platform?.codeforces.result[0].handle}">Codeforces</Button
	>
	<Button
		variant="outline"
		target="_blank"
		href="https://www.codechef.com/users/{platform?.codechefHandle}">Codechef</Button
	><Button
		variant="outline"
		target="_blank"
		href="https://leetcode.com/u/{platform?.leetCodeHandle}">LeetCode</Button
	>
	<Button variant="outline" target="_blank" href="https://github.com//{platform?.githubHandle}"
		>Github</Button
	>
</div>
{#if platform?.codeforcesSub?.result}
	<!-- <pre>{JSON.stringify(platform.codeforcesSub.result[0], null, 2)}</pre> -->
	<CodeforcesBar userInfo={platform.codeforces} submissions={platform?.codeforcesSub.result} />
{:else}
	<p>Loading or no data...</p>
{/if}
