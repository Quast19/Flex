<script>
	import { userRating, fetchUserData, maxRating } from '../../stores/codeforcesStore';
	import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import * as Select from '$lib/components/ui/select/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';

	const frameworks = [
		{
			value: 'sveltekit',
			label: 'SvelteKit'
		},
		{
			value: 'next',
			label: 'Next.js'
		},
		{
			value: 'astro',
			label: 'Astro'
		},
		{
			value: 'nuxt',
			label: 'Nuxt.js'
		}
	];

	let framework = $state('');

	const selectedFramework = $derived(
		frameworks.find((f) => f.value === framework)?.label ?? 'Select a framework'
	);
	let userInput = $state('');
	// write the routes here for left navigation.
	// on having userInput, I want to call the API and get response, need to have it
</script>

<Card.Root class="w-[350px]">
	<Card.Header>
		<Card.Title>Codeforces Profile</Card.Title>
		<Card.Description>Get Codeforces stats after entering the handle.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form>
			<div class="grid w-full items-center gap-4">
				<div class="flex flex-col space-y-1.5">
					<Label for="name">Handle</Label>
					<Input bind:value={userInput} id="name" placeholder="Codeforces Handle" />
				</div>
				<div class="ratings">
					<div>
						Max: {$maxRating}
					</div>
					<div>
						Current: {$userRating}
					</div>
				</div>
			</div>
		</form>
	</Card.Content>
	<Card.Footer class="flex justify-end">
		<Button
			onclick={() => {
				fetchUserData(userInput);
			}}>Submit</Button
		>
	</Card.Footer>
</Card.Root>

<style>
	.ratings {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
