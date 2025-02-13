<script>
	import { goto } from '$app/navigation';
	import CodeforcesProfile from '$lib/components/codeforcesProfiles/CodeforcesProfile.svelte';

	let userInput = $state('Shriganesh');
	function GoHome() {
		goto('/Home');
	}
</script>

<CodeforcesProfile />
<a href='sign-up'>Sign Up</a>