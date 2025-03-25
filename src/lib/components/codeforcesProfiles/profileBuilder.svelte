<script lang="ts">
	import { combinedPlatforms } from '../../stores/codeforcesStore';
	import {
		fetchUserDataCodeforces,
		fetchUserDataCodechef,
		fetchUserDataGitHub,
		fetchUserDataLeetCode
	} from '../../stores/codeforcesStore';
	import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { onMount } from 'svelte';
	import { authClient } from '$lib/auth-client';
	import type { Profile } from '../common';

	type HandleKey = 'codeforcesHandle' | 'leetCodeHandle' | 'githubHandle' | 'codechefHandle';

	let profileData: Profile | undefined;
	let session;

	let handles: Record<HandleKey, string> = {
		codeforcesHandle: '',
		leetCodeHandle: '',
		githubHandle: '',
		codechefHandle: ''
	};

	async function fetchProfile() {
		try {
			const res = await fetch('/api/profiles');
			if (!res.ok) throw new Error('Failed to fetch profile');
			profileData = await res.json();
		} catch (error) {
			console.error(error);
		}
	}

	async function updateProfile(profile: {
		codeforcesHandle?: string;
		leetCodeHandle?: string;
		githubHandle?: string;
		codechefHandle?: string;
	}): Promise<void> {
		try {
			const res = await fetch('/api/profiles', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(profile)
			});
			if (!res.ok) throw new Error('Failed to update profile');
			const data = await res.json();
			console.log('Profile updated:', data);
		} catch (error) {
			console.error('Error updating profile:', error);
		}
	}

	onMount(async () => {
		session = await authClient.getSession();
		await fetchProfile();
		if (profileData) {
			handles.codeforcesHandle = profileData.codeforcesHandle ?? '';
			handles.leetCodeHandle = profileData.leetCodeHandle ?? '';
			handles.githubHandle = profileData.githubHandle ?? '';
			handles.codechefHandle = profileData.codechefHandle ?? '';
		}
	});

	const handleUpdate = (key: HandleKey, handle: string) => {
		updateProfile({ [key]: handle });
		switch (key) {
			case 'codeforcesHandle':
				fetchUserDataCodeforces(handle);
				break;
			case 'leetCodeHandle':
				fetchUserDataLeetCode(handle);
				break;
			case 'githubHandle':
				fetchUserDataGitHub(handle);
				break;
			case 'codechefHandle':
				fetchUserDataCodechef(handle);
				break;
		}
	};
	$: platforms = $combinedPlatforms;
</script>

<div class="raatings">
	{#each platforms as platform}
		<Card.Root class="w-[380px]">
			<Card.Header>
				<div class="flex items-center gap-5 text-primary">
					{#if platform?.image}
						<img src={platform.image} class="size-11 border p-1" />
					{/if}
					<div>
						<Card.Title>{platform.name} Profile</Card.Title>
						<Card.Description>{platform.description}</Card.Description>
					</div>
				</div>
			</Card.Header>
			<Card.Content>
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for={platform.key}>{platform.name} Handle</Label>
						<Input
							bind:value={handles[platform.key as HandleKey]}
							id={platform.key}
							placeholder={platform.placeholder}
						/>
					</div>
					{#if platform.showRating}
						<div class="ratings">
							{#if platform.maxRating != null && platform.userRating != null}
								<div>{platform.firstTag}: {platform.maxRating ?? ''}</div>
								<div>{platform.secondTag}: {platform.userRating ?? ''}</div>
							{/if}
						</div>
					{/if}
				</div>
			</Card.Content>
			<Card.Footer class="flex justify-end">
				<Button
					onclick={() =>
						handleUpdate(platform.key as HandleKey, handles[platform.key as HandleKey])}
					>Submit</Button
				>
			</Card.Footer>
		</Card.Root>
	{/each}
</div>

<style>
	.ratings {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.raatings {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
	}
</style>
