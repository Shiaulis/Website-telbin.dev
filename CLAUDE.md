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

**Component-based single-page portfolio:**

```
src/
├── components/
│   ├── Navigation.astro       - Top navigation bar with social links
│   ├── Footer.astro            - Footer with copyright year
│   ├── HeroSection.astro       - Hero section with bio and headshot
│   ├── ExperienceSection.astro - Experience section (placeholder)
│   └── ContactSection.astro    - Contact form section
├── layouts/
│   └── BaseLayout.astro        - Base HTML structure with meta tags, SEO
├── pages/
│   └── index.astro             - Main page (composes all components)
└── styles/
    └── global.css              - All styles including dark mode support

public/
├── images/                     - Images (headshot, etc.)
└── favicon.svg
```

**Adding new sections:** Create a new component in `src/components/` and import it in `index.astro`.

## Deployment

Pushes to `master` branch automatically trigger GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
1. Builds the Astro site (`npm run build`)
2. Deploys `dist/` folder to Hostinger via FTP

**Required secrets** (already configured):
- `FTP_HOST`
- `FTP_USER`
- `FTP_PASS`
- `FTP_TARGET_DIR`

## Key Features

- Dark mode support via CSS media queries
- SEO meta tags (Open Graph, Twitter Cards)
- Contact form using FormSubmit.co service
- External links to GitHub, LinkedIn, email
