// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://telbin.dev',
	integrations: [
		sitemap({
			filter: (page) => !/^\/(thanks|404)\/?$/.test(new URL(page).pathname),
		}),
	],
});
