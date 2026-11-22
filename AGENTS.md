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
│   ├── thanks.astro              - Contact form confirmation page
│   ├── rss.xml.ts                - RSS feed with full text of published (non-draft) blog posts at /rss.xml
│   ├── og/
│   │   └── [...slug].png.ts      - Build-time 1200x630 social preview image per blog post (satori + sharp)
│   └── blog/
│       ├── index.astro           - Blog listing page
│       └── [...slug].astro       - Dynamic blog post pages
└── styles/
    └── global.css                - All styles including dark mode support

public/
├── .htaccess                     - 404 page, www→apex redirect, security headers, 1-year /_astro/ caching
├── robots.txt                    - Crawler directives
├── favicon.svg                   - Adaptive Waypoint favicon
└── apple-touch-icon.png          - 180x180 PNG icon for iOS/iPadOS (SVG favicons are unsupported there)
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
draft: true              # Optional: true hides the post from published listing
tags: ["tag1", "tag2"]
---

Post content here...
```

Required fields: `title` (string), `description` (string), and `pubDate` (date in `YYYY-MM-DD` format). `draft` is optional and boolean; `tags` is an array of strings.

## Deployment

Pushes to `master` automatically trigger `.github/workflows/deploy.yml`, which builds the Astro site and deploys `dist/` to Hostinger with rsync over SSH (key-based login, pinned host key). The required `SSH_HOST`, `SSH_PORT`, `SSH_USER`, `SSH_TARGET_DIR`, `SSH_PRIVATE_KEY`, and `SSH_KNOWN_HOSTS` secrets are already configured.

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
- Contact form integrated with FormSubmit.co.
- Responsive mobile navigation and layouts.

## Review guidelines

When reviewing pull requests for this repository:

- Focus on real issues: broken routes/links, Astro/TypeScript errors, accessibility regressions, SEO/Open Graph metadata mistakes, light/dark mode contrast problems, and CI/security risks.
- Skip minor formatting or stylistic nitpicks.
- For dependency updates (e.g. Dependabot PRs), check for breaking changes or peer-dependency conflicts with Astro and `@astrojs/check`.
- Keep feedback concise and explain web-specific issues briefly in practical terms.
