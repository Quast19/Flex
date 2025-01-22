<script>
	import { goto } from '$app/navigation';
	import { generateRandomIntegerNumber } from '@oslojs/crypto/random';

	let name = 'Shriganesh';
	function GoHome() {
		goto('/Home');
	}
</script>

<h1>Welcome to SvelteKit {name}</h1>
<button onclick={GoHome()}> </button>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
