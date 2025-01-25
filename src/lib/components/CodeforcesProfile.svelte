<script>
	let userInput = $state('');
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

<style lang="css">
	.inputHandle {
		width: 400px;
	}
</style>
