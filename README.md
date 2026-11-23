<div align="center">
  <a href="https://telbin.dev">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="brand/waypoint-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="brand/waypoint-light.svg">
      <img alt="telbin.dev Waypoint mark" src="brand/waypoint-light.svg" width="64" height="64">
    </picture>
  </a>

  <h1>telbin.dev</h1>

  <p>
    Personal website, portfolio, and blog of <strong>Andrius Shiaulis</strong> — Senior Software Engineer &amp; AI Workflow Advisor.
  </p>

  <p>
    <a href="https://telbin.dev"><strong>telbin.dev</strong></a> ·
    <a href="BRAND.md">Brand Guide</a> ·
    <a href="https://github.com/Shiaulis/Website-telbin.dev/actions/workflows/deploy.yml">
      <img src="https://github.com/Shiaulis/Website-telbin.dev/actions/workflows/deploy.yml/badge.svg" alt="Deploy to Hostinger via rsync over SSH">
    </a>
  </p>
</div>

---

## Overview

Built with [Astro](https://astro.build/) as a fast, zero-JavaScript-framework static site with type-safe Markdown content collections and automatic light/dark theming.

- **Static-first performance** — Pre-rendered HTML & CSS with Astro image optimization (`src/assets/`) and zero client-side UI framework overhead.
- **Adaptive Waypoint brand system** — Light and dark mode color tokens (`#4D6B1A` sage / `#CBD689` lime) paired with **Plus Jakarta Sans**. Full specifications and SVG assets live in [`BRAND.md`](BRAND.md).
- **Obsidian-friendly blog** — Type-safe Markdown blog powered by Astro Content Collections (`src/content/blog/`) with draft preview support.
- **SEO & sharing ready** — Canonical URLs, auto-generated XML sitemap (`@astrojs/sitemap`), Open Graph & Twitter card metadata with a generated preview image per post (`/og/<slug>.png`), JSON-LD structured data, and a custom `404` page.
- **Full-text RSS feed** — Published posts at `/rss.xml`, advertised in every page's `<head>` and linked from the blog index.
- **Security headers & CSP** — Enforced Content-Security-Policy (build-time hashes via `security.csp` in `astro.config.mjs`, plus a header part in `public/.htaccess`), HSTS and other security headers.
- **Automated deployment** — Validated with `astro check` and deployed to Hostinger via GitHub Actions on every push to `master`.

## Tech Stack

- **Framework:** [Astro 7](https://astro.build/)
- **Language:** TypeScript (`astro check`)
- **Styling:** Vanilla CSS with custom properties and `prefers-color-scheme` dark mode (`src/styles/global.css`)
- **Content:** Astro Content Collections (Markdown + Zod schema validation)
- **CI/CD:** GitHub Actions → Hostinger (rsync over SSH)

## Project Structure

- `src/pages/` — file-based routes (home, about, blog, RSS feed, social preview images, 404)
- `src/components/` and `src/layouts/` — UI sections and the shared HTML head (SEO, Open Graph, JSON-LD)
- `src/content/blog/` — Markdown blog posts
- `public/` — files served as-is (`.htaccess`, favicons, `robots.txt`)
- `brand/` — Waypoint logo SVGs and banners (see [`BRAND.md`](BRAND.md))

See [`AGENTS.md`](AGENTS.md) for the full project map.

## Development

Requires **Node.js 22+**.

```bash
npm ci               # Install exact dependencies from package-lock.json
npm run dev          # Start local dev server at http://localhost:4321
npm run check        # Run Astro & TypeScript diagnostics
npm run build        # Build production static site to ./dist/
npm run preview      # Preview the production build locally
```

## Writing Blog Posts

Blog posts live in `src/content/blog/` as Markdown files (compatible with using the folder directly as an Obsidian vault):

```yaml
---
title: "Post Title"
description: "Brief summary for listings and Open Graph tags"
pubDate: 2026-11-19
updatedDate: 2026-11-21  # Optional: shown as "Updated" and used as the modified date
draft: true              # Optional: visible in local dev, excluded from production builds
tags: ["ai", "swift"]
image: "/images/post.png" # Optional: overrides the generated /og/<slug>.png preview image
---

Post content here...
```

`title`, `description` and `pubDate` are required; everything else is optional (schema in `src/content.config.ts`).

## Deployment

Pushes to `master` automatically trigger [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which runs `npm ci`, verifies types with `npm run check`, builds `./dist/`, and syncs the output to Hostinger with rsync over SSH.

## License

- **Source code** (Astro components, layouts, styles, and configuration): [MIT License](LICENSE)
- **Content & brand assets** (blog posts in `src/content/`, personal bio/experience data, images in `src/assets/`, and brand marks in `brand/`): © Andrius Shiaulis. All rights reserved.
