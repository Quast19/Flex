<script lang="ts">
	import ProfileHeader from './profileHeader.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageData } from './$types';
	import CodeforcesBar from '$lib/components/Visualizations/CodeforcesBar.svelte';
	import Leetcode from '$lib/components/Visualizations/Leetcode.svelte';
	// <!-- ADDED: Import the new component -->
	import SolvedProblemsByTopic from '$lib/components/Visualizations/SolvedProblemsByTopic.svelte';

	let {
		data
	}: {
		data: PageData;
	} = $props();

	// Destructure platform and social data
	const { platformData: platform, socialHandles: social } = data;
	let hasCodeforcesData = platform?.codeforcesSub?.result && platform?.codeforcesRating?.result;
	let hasLeetCodeData = platform?.leetcode;

	// <!-- ADDED: A cleaner way to get the full name with a fallback -->
	let fullName =
		platform?.codeforces?.result?.[0]?.firstName && platform?.codeforces?.result?.[0]?.lastName
			? `${platform.codeforces.result[0].firstName} ${platform.codeforces.result[0].lastName}`
			: 'User Profile';
</script>

<ProfileHeader socialHandles={social} />

<h1
	class="mx-auto max-w-xl
         bg-gradient-to-b from-black via-gray-800 to-gray-400
         bg-clip-text pb-2
         text-center text-3xl font-semibold
         leading-snug text-transparent dark:from-white dark:via-neutral-400
         dark:to-neutral-600 sm:pb-3 sm:text-4xl
         md:pb-4 md:text-5xl lg:text-6xl"
>
	<!-- MODIFIED: Use the cleaner fullName variable -->
	{fullName}
</h1>

<div class="flex flex-wrap justify-center gap-12 text-blue-600">
	<Button
		variant="link"
		target="_blank"
		style="color: oklch(0.55 0.22 263)"
		href="https://codeforces.com/profile/{platform?.codeforces?.result?.[0]?.handle}"
		>Codeforces</Button
	>
	<Button
		variant="link"
		target="_blank"
		style="color: oklch(0.55 0.22 263)"
		href="https://www.codechef.com/users/{platform?.codechefHandle}">Codechef</Button
	>
	<Button
		variant="link"
		target="_blank"
		style="color: oklch(0.55 0.22 263)"
		href="https://leetcode.com/{platform?.leetCodeHandle}">LeetCode</Button
	>
	<!-- MODIFIED: Corrected LeetCode URL -->
	<Button
		variant="link"
		target="_blank"
		style="color: oklch(0.55 0.22 263)"
		href="https://github.com/{platform?.githubHandle}">Github</Button
	>
	<!-- MODIFIED: Corrected GitHub URL -->
</div>

<!-- Add a container div for better spacing -->
<div class="mt-8 space-y-6">
	{#if hasCodeforcesData && hasLeetCodeData}
		<CodeforcesBar
			userInfo={platform?.codeforces}
			submissions={platform?.codeforcesSub.result}
			ratings={platform?.codeforcesRating.result}
		/>
		<Leetcode leetCodeInfo={platform?.leetcode} />

		<!-- ADDED: Use the new component here, passing the username -->
		<!-- {#if platform?.leetCodeHandle}
			<SolvedProblemsByTopic username={platform.leetCodeHandle} />
		{/if} -->
		<pre>{JSON.stringify(platform?.github, null, 2)}</pre>
	{:else}
		<p class="text-center">Loading or no data available for one or more platforms...</p>
	{/if}
</div>
