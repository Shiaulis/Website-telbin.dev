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
      <img src="https://github.com/Shiaulis/Website-telbin.dev/actions/workflows/deploy.yml/badge.svg" alt="Deploy to Hostinger FTPS">
    </a>
  </p>
</div>

---

## Overview

Built with [Astro](https://astro.build/) as a fast, zero-JavaScript-framework static site with type-safe Markdown content collections and automatic light/dark theming.

- **Static-first performance** — Pre-rendered HTML & CSS with Astro image optimization (`src/assets/`) and zero client-side UI framework overhead.
- **Adaptive Waypoint brand system** — Light and dark mode color tokens (`#4D6B1A` sage / `#CBD689` lime) paired with **Plus Jakarta Sans**. Full specifications and SVG assets live in [`BRAND.md`](BRAND.md).
- **Obsidian-friendly blog** — Type-safe Markdown blog powered by Astro Content Collections (`src/content/blog/`) with draft preview support.
- **SEO & sharing ready** — Canonical URLs, auto-generated XML sitemap (`@astrojs/sitemap`), Open Graph & Twitter card metadata, and custom `404` routing.
- **Automated deployment** — Validated with `astro check` and deployed to Hostinger via GitHub Actions on every push to `master`.

## Tech Stack

- **Framework:** [Astro 7](https://astro.build/)
- **Language:** TypeScript (`astro check`)
- **Styling:** Vanilla CSS with custom properties and `prefers-color-scheme` dark mode (`src/styles/global.css`)
- **Content:** Astro Content Collections (Markdown + Zod schema validation)
- **CI/CD:** GitHub Actions → Hostinger FTPS

## Project Structure

```text
├── brand/                        # Waypoint logo SVGs, usage sheet, and LinkedIn banner
├── public/
│   ├── .htaccess                 # Apache custom 404 routing
│   ├── favicon.svg               # Adaptive Waypoint favicon
│   └── robots.txt                # Crawler directives & sitemap pointer
├── src/
│   ├── assets/                   # Build-optimized images (hero sketch, Open Graph banner)
│   ├── components/               # UI sections (Navigation, Hero, HowIHelp, Experience, Footer)
│   ├── content/blog/             # Markdown blog posts
│   ├── content.config.ts         # Content Collections schema
│   ├── data/experience.ts        # Work history timeline & core competencies data
│   ├── layouts/BaseLayout.astro  # Shared HTML head, SEO, and Open Graph metadata
│   ├── pages/                    # File-based routes (/, /about, /blog, /thanks, /404)
│   └── styles/global.css         # Design tokens, typography, and component styles
├── AGENTS.md                     # Instructions and context for AI coding agents
└── BRAND.md                      # Brand guidelines, palette tokens, and logo usage
```

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
draft: true              # Optional: visible in local dev, excluded from production builds
tags: ["ai", "swift"]
---

Post content here...
```

## Deployment

Pushes to `master` automatically trigger [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which runs `npm ci`, verifies types with `npm run check`, builds `./dist/`, and syncs the output to Hostinger via FTPS (FTP over TLS).

## License

- **Source code** (Astro components, layouts, styles, and configuration): [MIT License](LICENSE)
- **Content & brand assets** (blog posts in `src/content/`, personal bio/experience data, images in `src/assets/`, and brand marks in `brand/`): © Andrius Shiaulis. All rights reserved.
