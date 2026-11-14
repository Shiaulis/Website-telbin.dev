# telbin.dev

Personal portfolio and blog for Andrius Shiaulis, built with [Astro](https://astro.build/).

## Commands

```bash
npm ci               # Install dependencies from package-lock.json
npm run dev          # Start local dev server at http://localhost:4321
npm run check        # Run Astro & TypeScript diagnostics
npm run build        # Build static site to ./dist/
npm run preview      # Preview the production build locally
```

## Structure

- `src/pages/` — Main portfolio (`/`), contact confirmation (`/thanks/`), and blog routes (`/blog/`, `/blog/<slug>/`)
- `src/components/` — Page sections, navigation, and footer
- `src/layouts/BaseLayout.astro` — Shared HTML shell, SEO, and Open Graph / Twitter metadata
- `src/data/experience.ts` — Work experience timeline data
- `src/content/blog/` — Markdown blog posts (configured in `src/content.config.ts`)
- `public/` — Static assets served as-is (`favicon.svg`, `images/`)

## Deployment

Pushes to `master` trigger `.github/workflows/deploy.yml`, which builds `./dist/` and deploys it to Hostinger via FTP.
