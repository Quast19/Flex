<script>
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';

	import Button from '$lib/components/ui/button/button.svelte';
	let url_param = $state(page.url.pathname.split('/')[1]);
	let { socialHandles } = $props();
	// Mobile and user profile state
	let isMobileMenu = $state(false);
	let isUserProfile = $state(false);
	// Dark & Light Mode
	import { toggleMode, mode } from 'mode-watcher';
</script>

<nav class="bg-background">
	<div class="mx-auto w-full px-4 sm:px-6 lg:px-8">
		<div class="flex h-24 items-center justify-between">
			<div class="flex items-center">
				<a href="/" aria-label="home" class="shrink-0">
					<img src="/ffavicon.png" class="size-10" />
				</a>
			</div>
			<div class="hidden sm:ml-6 sm:block">
				{@render socials()}
			</div>
			<div class="-mr-2 flex sm:hidden">
				<!-- Mobile menu button -->
				<Button onclick={() => (isMobileMenu = !isMobileMenu)} size="icon" variant="secondary">
					<span class="sr-only">Open main menu</span>
					<!-- Mobile Menu  -->
					<svg
						class="{isMobileMenu ? 'hidden' : 'block'} size-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
						data-slot="icon"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
					<!-- Menu Open : Cross -->
					<svg
						class="{isMobileMenu ? 'block' : 'hidden'} size-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
						data-slot="icon"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</Button>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	{#if isMobileMenu}
		<div transition:slide class="sm:hidden" id="mobile-menu">
			<div class="space-y-1 px-2">
				<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
				<!-- {#each navs as nav}
					<a href={nav.url} class="block rounded-md px-3 py-2 text-base font-medium text-gray-300"
						>{nav.name}</a
					>
				{/each} -->
			</div>
			<div class="flex justify-end pb-2">
				{@render socials()}
			</div>
		</div>
	{/if}
</nav>

{#snippet ThemeToggle()}{/snippet}

{#snippet socials()}
	<!-- Social Icons -->
	<div class="mt-6 flex gap-4">
		<!-- LinkedIn -->
		<Button size="icon" variant="ghost" target="_blank" href={socialHandles.linkedin}>
			<svg class="h-12 w-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
				<path
					fill="currentColor"
					d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
				/>
			</svg>
		</Button>

		<!-- Twitter -->
		<Button
			size="icon"
			variant="ghost"
			target="_blank"
			href={`https://x.com/${socialHandles.twitter}`}
		>
			<svg
				class="h-12 w-12"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 1200 1227"
			>
				<path
					d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
				/>
			</svg>
		</Button>
	</div>
{/snippet}
