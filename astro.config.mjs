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
			// No italic file (~30 KB): only the short hero greeting is italic, and the browser's
			// slanted version of the upright font looks nearly the same there.
			styles: ['normal'],
			subsets: ['latin', 'latin-ext'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Source Serif 4',
			cssVariable: '--font-source-serif',
			// Static 400/700 files instead of the variable font: blog text only uses regular and bold,
			// and the variable file was ~120 KB, most of a post page's download.
			weights: [400, 700],
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
	// Content-Security-Policy: Astro adds a <meta> CSP to every page with sha256 hashes of its own
	// inline scripts and styles (computed at build time, so they never go stale). The directives
	// that don't depend on hashes and must cover the whole response (frame-ancestors can't go in a
	// <meta> tag at all) are sent as a second policy header from public/.htaccess.
	security: {
		csp: {
			directives: [
				"default-src 'self'",
				// /ipad-cases hotlinks product photos from these two stores.
				"img-src 'self' https://galador.b-cdn.net https://www.euronics.ee",
				"font-src 'self'",
				"connect-src 'self'",
				'upgrade-insecure-requests',
			],
		},
	},
	// Shiki colours code blocks with inline style="" attributes, which the CSP above blocks.
	// Code blocks are styled by .post-content pre in global.css instead.
	markdown: {
		syntaxHighlight: false,
	},
	integrations: [
		sitemap({
			filter: (page) => !/^\/(404|ipad-cases)\/?$/.test(new URL(page).pathname),
		}),
	],
});
