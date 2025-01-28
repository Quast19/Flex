<script>
	import { goto } from '$app/navigation';
	import CodeforcesProfile from '$lib/components/codeforcesProfiles/CodeforcesProfile.svelte';
	import ModeWatcherComponent from '../lib/components/ModeWatcher/ModeWatcherComponent.svelte';
	let userInput = $state('Shriganesh');
	function GoHome() {
		goto('/Home');
	}
</script>

<ModeWatcherComponent />
<CodeforcesProfile />
