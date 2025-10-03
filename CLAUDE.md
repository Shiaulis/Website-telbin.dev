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

**Adding blog posts:** Create a new `.md` file in `src/content/blog/` with frontmatter (title, description, pubDate, tags).

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
