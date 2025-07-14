<script lang="ts">
	import HorizontalBar from './HorizontalBar.svelte';

	let { userInfo, submissions } = $props();

	// Extract unique tags and tag frequencies
	function computeTagFrequency(data: any[]): { labels: string[]; values: number[] } {
		const freq: Record<string, number> = {};
		for (const entry of data) {
			for (const tag of entry.problem.tags) {
				freq[tag] = (freq[tag] || 0) + 1;
			}
		}
		const labels = Object.keys(freq);
		const values = Object.values(freq);
		return { labels, values };
	}

	// Extract ratings frequencies
	function computeRatingFrequency(data: any[]): { labels: string[]; values: number[] } {
		const freq: Record<string, number> = {};
		for (const entry of data) {
			const rating = entry.problem.rating?.toString() ?? 'Unrated';
			freq[rating] = (freq[rating] || 0) + 1;
		}
		const labels = Object.keys(freq).sort((a, b) => +a - +b);
		const values = labels.map((label) => freq[label]);
		return { labels, values };
	}

	var tagResult = computeTagFrequency(submissions);
	var ratingResult = computeRatingFrequency(submissions);
</script>

<!-- <pre>{JSON.stringify(userInfo, null, 2)}</pre> -->

<!-- Topics horizontal bar -->
<HorizontalBar
	labels={tagResult.labels}
	data={tagResult.values}
	title="Problems by Topic"
	horizontal={true}
	type={'bar'}
/>

<!-- Ratings horizontal (or use separate VerticalBar if you want) -->
<HorizontalBar
	labels={ratingResult.labels}
	data={ratingResult.values}
	title="Problems by Rating"
	horizontal={false}
	type={'bar'}
/>
