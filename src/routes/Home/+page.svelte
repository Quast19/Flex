<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	let { data }: { data: PageData } = $props();
	let display_message = $state.raw('Click here to go Main Page');
	// function MainPage() {
	// 	goto('/');
	// 	console.log(' reached here');
	// 	display_message = 'Redirecting to main page';
	// }
	//
</script>

<h1>Hey there home here</h1>
<a href="/Home/Bhide"> Click here to go to Bhide </a><br />
<button
	onclick={() => {
		goto('/');
		display_message = 'Redirecting to main page';
	}}>{display_message}</button
>
