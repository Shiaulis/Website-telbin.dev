// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://telbin.dev',
	// Fonts are downloaded at build time and served from telbin.dev (no requests to Google).
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'Plus Jakarta Sans',
			cssVariable: '--font-jakarta',
			weights: ['400 700'],
			styles: ['normal', 'italic'],
			subsets: ['latin', 'latin-ext'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Source Serif 4',
			cssVariable: '--font-source-serif',
			weights: ['400 700'],
			styles: ['normal', 'italic'],
			subsets: ['latin', 'latin-ext'],
			fallbacks: ['Georgia', 'serif'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Fira Code',
			cssVariable: '--font-fira-code',
			weights: ['400 600'],
			styles: ['normal'],
			subsets: ['latin', 'latin-ext'],
			fallbacks: ['ui-monospace', 'monospace'],
		},
	],
	integrations: [
		sitemap({
			filter: (page) => !/^\/(thanks|404|ipad-cases)\/?$/.test(new URL(page).pathname),
		}),
	],
});
