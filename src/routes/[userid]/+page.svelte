<script lang="ts">
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	let { data } = $props();
	// Extract the user data from the result array (if it exists)
	let user = $derived(data.data.result[0]);

	// Function to get the appropriate color for the user's rank
	function getRankColor(rank: string) {
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
				return 'text-orange-500';
			case 'international master':
				return 'text-orange-600';
			case 'grandmaster':
				return 'text-red-500';
			case 'international grandmaster':
				return 'text-red-600';
			case 'legendary grandmaster':
				return 'text-red-700';
			default:
				return 'text-gray-700';
		}
	}

	// Format date from timestamp
	function formatDate(timestamp: any) {
		if (!timestamp) return '';
		return new Date(timestamp * 1000).toLocaleDateString();
	}
</script>

<div class="mx-auto max-w-2xl p-4">
	{#if data.data.status === 'OK' && user}
		<div class="overflow-hidden rounded-lg bg-white shadow-lg">
			<!-- Header with avatar and basic info -->
			<div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
				<div class="flex items-center">
					<div class="mr-4">
						<img
							src={user.avatar ||
								'https://codeforces.org/s/0/images/codeforces-logo-with-telegram.png'}
							alt="{user.handle}'s avatar"
							class="h-20 w-20 rounded-full border-2 border-white object-cover"
						/>
					</div>
					<div>
						<h1 class="text-2xl font-bold">{user.firstName || ''} {user.lastName || ''}</h1>
						<div class="flex items-center">
							<span class="font-mono text-lg">@{user.handle}</span>
							{#if user.country}
								<span class="ml-2">{user.country}{user.city ? `, ${user.city}` : ''}</span>
							{/if}
						</div>
						{#if user.organization}
							<div class="text-sm opacity-90">{user.organization}</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- Rating information -->
			<div class="p-6">
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<!-- Current Rating -->
					<div class="rounded-lg bg-gray-50 p-4">
						<h2 class="text-sm font-semibold uppercase text-gray-500">Current Rating</h2>
						<div class="mt-1 flex items-end">
							<span class="text-3xl font-bold">{user.rating || 0}</span>
							<span class={`ml-2 font-medium ${getRankColor(user.rank)}`}>
								{user.rank ? user.rank.charAt(0).toUpperCase() + user.rank.slice(1) : 'Unrated'}
							</span>
						</div>
					</div>

					<!-- Max Rating -->
					<div class="rounded-lg bg-gray-50 p-4">
						<h2 class="text-sm font-semibold uppercase text-gray-500">Max Rating</h2>
						<div class="mt-1 flex items-end">
							<span class="text-3xl font-bold">{user.maxRating || 0}</span>
							<span class={`ml-2 font-medium ${getRankColor(user.maxRank)}`}>
								{user.maxRank
									? user.maxRank.charAt(0).toUpperCase() + user.maxRank.slice(1)
									: 'Unrated'}
							</span>
						</div>
					</div>
				</div>

				<!-- Additional information -->
				<div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="flex items-center">
						<span class="w-40 text-gray-500">Contribution:</span>
						<span
							class={user.contribution > 0
								? 'text-green-500'
								: user.contribution < 0
									? 'text-red-500'
									: ''}
						>
							{user.contribution > 0 ? '+' : ''}{user.contribution}
						</span>
					</div>
					<div class="flex items-center">
						<span class="w-40 text-gray-500">Friend of:</span>
						<span>{user.friendOfCount || 0} users</span>
					</div>
					<div class="flex items-center">
						<span class="w-40 text-gray-500">Registered:</span>
						<span>{formatDate(user.registrationTimeSeconds)}</span>
					</div>
					<div class="flex items-center">
						<span class="w-40 text-gray-500">Last online:</span>
						<span>{formatDate(user.lastOnlineTimeSeconds)}</span>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="rounded-lg bg-white p-6 text-center shadow">
			<h2 class="text-xl font-semibold text-gray-700">No data available</h2>
			<p class="mt-2 text-gray-500">
				{data.data.status !== 'OK' ? 'Error fetching user data' : 'User not found'}
			</p>
		</div>
	{/if}
	<br /><br /><br />
	<iframe src="https://codechef-api.vercel.app/rating/Shriganesh83" width="800" height="600">
	</iframe>
</div>
