<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import CodeforcesProfile from '$lib/components/codeforcesProfiles/CodeforcesProfile.svelte';

	// Reactive user input (if needed)
	let userInput = writable('Shriganesh');

	// Function to navigate to home
	function GoHome() {
		goto('/Home');
	}

	// Define User type
	type User = {
		id: number;
		codeforcesHandle: string | null;
		leetcodeHandle: string | null;
	};

	// Use Svelte's writable store to make users reactive
	let users = writable<User[]>([]);

	// Fetch users when the component mounts
	async function fetchUsers() {
		try {
			const response = await fetch('/api/users');
			if (!response.ok) {
				throw new Error(await response.text());
			}
			const data: User[] = await response.json();
			users.set(data); // Update store with fetched data
		} catch (error) {
			console.error('Failed to fetch users:', error);
		}
	}

	// Fetch users on component mount
	onMount(fetchUsers);
</script>

<CodeforcesProfile />

<h1>Users</h1>
<ul>
	{#each $users as user}
		<li>
			ID: {user.id}, Codeforces: {user.codeforcesHandle}, LeetCode: {user.leetcodeHandle}
		</li>
	{/each}
</ul>
