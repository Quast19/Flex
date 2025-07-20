<!-- src/lib/components/Visualizations/SolvedProblemsByTopic.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';

	// The component accepts the user's LeetCode handle as a prop
	export let username: string;

	// State variables
	let isLoading = true;
	let error: string | null = null;
	// Use a Map to store our organized data: { "Topic Name" => [question1, question2] }
	let solvedProblemsByTopic = new Map<string, any[]>();

	onMount(async () => {
		if (!username) {
			error = 'LeetCode username not provided.';
			isLoading = false;
			return;
		}

		// This query fetches all ACCEPTED problems and their associated topic tags
		const getSolvedProblemsQuery = `
            query getSolvedProblems($username: String!, $limit: Int, $filters: QuestionListFilterInput) {
                matchedUser(username: $username) {
                    problemsetQuestionList: questionList(
                        limit: $limit
                        filters: $filters
                    ) {
                        questions: data {
                            title
                            titleSlug
                            difficulty
                            topicTags {
                                name
                                slug
                            }
                        }
                    }
                }
            }
        `;

		const variables = {
			username: username,
			filters: { status: 'AC' },
			limit: 500 // Fetch up to 500 solved problems
		};

		try {
			const response = await fetch('https://leetcode.com/graphql', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query: getSolvedProblemsQuery, variables })
			});
			if (!response.ok) throw new Error('Failed to fetch from LeetCode API');

			const result = await response.json();
			const questions = result.data.matchedUser.problemsetQuestionList.questions;

			// Process the flat list of questions into a structure grouped by topic
			const topicMap = new Map<string, any[]>();
			for (const question of questions) {
				for (const tag of question.topicTags) {
					if (!topicMap.has(tag.name)) {
						topicMap.set(tag.name, []);
					}
					topicMap.get(tag.name)?.push(question);
				}
			}
			solvedProblemsByTopic = topicMap;
		} catch (err: any) {
			error = err.message || 'An unknown error occurred.';
		} finally {
			isLoading = false;
		}
	});
</script>

<div class="mt-6 rounded-lg border p-4">
	<h3 class="mb-4 text-xl font-bold">Solved Problems by Topic</h3>

	{#if isLoading}
		<p class="text-center text-gray-500">Loading solved problems...</p>
	{:else if error}
		<p class="text-center text-red-500">Error: {error}</p>
	{:else if solvedProblemsByTopic.size > 0}
		<!-- Sort topics by number of questions solved -->
		<div class="space-y-2">
			{#each [...solvedProblemsByTopic.entries()].sort((a, b) => b[1].length - a[1].length) as [topic, questions]}
				<details class="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
					<summary class="cursor-pointer font-semibold">
						{topic}
						<span
							class="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200"
						>
							{questions.length} solved
						</span>
					</summary>
					<ul
						class="mt-2 list-disc space-y-1 border-t border-gray-200 pl-6 pt-2 dark:border-gray-700"
					>
						{#each questions as question}
							<li>
								<a
									href="https://leetcode.com/problems/{question.titleSlug}"
									target="_blank"
									rel="noopener noreferrer"
									class="text-blue-600 hover:underline dark:text-blue-400"
								>
									{question.title} (<span class="capitalize"
										>{question.difficulty.toLowerCase()}</span
									>)
								</a>
							</li>
						{/each}
					</ul>
				</details>
			{/each}
		</div>
	{:else}
		<p class="text-center text-gray-500">No solved problems found for this user.</p>
	{/if}
</div>
