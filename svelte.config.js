import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import dotenv from 'dotenv';
dotenv.config();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	},
	vitePlugin: {
		inspector:{
			// change shortcut
        toggleKeyCombo: 'meta-shift',
        // hold and release key to toggle inspector mode
        holdMode: true,
        // show or hide the inspector option
        showToggleButton: 'always',
        // inspector position
        toggleButtonPos: 'bottom-right',
		}
	}
};

export default config;
