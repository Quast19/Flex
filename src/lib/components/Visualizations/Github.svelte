<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	let { githubInfo, githubRepoInfo } = $props();

	let profile = githubInfo; // GitHub user profile
	let repos = githubRepoInfo; // Array of user's repositories

	let sortBy = $state(true);

	function toggleSort() {
		//console.log(sortBy);
		sortBy = !sortBy;
	}

	let sortedRepos = $derived(
		repos
			?.sort((a: any, b: any) => {
				if (sortBy) {
					return b.stargazers_count - a.stargazers_count;
				} else {
					return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
				}
			})
			.slice(0, 5)
	);
	let display = $derived(sortBy ? 'Popularity' : 'Recent');
</script>

<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
	<!-- Left Column: GitHub Profile Card -->
	<div class="space-y-3 rounded-2xl bg-white p-4 shadow-md dark:bg-gray-900 md:col-span-1">
		<div class="flex items-center space-x-4">
			<img src={profile.avatar_url} alt="avatar" class="h-16 w-16 rounded-full" />
			<div>
				<h2 class="text-xl font-semibold">{profile.name}</h2>
				<p class="text-sm text-gray-500">@{profile.login}</p>
			</div>
		</div>

		<p class="text-sm">{profile.bio}</p>

		<div class="grid grid-cols-2 gap-2 text-sm">
			<p>🗃️ Repos: {profile.public_repos}</p>
			<p>👥 Followers: {profile.followers}</p>
			<p>⭐ Total Stars: {repos.reduce((sum: any, r: any) => sum + r.stargazers_count, 0)}</p>
			<p>📌 Following: {profile.following}</p>
			<p>📅 Joined: {new Date(profile.created_at).toLocaleDateString()}</p>
			<p>
				🌐 <a href={profile.html_url} target="_blank" class="text-blue-500 underline">GitHub</a>
			</p>
		</div>
	</div>

	<!-- Right Column: Repositories -->
	<div class="space-y-4 md:col-span-2">
		<!-- Toggle Button -->
		<div class="flex justify-end">
			<Button onclick={() => toggleSort()}>Sort By: {display}</Button>
		</div>

		{#if sortedRepos && sortedRepos.length > 0}
			{#each sortedRepos as repo}
				<div
					class="rounded-xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"
				>
					<a
						href={repo.html_url}
						target="_blank"
						class="text-lg font-semibold text-blue-600 hover:underline"
					>
						{repo.name}
					</a>
					<p class="text-sm text-gray-500">{repo.description}</p>
					<div class="mt-2 flex gap-4 text-xs text-gray-400">
						<span>⭐ {repo.stargazers_count}</span>
						<span>🛠️ {repo.language ?? 'N/A'}</span>
						<span>🕒 {new Date(repo.updated_at).toLocaleDateString()}</span>
					</div>
				</div>
			{/each}
		{:else}
			<p class="text-sm text-gray-500">No repositories found.</p>
		{/if}
	</div>
</div>
