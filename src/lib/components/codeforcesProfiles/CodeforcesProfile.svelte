<script lang="ts">
	import { userRating, fetchUserData, maxRating } from '../../stores/codeforcesStore';
	import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import * as Select from '$lib/components/ui/select/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { onMount } from 'svelte';
	// ✅ Define Profile Interface (Update with all columns from your Drizzle schema)
	interface Profile {
		userId: string;
		codeforcesHandle?: string;
		leetCodeHandle?: string;
		githubHandle?: string;
		twitterHandle?: string;
		bio?: string;
		website?: string;
		location?: string;
		createdAt: string;
		updatedAt: string;
	}

	let profileData: Profile | undefined = $state();
	async function fetchProfile(): Promise<void> {
		try {
			const res = await fetch('/api/profiles'); // ✅ Fetch for logged-in user
			if (!res.ok) {
				throw new Error('Failed to fetch profile');
			}
			profileData = await res.json();
		} catch (error) {
			console.error(error);
		}
	}
	let codeforcesHandle = $state('');
	$effect(() => {
		if (profileData != undefined) {
			codeforcesHandle = profileData.codeforcesHandle ? profileData.codeforcesHandle : '';
		}
	});

	onMount(fetchProfile);
	const isNumber = (value: number | null) => {
		return typeof value === 'number' && Number.isFinite(value);
	};
	// write the routes here for left navigation.
	// on having userInput, I want to call the API and get response, need to have it
</script>

<Card.Root class="w-[350px]">
	<Card.Header>
		<Card.Title>Codeforces Profile</Card.Title>
		<Card.Description>Get Codeforces statistics after entering the handle.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form>
			<div class="grid w-full items-center gap-4">
				<div class="flex flex-col space-y-1.5">
					<Label for="name">Handle</Label>
					<Input bind:value={codeforcesHandle} id="name" placeholder="Codeforces Handle" />
				</div>
				<div class="ratings">
					{#if isNumber($maxRating)}
						<div>Max: {$maxRating}</div>
					{/if}
					{#if isNumber($userRating)}
						<div>Current: {$userRating}</div>
					{/if}
				</div>
			</div>
		</form>
	</Card.Content>
	<Card.Footer class="flex justify-end">
		<Button
			onclick={() => {
				fetchUserData(codeforcesHandle);
			}}>Submit</Button
		>
	</Card.Footer>
</Card.Root>

<!-- 
{#if profileData}
	<p><strong>Codeforces:</strong> {profileData.codeforcesHandle}</p>
	<p><strong>LeetCode:</strong> {profileData.leetCodeHandle}</p>
	<p><strong>GitHub:</strong> {profileData.githubHandle}</p>
	<p><strong>Twitter:</strong> {profileData.twitterHandle}</p>
	<p><strong>Bio:</strong> {profileData.bio}</p>
	<p><strong>Website:</strong> <a href={profileData.website}>{profileData.website}</a></p>
	<p><strong>Location:</strong> {profileData.location}</p>
	<p><small>Profile Created: {new Date(profileData.createdAt).toLocaleString()}</small></p>
	<p><small>Last Updated: {new Date(profileData.updatedAt).toLocaleString()}</small></p>
{/if} -->

<style>
	.ratings {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
