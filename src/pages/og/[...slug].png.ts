import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

// Builds a 1200x630 social preview image for every blog post at build time.
// Output: /og/<post-slug>.png (referenced from the post's og:image tag).

export const getStaticPaths = (async () => {
	const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
	return posts.map((post) => ({ params: { slug: post.id }, props: post }));
}) satisfies GetStaticPaths;

const fontFile = (pkg: string, file: string) =>
	readFile(resolve(process.cwd(), 'node_modules/@fontsource', pkg, 'files', file));

const fontsPromise = Promise.all([
	fontFile('plus-jakarta-sans', 'plus-jakarta-sans-latin-700-normal.woff').then((data) => ({ name: 'Jakarta', data, weight: 700 as const })),
	fontFile('plus-jakarta-sans', 'plus-jakarta-sans-latin-ext-700-normal.woff').then((data) => ({ name: 'Jakarta Extended', data, weight: 700 as const })),
	fontFile('plus-jakarta-sans', 'plus-jakarta-sans-latin-500-normal.woff').then((data) => ({ name: 'Jakarta', data, weight: 500 as const })),
	fontFile('plus-jakarta-sans', 'plus-jakarta-sans-latin-ext-500-normal.woff').then((data) => ({ name: 'Jakarta Extended', data, weight: 500 as const })),
	fontFile('fira-code', 'fira-code-latin-500-normal.woff').then((data) => ({ name: 'Fira Code', data, weight: 500 as const })),
]);

const colors = {
	background: '#1D1F23',
	glow: '#2A2E24',
	text: '#EEEFF1',
	muted: '#B4B8BF',
	accent: '#CBD689',
	tile: '#25282C',
	tileBorder: '#3A3D42',
};

const logo = `data:image/svg+xml;base64,${Buffer.from(
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="${colors.text}" d="M24 48H176V92H122V208H78V92H24Z"/><circle fill="${colors.accent}" cx="212" cy="70" r="20"/></svg>`,
).toString('base64')}`;

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
	type,
	props: { style, children, ...extra },
});

export const GET: APIRoute = async ({ props }) => {
	const post = props as CollectionEntry<'blog'>;
	const title = post.data.title;
	const titleSize = title.length > 70 ? 54 : title.length > 45 ? 62 : 72;
	const date = post.data.pubDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

	const tree = h(
		'div',
		{
			width: 1200,
			height: 630,
			boxSizing: 'border-box',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			padding: '72px 80px',
			backgroundColor: colors.background,
			backgroundImage: `radial-gradient(circle at 85% 15%, ${colors.glow} 0%, ${colors.background} 55%)`,
			fontFamily: 'Jakarta',
			color: colors.text,
		},
		[
			h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, [
				h(
					'div',
					{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: 88,
						height: 88,
						borderRadius: 22,
						backgroundColor: colors.tile,
						border: `2px solid ${colors.tileBorder}`,
					},
					h('img', { width: 56, height: 56 }, undefined, { src: logo, width: 56, height: 56 }),
				),
				h('div', { display: 'flex', fontFamily: 'Fira Code', fontSize: 36, color: colors.muted }, 'telbin.dev'),
			]),
			h('div', { display: 'flex', fontSize: titleSize, fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em' }, title),
			// Small text is sized to stay readable when platforms shrink the card to ~400px wide in feeds.
			h('div', { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }, [
				h('div', { display: 'flex', flexDirection: 'column', gap: 6 }, [
					h('div', { display: 'flex', fontSize: 42, fontWeight: 700, color: colors.accent }, 'Andrius Shiaulis'),
					h('div', { display: 'flex', fontSize: 32, fontWeight: 500, color: colors.muted }, 'Senior Software Engineer & AI Workflow Advisor'),
				]),
				h('div', { display: 'flex', fontSize: 32, fontWeight: 500, color: colors.muted }, date),
			]),
		],
	);

	const svg = await satori(tree as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts: await fontsPromise });
	const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();

	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
