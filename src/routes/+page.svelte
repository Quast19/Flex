<script>
	import '../app.css';
	import { goto } from '$app/navigation';
	import CodeforcesProfile from '$lib/components/codeforcesProfiles/CodeforcesProfile.svelte';
	let userInput = $state('Shriganesh');
	function GoHome() {
		goto('/Home');
	}
</script>

<div class="dark">
	<CodeforcesProfile />
</div>

<style>
	.dark {
		background-color: black;
		height: 100vh;
		width: 100vw;
	}
</style>
