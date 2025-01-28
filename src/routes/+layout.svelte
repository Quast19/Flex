<script>
	import { goto } from '$app/navigation';
	import CodeforcesProfile from '$lib/components/codeforcesProfiles/CodeforcesProfile.svelte';
	let userInput = $state('Shriganesh');
	function GoHome() {
		goto('/Home');
	}
</script>

<h1>Welcome to Flex {userInput}</h1>
<h3>Codeforces Profile</h3>
<CodeforcesProfile />
