<script lang="ts">
	import { page } from '$app/state';
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800"
>
	<div
		class="w-full max-w-lg rounded-2xl border border-gray-200 bg-white/90 p-8 text-center shadow-xl dark:border-gray-700 dark:bg-gray-900/90"
	>
		<div class="mb-4 flex justify-center">
			<!-- Error icon (Heroicons or similar) -->
			<svg class="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
				/>
			</svg>
		</div>
		<h1 class="mb-2 text-3xl font-bold text-gray-800 dark:text-gray-100">
			{page.status} Error
		</h1>
		<p class="mb-6 text-lg text-gray-600 dark:text-gray-300">
			{page.error?.message || 'Something went wrong. Please try again later.'}
		</p>
		<a
			href="/"
			class="inline-block rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white shadow transition-colors hover:bg-blue-700"
		>
			Go Home
		</a>
	</div>
</div>
