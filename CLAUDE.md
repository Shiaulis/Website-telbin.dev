# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Andrius Shiaulis, an iOS developer. Built with Astro 5.5.2 and deployed automatically via GitHub Actions to Hostinger FTP.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:4321
npm run build        # Build production site to ./dist/
npm run preview      # Preview build locally before deploying
```

## Architecture

**Component-based portfolio with blog:**

```
src/
├── components/
│   ├── Navigation.astro         - Top navigation bar with social links
│   ├── Footer.astro              - Footer with copyright year
│   ├── HeroSection.astro         - Hero section with bio and headshot
│   ├── ExperienceSection.astro   - Experience timeline (uses data/experience.ts)
│   └── ContactSection.astro      - Contact form section
├── content/
│   ├── config.ts                 - Content Collections configuration
│   └── blog/                     - Blog posts (Markdown/MDX)
│       ├── welcome.md
│       └── swift-async-await.md
├── data/
│   └── experience.ts             - Professional experience data
├── layouts/
│   └── BaseLayout.astro          - Base HTML structure with meta tags, SEO
├── pages/
│   ├── index.astro               - Main page (composes all components)
│   └── blog/
│       ├── index.astro           - Blog listing page
│       └── [...slug].astro       - Dynamic blog post pages
└── styles/
    └── global.css                - All styles including dark mode support

public/
├── images/                       - Images (headshot, etc.)
└── favicon.svg
```

**Adding new sections:** Create a new component in `src/components/` and import it in `index.astro`.

## Blog Post Management

**Blog posts are written directly in Obsidian:**

User has Obsidian vault pointing to: `src/content/blog/`

**Publishing workflow:**

1. User creates new markdown files in Obsidian (in `src/content/blog/`)
2. **Drafts:** User marks work-in-progress posts with `draft: true` in frontmatter
3. **Publishing:** When user wants to publish a draft, they ask Claude to remove the `draft: true` line
4. Blog listing automatically filters out drafts from the live site
5. Drafts are visible locally at http://localhost:4321/blog for preview

**Frontmatter format:**
```yaml
---
title: "Post Title"
description: "Brief description"
pubDate: 2025-10-03
draft: true              # Optional: omit or set to false to publish
tags: ["tag1", "tag2"]
---

Post content here...
```

**Frontmatter requirements:**
- `title` (string) - Post title
- `description` (string) - Brief description for listing/SEO
- `pubDate` (date) - Publication date in YYYY-MM-DD format
- `draft` (boolean) - Optional, `true` = not published, omit or `false` = published
- `tags` (array) - Array of tag strings

**Important:**
- `.obsidian/` folder is gitignored (Obsidian settings won't be committed)
- User writes freely in Obsidian, posts stay as drafts until explicitly published
- To publish a post: remove `draft: true` from frontmatter (or set `draft: false`)
- Blog listing filters drafts automatically

## Deployment

Pushes to `master` branch automatically trigger GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
1. Builds the Astro site (`npm run build`)
2. Deploys `dist/` folder to Hostinger via FTP

**Required secrets** (already configured):
- `FTP_HOST`
- `FTP_USER`
- `FTP_PASS`
- `FTP_TARGET_DIR`

### Deployment Workflow

**IMPORTANT:** Always allow the user to test changes locally before deploying:

1. Make changes to the codebase
2. Run `npm run dev` to start local dev server at http://localhost:4321/
3. Let the user preview and approve changes
4. Only after approval: commit, push, and deploy
5. Monitor GitHub Actions deployment to completion

Never push changes without user testing first.

## Key Features

- **Blog:** Type-safe Content Collections with markdown support, tags, and syntax highlighting
- **Experience:** Dynamic experience timeline from TypeScript data file
- **Dark mode:** CSS media queries for automatic theme switching
- **SEO:** Comprehensive meta tags (Open Graph, Twitter Cards)
- **Contact form:** FormSubmit.co integration
- **Responsive:** Mobile-friendly design with adaptive navigation
