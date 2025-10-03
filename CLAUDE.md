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

**Simple single-page site structure:**
- `src/pages/index.astro` - Main page with inline HTML (not using Layout.astro component)
- `src/styles/styles.css` - All styles including dark mode support
- `src/layouts/Layout.astro` - Unused layout component (site uses inline HTML instead)
- `public/` - Static assets (favicon, images)

**Note:** The site currently doesn't use Astro layouts or components in the main page. All content is in `src/pages/index.astro` as a single-page portfolio.

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
