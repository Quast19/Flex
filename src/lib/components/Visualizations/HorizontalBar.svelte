<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	interface Props {
		// Explicit type annotations
		labels?: string[];
		data?: number[];
		type?: 'pie' | 'bar' | 'doughnut';
		title?: string;
		horizontal: boolean;
	}

	let {
		labels = [],
		data = [],
		type = 'pie',
		title = 'Chart Title',
		horizontal = false
	}: Props = $props();

	let canvas: HTMLCanvasElement | undefined = $state();

	onMount(() => {
		const ctx = canvas?.getContext('2d');
		if (!ctx) return; // null check for ctx
		const chart = new Chart(ctx, {
			type,
			data: {
				labels,
				datasets: [
					{
						label: title,
						data,
						backgroundColor: labels.map((_, i) => `hsl(${(i * 47) % 360}, 70%, 60%)`)
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: title
					},
					legend: {
						display: type !== 'bar'
					}
				},
				indexAxis: type === 'bar' ? (horizontal == true ? 'y' : 'x') : undefined
			}
		});

		return () => chart.destroy();
	});
</script>

<canvas bind:this={canvas}></canvas>
