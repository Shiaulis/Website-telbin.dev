# Project instructions

## Project overview

Personal portfolio website for Andrius Shiaulis, a Senior Software Engineer & AI Workflow Advisor. Built with Astro 7.4.12 and deployed automatically via GitHub Actions to Hostinger with rsync over SSH.

## Communication

The repository owner is a Senior iOS developer, not primarily a web developer. On every web change (Astro, HTML, CSS, SEO, or CI), include a very brief explanation of why the change is needed and what practical difference it makes.

## Development commands

```bash
npm ci               # Install the exact dependencies from package-lock.json
npm run dev          # Start dev server at localhost:4321
npm run build        # Build production site to ./dist/
npm run preview      # Preview build locally before deploying
npm run check        # Run Astro/TypeScript diagnostics
```

There is no test script in `package.json`; use `npm run check` and `npm run build` to verify changes unless the user requests another verification step.

## Architecture

Component-based portfolio with a blog:

```text
src/
├── assets/
│   ├── hero-sketch.jpg           - Hero portrait sketch
│   ├── author-photo.jpg          - Author photo (blog byline avatar, Person JSON-LD image)
│   └── og-banner.png             - Default 1200x630 Open Graph / Twitter preview banner
├── components/
│   ├── Navigation.astro          - Top navigation bar with contact popover
│   ├── Footer.astro              - Footer with copyright year
│   ├── Icon.astro                - Inline SVG icons (arrow-left, external-link, info, rss)
│   ├── HeroSection.astro         - Hero section with bio and sketch portrait
│   ├── HowIHelpSection.astro     - Services and advisory capabilities section
│   └── ExperienceSection.astro   - Experience timeline (uses data/experience.ts)
├── content.config.ts             - Content Collections configuration
├── content/
│   └── blog/                     - Blog posts (Markdown)
├── data/
│   └── experience.ts             - Professional experience and competencies data
├── layouts/
│   └── BaseLayout.astro          - Base HTML structure with meta tags, SEO
├── pages/
│   ├── index.astro               - Main page (Hero + How I Help)
│   ├── about.astro               - About page (bio, competencies, experience timeline)
│   ├── 404.astro                 - Custom 404 error page
│   ├── ipad-cases.astro          - Unlisted iPad case comparison page (noindex, excluded from sitemap)
│   ├── rss.xml.ts                - RSS feed with full text of published (non-draft) blog posts at /rss.xml
│   ├── og/
│   │   └── [...slug].png.ts      - Build-time 1200x630 social preview image per blog post (satori + sharp)
│   └── blog/
│       ├── index.astro           - Blog listing page
│       └── [...slug].astro       - Dynamic blog post pages
└── styles/
    └── global.css                - All styles including dark mode support

public/
├── .htaccess                     - 404 page, www→apex redirect, security headers (incl. CSP part 1), 1-year /_astro/ caching, no-cache for HTML/XML
├── robots.txt                    - Crawler directives
├── favicon.svg                   - Adaptive Waypoint favicon
└── apple-touch-icon.png          - 180x180 PNG icon for iOS/iPadOS (SVG favicons are unsupported there)

brand/                            - Waypoint logo SVGs, usage sheet, and LinkedIn banner
BRAND.md                          - Brand guidelines, palette tokens, and logo usage
```

To add a section, create a component in `src/components/` and import it in `src/pages/index.astro`.

## Blog post management

Blog posts are written directly in Obsidian. The user's Obsidian vault points to `src/content/blog/`.

- The user creates Markdown files there.
- Work in progress posts can use `draft: true` in frontmatter.
- When asked to publish a draft, remove `draft: true` (or set it to `false`).
- Drafts are included in local development previews and filtered from the production listing and generated routes. The `draft` flag is a publishing control, not a privacy control for source files committed to the repository.
- Drafts appear in the local `/blog` listing and can be previewed at their `/blog/<slug>/` URL.
- `.obsidian/` is gitignored.

Frontmatter format:

```yaml
---
title: "Post Title"
description: "Brief description"
pubDate: 2025-10-03
updatedDate: 2025-10-10  # Optional: shown as "Updated" and used as the modified date
draft: true              # Optional: true hides the post from published listing
tags: ["tag1", "tag2"]
image: "/images/post.png" # Optional: overrides the generated /og/<slug>.png preview image
---

Post content here...
```

Required fields: `title` (string), `description` (string), and `pubDate` (date in `YYYY-MM-DD` format). Optional fields: `updatedDate` (date), `draft` (boolean), `tags` (array of strings), and `image` (string path or URL; overrides the generated Open Graph image).

## Deployment

Pushes to `master` automatically trigger `.github/workflows/deploy.yml`, which builds the Astro site and deploys `dist/` to Hostinger with rsync over SSH (key-based login, pinned host key). The required `SSH_HOST`, `SSH_PORT`, `SSH_USER`, `SSH_TARGET_DIR`, `SSH_PRIVATE_KEY`, and `SSH_KNOWN_HOSTS` secrets are already configured.

Hostinger's CDN (`server: hcdn`) sits in front of the site and caches static assets (images, fonts, CSS, JS) together with their response headers. After a deploy that changes `public/.htaccess` headers, purge the CDN cache in hPanel (the website's CDN settings) so cached assets pick up the new headers. HTML and XML aren't cached by the CDN (`x-hcdn-cache-status: DYNAMIC`) and send `Cache-Control: no-cache`, so new pages show up immediately.

CI (`.github/workflows/ci.yml`) and deploy both build on Node 24 LTS. `engines.node` in `package.json` (`>=22.23.4`) mirrors Astro 7's own minimum.

Before deploying, let the user test changes locally:

1. Make the requested changes.
2. Run `npm run dev` and make the local preview available at `http://localhost:4321/`.
3. Let the user preview and approve the changes.
4. Only after approval, commit, push, and deploy.
5. Monitor the GitHub Actions deployment to completion.

Never push changes without the user's testing and approval first.

## Key features

- Type-safe blog content collections with Markdown and tags.
- Experience timeline driven by `src/data/experience.ts`.
- Automatic dark mode via CSS media queries.
- Open Graph and Twitter Card metadata, including publish dates, image alt text, and per-post generated preview images (`/og/<slug>.png`; a post's `image` frontmatter overrides it).
- Full-text RSS feed at `/rss.xml` (published posts only), advertised via `<link rel="alternate">` and linked from the blog index.
- JSON-LD structured data (Person/WebSite on home, ProfilePage on About, BlogPosting on posts) built in `BaseLayout.astro`.
- Responsive mobile navigation and layouts.
- Enforced Content-Security-Policy in two parts. `security.csp` in `astro.config.mjs` makes Astro add a `<meta>` CSP to every page with build-time sha256 hashes of its bundled inline scripts and styles, so editing those needs no manual hash updates. `public/.htaccess` sends `frame-ancestors`, `object-src`, `base-uri` and `form-action` as a header; never add `default-src`, `script-src` or `style-src` there, because it would block the hashed inline code.
  - Loading anything from a new external host (image, font, script, `fetch`) needs that host added to the matching directive in `astro.config.mjs`.
  - These are not hashed and will be blocked: `<script is:inline>`, inline `style="..."` attributes, inline event handlers (`onclick=`), and Shiki syntax highlighting (turned off via `markdown.syntaxHighlight: false`; use Prism plus a theme stylesheet if highlighting is wanted).
  - CSP isn't applied by `npm run dev`; verify with `npm run build && npm run preview` and check the browser console for "Content Security Policy" errors.

## Review guidelines

When reviewing pull requests for this repository:

- Focus on real issues: broken routes/links, Astro/TypeScript errors, accessibility regressions, SEO/Open Graph metadata mistakes, light/dark mode contrast problems, and CI/security risks.
- Skip minor formatting or stylistic nitpicks.
- For dependency updates (e.g. Dependabot PRs), check for breaking changes or peer-dependency conflicts with Astro and `@astrojs/check`.
- Keep feedback concise and explain web-specific issues briefly in practical terms.

CodeRabbit auto-approval is intentionally enabled (`reviews.auto_approvals` in `.coderabbit.yaml`): CodeRabbit approves PRs that have no open findings. For agent-driven PRs, that approval is the merge gate, together with passing CI. `master` has no branch protection, so the owner can still merge or block any PR whatever CodeRabbit says.
