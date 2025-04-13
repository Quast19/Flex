<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import Button from '$lib/components/ui/button/button.svelte';
	import { signIn } from '$lib/auth-client';
	import { session } from '$lib/auth-client';
	import ModeWatcherComponent from '../lib/components/ModeWatcher/ModeWatcherComponent.svelte';
	import Footer from '$lib/components/footer.svelte';
	let { children } = $props();
	const handleSignup = async () => {
		signIn(); // implement signup logic with try catch shiz here.
	};
</script>

<div class="Layout">
	<ModeWatcher />
	<div class="icons">
		{#if $session}
			<div class="flex items-center justify-center">
				<p class="text-center">Welcome, {$session?.name}!</p>
			</div>
		{/if}
		{#if !$session}
			<Button onclick={() => handleSignup()}>Sign In</Button>
		{/if}

		<!-- <p>{session}</p> -->
		<ModeWatcherComponent />
	</div>
	<div class="pages">
		{@render children?.()}
	</div>
</div>
<footer><Footer /></footer>

<style>
	.icons {
		display: flex;
		flex-direction: row;
		justify-content: end;
		gap: 1rem;
		margin: 10px;
	}
	.pages {
		margin: 10px;
	}
	.Layout {
		height: 100%;
	}
</style>
