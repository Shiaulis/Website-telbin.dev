import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { Element, Root, RootContent } from 'hast';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

// RSS feed of published blog posts at /rss.xml, for feed readers and aggregators.
// Each item carries the full post HTML, as rendered from Markdown at build time.
// That stored HTML can't resolve images placed next to a post (`![](./pic.png)`), so post images
// belong in public/ and are referenced by absolute path (`![](/images/pic.png)`).
// Drafts are always left out, even in local dev, so the feed never leaks unpublished work.

export const GET: APIRoute = async (context) => {
	const site = context.site ?? new URL('https://telbin.dev');
	const posts = (await getCollection('blog', ({ data }) => !data.draft))
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	// Feed readers show posts outside telbin.dev, so site-relative links ("/about/") must become absolute.
	// The HTML is parsed (not regex-matched), so any quoting style works and code examples stay as written.
	const absolutizeLinks = (node: Root | RootContent) => {
		if (node.type === 'element') {
			for (const name of ['href', 'src'] as const) {
				const value = (node as Element).properties[name];
				if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) {
					(node as Element).properties[name] = new URL(value, site).href;
				}
			}
		}
		if ('children' in node) node.children.forEach(absolutizeLinks);
	};
	const toFeedHTML = unified()
		.use(rehypeParse, { fragment: true })
		.use(() => absolutizeLinks)
		.use(rehypeStringify);

	const items = await Promise.all(posts.map(async (post) => ({
		title: post.data.title,
		description: post.data.description,
		content: String(await toFeedHTML.process(post.rendered?.html ?? '')),
		pubDate: post.data.pubDate,
		link: `/blog/${post.id}/`,
		categories: post.data.tags,
	})));

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
