<script lang="ts">
	import { goto } from '$app/navigation';
	import CodeforcesProfile from '$lib/components/codeforcesProfiles/profileBuilder.svelte';
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import Progress from '$lib/components/ui/progress/progress.svelte';
	let { data }: { data: PageData } = $props();
	let userId = $state(data.session?.user.id);
	let username = $state(
		data.session?.user.email && data.session?.user.email.includes('@gmail.com')
			? data.session?.user.email.replace('@gmail.com', '')
			: data.session?.user.id
	);
	let loading = $state(false);
	let progress = $state(33);
	let progressInterval: any;

	async function handleProfileClick() {
		loading = true;
		progress = 20;
		console.log('reached here');
		progressInterval = setInterval(() => {
			progress += Math.floor(Math.random() * 10 + 5); // random integer increment
			if (progress >= 100) progress = 99; // never reach 100 until navigation
		}, 500);
		await goto(`/${username}`);
		progress = 100;
	}
	//console.log(username, ' is the userName');
</script>

<!-- {data.session?.session.id} -->
<div class="Page">
	<h1
		class="mx-auto mb-14 max-w-xl bg-gradient-to-b
		 from-black via-gray-800 to-gray-500 bg-clip-text
		 text-center text-5xl font-semibold text-transparent
		 dark:from-white dark:via-neutral-400 dark:to-neutral-600
		 md:text-4xl"
	>
		Welcome to Profile builder
	</h1>

	<div class="Profiles">
		<CodeforcesProfile />
	</div>

	<footer>
		{#if data.session?.user.id != undefined}
			<Button
				variant="link"
				class="relative mt-12  inline-flex	 animate-text-gradient items-center justify-center bg-gradient-to-r from-[#ACACAC] via-[#363636] to-[#ACACAC] bg-[200%_auto] bg-clip-text px-6 py-3 text-center text-3xl font-medium text-transparent transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#ACACAC] after:via-[#363636] after:to-[#ACACAC] after:transition-all after:duration-300 after:content-[''] hover:scale-105 hover:after:w-full"
				onclick={() => handleProfileClick()}
			>
				{#if loading}
					<Progress class="mr-2 h-2 w-24 align-middle" value={progress} />
					{progress}
				{:else}
					Click to view profile card
				{/if}
			</Button>
		{/if}
	</footer>
</div>

<style>
	.Profiles {
		/* padding: 20px; */
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
	footer {
		justify-self: center;
	}
	.Page {
		height: 100%;
	}
</style>
