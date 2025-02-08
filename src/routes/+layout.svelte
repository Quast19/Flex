<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import ModeWatcherComponent from '../lib/components/ModeWatcher/ModeWatcherComponent.svelte';
	let { children } = $props();
</script>

<ModeWatcher />
<div class="icons">
	<ModeWatcherComponent />
</div>
<div class="pages">
	{@render children?.()}
</div>

<style>
	.icons {
		display: flex;
		flex-direction: row;
		justify-content: end;
		margin: 10px;
	}
	.pages {
		margin: 10px;
	}
</style>
