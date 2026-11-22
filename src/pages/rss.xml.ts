import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getCollection, render } from 'astro:content';

// RSS feed of published blog posts at /rss.xml, for feed readers and aggregators.
// Each item carries the full post HTML, rendered by Astro exactly as on the site.
// Drafts are always left out, even in local dev, so the feed never leaks unpublished work.

export const GET: APIRoute = async (context) => {
	const site = context.site ?? new URL('https://telbin.dev');
	const posts = (await getCollection('blog', ({ data }) => !data.draft))
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
	const container = await AstroContainer.create();

	// Feed readers show posts outside telbin.dev, so site-relative links ("/about/") must become absolute.
	// Only attributes inside real tags are rewritten; code text is HTML-escaped ("&lt;"), so examples stay as written.
	const siteRoot = new URL('/', site).href;
	const absolutizeLinks = (html: string) =>
		html.replace(/<[a-z][^>]*>/gi, (tag) => tag.replace(/(\s(?:href|src)=")\/(?!\/)/gi, `$1${siteRoot}`));

	const items = await Promise.all(posts.map(async (post) => {
		const { Content } = await render(post);
		const html = await container.renderToString(Content);
		return {
			title: post.data.title,
			description: post.data.description,
			content: absolutizeLinks(html),
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
			categories: post.data.tags,
		};
	}));

	return rss({
		title: 'Andrius Shiaulis',
		description: 'Thoughts on AI workflows, software architecture, and practical engineering',
		site,
		xmlns: { atom: 'http://www.w3.org/2005/Atom' },
		customData: [
			'<language>en-us</language>',
			`<atom:link href="${new URL('/rss.xml', site).href}" rel="self" type="application/rss+xml"/>`,
		].join(''),
		items,
	});
};
