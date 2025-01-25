<script>
	import { userRating, fetchUserData, maxRating } from '../stores/codeforcesStore';
	let userInput = $state('Shriganesh83');
	// write the routes here for left navigation.
	// on having userInput, I want to call the API and get response, need to have it
</script>

<input
	class="inputHandle"
	type="text"
	bind:value={userInput}
	placeholder="Enter Codeforces handle here"
/>
<p>Current Input: {userInput}</p>
<button
	onclick={() => {
		fetchUserData(userInput);
	}}>Submit</button
>
<h2>User Rating</h2>

{#if $userRating !== null}
	<p>Rating: {$userRating}</p>
{:else}
	<p>No rating available.</p>
{/if}

{#if $maxRating !== null}
	<p>Rating: {$maxRating}</p>
{:else}
	<p>No max rating available.</p>
{/if}

<style lang="css">
	.inputHandle {
		width: 400px;
	}
</style>
