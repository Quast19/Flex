<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import Button from '$lib/components/ui/button/button.svelte';
	import { signIn } from '$lib/auth-client';
	import ModeWatcherComponent from '../lib/components/ModeWatcher/ModeWatcherComponent.svelte';
	let { children } = $props();
	const handleSignup = async () => {
		console.log('Reached in sign in...');
		signIn(); // implement signup logic with try catch shiz here.
	};
</script>

<ModeWatcher />
<div class="icons">
	<Button onclick={() => handleSignup()}>Signup</Button>
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
