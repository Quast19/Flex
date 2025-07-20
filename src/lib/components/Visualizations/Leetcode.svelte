<script lang="ts">
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import ChartDataLabels from 'chartjs-plugin-datalabels';

	let { leetCodeInfo } = $props();

	let canvasEl: HTMLCanvasElement;

	const stats = leetCodeInfo.data.matchedUser.submitStatsGlobal.acSubmissionNum;
	const allQuestions = leetCodeInfo.data.allQuestionsCount;

	const totalSolved = stats.find((d: any) => d.difficulty === 'All')?.count ?? 0;
	const currentRating = leetCodeInfo.data.userContestRankingHistory
		.filter((c: any) => c.attended)
		.sort((a: any, b: any) => b.contest.startTime - a.contest.startTime)[0]?.rating;
	const attendedContests = leetCodeInfo.data.userContestRanking?.attendedContestsCount ?? 0;

	const difficulties = ['Easy', 'Medium', 'Hard'];
	const colors = ['#00AF9B', '#FFB800', '#FF2D55'];

	const badges = leetCodeInfo.data.matchedUser.badges ?? [];

	Chart.register(ChartDataLabels);

	function computeChartData() {
		return difficulties.map((diff) => {
			const solved = stats.find((d: any) => d.difficulty === diff)?.count ?? 0;
			const total = allQuestions.find((d: any) => d.difficulty === diff)?.count ?? 1;

			return {
				label: diff,
				solved,
				total
			};
		});
	}

	onMount(() => {
		const chartData = computeChartData();

		const chart = new Chart(canvasEl, {
			type: 'bar',
			data: {
				labels: chartData.map((d) => d.label),
				datasets: [
					{
						label: 'Total Questions',
						data: chartData.map((d) => d.total),
						backgroundColor: colors
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Total Questions'
						}
					}
				},
				plugins: {
					legend: { display: false },
					tooltip: {
						callbacks: {
							label: (ctx) => {
								const d = chartData[ctx.dataIndex];
								const percent = Math.round((d.solved / d.total) * 100);
								return `${ctx.label}: ${d.solved}/${d.total} (${percent}%)`;
							}
						}
					},
					datalabels: {
						anchor: 'center',
						align: 'center',
						color: '#fff',
						font: {
							weight: 'bold' as const,
							size: 12
						},
						formatter: (_value, context) => {
							const d = chartData[context.dataIndex];
							return `${d.solved}/${d.total}`;
						}
					}
				}
			},
			plugins: [ChartDataLabels]
		});

		return () => chart.destroy();
	});
</script>

<!-- <pre>{JSON.stringify(leetCodeInfo, null, 2)}</pre> -->
<Card class="mt-8">
	<CardHeader>
		<CardTitle>LeetCode Summary</CardTitle>
	</CardHeader>

	<CardContent>
		<div class="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
			<!-- Left Section -->
			<div class="space-y-8">
				<div class="rounded-xl bg-muted p-6 ring-1 ring-border">
					<p class="mb-4 text-lg font-semibold text-foreground">Contest & Problem Stats</p>
					<div class="grid grid-cols-3 gap-4 text-center">
						<div>
							<p class="text-sm text-muted-foreground">Rating</p>
							<p class="text-2xl font-bold text-foreground">{Math.round(currentRating) ?? 'N/A'}</p>
						</div>
						<div>
							<p class="text-sm text-muted-foreground">Contests</p>
							<p class="text-2xl font-bold text-foreground">{attendedContests}</p>
						</div>
						<div>
							<p class="text-sm text-muted-foreground">Total Solved</p>
							<p class="text-2xl font-bold text-foreground">{totalSolved}</p>
						</div>
					</div>
				</div>

				{#if badges.length > 0}
					<div>
						<p class="mb-2 text-lg font-semibold text-foreground">Badges</p>
						<div class="flex flex-wrap gap-4">
							{#each badges as badge}
								<div class="flex w-24 flex-col items-center text-center">
									<img
										src={badge.icon.startsWith('http')
											? badge.icon
											: `https://leetcode.com${badge.icon}`}
										alt={badge.displayName}
										class="h-16 w-16 rounded-md object-contain shadow-md transition-transform hover:scale-110"
									/>
									<span class="mt-1 text-xs font-medium text-foreground">{badge.displayName}</span>
									<span class="text-[10px] text-muted-foreground">
										{new Date(badge.creationDate).toLocaleDateString()}
									</span>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- Right: Chart + Manual Legend -->
			<div class="flex flex-col items-center">
				<div class="relative h-64 min-w-[300px]">
					<canvas bind:this={canvasEl} class="max-h-full max-w-full"></canvas>
				</div>
				<!-- Manual Legend -->
				<div class="mt-4 flex flex-col gap-2">
					{#each difficulties as diff, i}
						<div class="flex items-center space-x-2">
							<span class="inline-block h-3 w-3 rounded-full" style="background-color: {colors[i]}"
							></span>
							<span class="text-sm font-medium text-foreground">{diff}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</CardContent>
</Card>
