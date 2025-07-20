<script lang="ts">
	import HorizontalBar from './HorizontalBar.svelte';
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card'; // adjust your import path
	import { Button } from '$lib/components/ui/button/index';
	import { json } from '@sveltejs/kit';
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let { userInfo, submissions, ratings } = $props();

	// Extract unique tags and tag frequencies
	function computeTagFrequency(
		data: any[],
		sortAscending: boolean = false
	): { labels: string[]; values: number[] } {
		const freq: Record<string, number> = {};

		for (const entry of data) {
			for (const tag of entry.problem.tags) {
				freq[tag] = (freq[tag] || 0) + 1;
			}
		}

		const sortedEntries = Object.entries(freq).sort((a, b) =>
			sortAscending ? a[1] - b[1] : b[1] - a[1]
		);

		const labels = sortedEntries.map(([tag]) => tag);
		const values = sortedEntries.map(([, count]) => count);

		return { labels, values };
	}

	// Extract ratings frequencies
	function computeRatingFrequency(data: any[]): { labels: string[]; values: number[] } {
		const freq: Record<string, number> = {};
		for (const entry of data) {
			const rating = entry.problem.rating?.toString() ?? 'Unrated';
			if (entry.verdict === 'OK') freq[rating] = (freq[rating] || 0) + 1;
		}
		const labels = Object.keys(freq).sort((a, b) => +a - +b);
		const values = labels.map((label) => freq[label]);
		return { labels, values };
	}

	function rankColor(rank: string): string {
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
			case 'international master':
				return 'text-orange-500';
			case 'grandmaster':
			case 'international grandmaster':
			case 'legendary grandmaster':
				return 'text-red-500';
			default:
				return 'text-gray-500';
		}
	}
	const stats = [
		{ label: 'Current Codeforces Rating', value: userInfo.result[0].rating, type: 'rating' },
		{ label: 'Max Codeforces Rating', value: userInfo.result[0].maxRating, type: 'rating' },
		{ label: 'Organization', value: userInfo.result[0].organization },
		{
			label: 'City / Country',
			value: `${userInfo.result[0].city ?? '-'} / ${userInfo.result[0].country}`
		},
		{ label: 'Friends', value: userInfo.result[0].friendOfCount },
		{ label: 'Contribution', value: userInfo.result[0].contribution },
		{ label: 'Registered On', value: formatUnixTime(userInfo.result[0].registrationTimeSeconds) },
		{ label: 'Last Online', value: formatUnixTime(userInfo.result[0].lastOnlineTimeSeconds) }
	];

	function ratingColor(val: number): string {
		if (val >= 2400) return 'text-red-500';
		if (val >= 2200) return 'text-orange-500';
		if (val >= 1900) return 'text-purple-500';
		if (val >= 1600) return 'text-blue-500';
		if (val >= 1400) return 'text-cyan-500';
		if (val >= 1200) return 'text-green-500';
		return 'text-gray-500';
	}

	function ratingColor2(val: number): string {
		if (val >= 2400) return 'red';
		if (val >= 2200) return 'orange';
		if (val >= 1900) return 'purple';
		if (val >= 1600) return 'blue';
		if (val >= 1400) return 'cyan';
		if (val >= 1200) return 'green';
		return 'gray';
	}

	let sortDecending = $state(false);
	let tagResult = $state(() => computeTagFrequency(submissions, sortDecending));
	var ratingResult = computeRatingFrequency(submissions);
	function formatUnixTime(timestamp: number) {
		return new Date(timestamp * 1000).toLocaleDateString();
	}
	const last10 = ratings.slice(-10);
	let canvas: HTMLCanvasElement | undefined = $state();

	onMount(() => {
		if (!ratings || ratings.length === 0 || !canvas) return;

		const labels = last10.map((c: any) =>
			new Date(c.ratingUpdateTimeSeconds * 1000).toLocaleString('default', {
				month: 'short', // e.g. Jul
				year: 'numeric' // e.g. 2024
			})
		);

		const data = last10.map((c: any) => c.newRating);

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		new Chart(ctx, {
			type: 'line',
			data: {
				labels,
				datasets: [
					{
						label: 'Last 10 contests',
						data,
						borderColor: ratingColor2(userInfo.result[0].maxRating),
						tension: 0.2,
						fill: false,
						pointBackgroundColor: data.map((val: any) => {
							if (val >= 2400) return 'red';
							if (val >= 2200) return 'orange';
							if (val >= 1900) return 'purple';
							if (val >= 1600) return 'blue';
							if (val >= 1400) return 'cyan';
							if (val >= 1200) return 'green';
							return 'gray';
						})
					}
				]
			},
			options: {
				animations: {
					tension: {
						duration: 1000,
						easing: 'easeInCubic',
						from: 0.5,
						to: 0,
						loop: true
					}
				},
				scales: {
					x: {
						title: { display: true, text: 'Date' }
					},
					y: {
						title: { display: true, text: 'Rating' },
						beginAtZero: false
					}
				},
				plugins: {
					tooltip: {
						callbacks: {
							title: (ctx) => last10[ctx[0].dataIndex].contestName,
							label: (ctx) => {
								const c = last10[ctx.dataIndex];
								return [`Rating: ${c.newRating}`, `Rank: ${c.rank}`];
							}
						}
					}
				}
			}
		});
	});
</script>

<div class="mt-8 grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
	<!-- Left Column -->
	<div class="flex flex-col justify-between gap-8">
		<!-- Profile Card -->
		<Card class="w-full">
			<CardContent class="flex flex-col items-start gap-6 md:flex-row">
				<!-- Left section -->
				<div class="flex flex-col items-center gap-2">
					<img
						src={userInfo.result[0].avatar}
						alt="avatar"
						class="h-28 w-28 rounded-full border shadow-md"
					/>
					<CardTitle tag="h2" class="text-center text-lg">
						{userInfo.result[0].firstName}
						{userInfo.result[0].lastName}
					</CardTitle>
					<p class="text-sm text-muted-foreground">@{userInfo.result[0].handle}</p>
					<span class={`mt-1 rounded px-2 py-1 text-xs ${rankColor(userInfo.result[0].rank)}`}>
						{userInfo.result[0].rank} → {userInfo.result[0].maxRank}
					</span>
				</div>

				<!-- Right section: stats grid -->
				<div class="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
					{#each stats as { label, value, type }}
						<div>
							<p class="text-sm text-muted-foreground">{label}</p>
							{#if type === 'rating'}
								<p class={`font-medium ${ratingColor(value as number)}`}>
									{value}
								</p>
							{:else}
								<p class="font-medium">{value}</p>
							{/if}
						</div>
					{/each}
				</div>
			</CardContent>
		</Card>

		<!-- Ratings Chart -->
		<div class="h-[300px] rounded-xl border bg-white p-4 shadow-sm dark:bg-gray-950">
			<canvas bind:this={canvas}></canvas>
		</div>

		<!-- Problems by Rating -->
		<div class="min-h-[300px] rounded-xl border bg-white p-4 shadow-sm dark:bg-gray-950">
			<HorizontalBar
				labels={ratingResult.labels}
				data={ratingResult.values}
				title="Problems by Rating"
				horizontal={false}
				type="bar"
			/>
		</div>
	</div>

	<!-- Right Column -->
	<div class="max-h-[1000px] rounded-xl border bg-white p-4 shadow-sm dark:bg-gray-950">
		<Button
			onclick={() => {
				sortDecending = !sortDecending;
				tagResult = () => computeTagFrequency(submissions, sortDecending);
			}}>Toggle Sort</Button
		>
		{#key tagResult}
			<HorizontalBar
				labels={tagResult().labels}
				data={tagResult().values}
				title="Problems by Topic"
				horizontal={true}
				type="bar"
			/>
		{/key}
	</div>
</div>
