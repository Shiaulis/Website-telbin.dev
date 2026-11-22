# telbin.dev brand guide

## Logo

![Waypoint in light mode](brand/waypoint-light.svg)
![Waypoint in dark mode](brand/waypoint-dark.svg)

[Adaptive SVG](brand/waypoint.svg) · [Light SVG](brand/waypoint-light.svg) · [Dark SVG](brand/waypoint-dark.svg) · [LinkedIn Banner PNG](brand/linkedin-banner.png) · [LinkedIn Banner SVG](brand/linkedin-banner.svg)

- **Website header:** Lowercase wordmark `telbin.dev` in **Plus Jakarta Sans** (`700` weight). Color the period with the sage/lime brand accent and keep letters neutral. Omit the Waypoint icon so the accent isn't doubled.
- **Favicon:** Use [brand/waypoint.svg](brand/waypoint.svg) on its own (`16 units = 1 px` on the `256×256` grid, keeping a crisp `1 px` gap between the **T** and the dot at `16 px`).
- **Banners & lockups:** Place Waypoint before a fully neutral `telbin.dev` (including a neutral period) so only the Waypoint dot carries the brand accent. Keep at least one dot-radius (`20` units) of clear space around the mark.

![Usage examples showing a lowercase wordmark in a site header, Waypoint in a browser tab, and Waypoint on a LinkedIn banner](brand/usage.svg)

## Palette

Use the sage/lime accent (`#4D6B1A` light / `#CBD689` dark) for brand signatures (Waypoint dot, wordmark period, active underlines) and interactive accents.

| Role | CSS Token | Light mode | Dark mode |
| --- | --- | --- | --- |
| Background | `--background-color` | `#EEEFF1` | `#1A1C20` |
| Foreground (`T`, wordmark, text) | `--text-color` | `#1A1C20` | `#EEEFF1` |
| Brand & interactive accent (Waypoint dot, `.`, links) | `--brand-accent` / `--link-color` | `#4D6B1A` | `#CBD689` |

### Website UI colors

Supporting neutrals for the website, defined in `src/styles/global.css`. Use them only for UI chrome, never as brand signatures.

| Role | CSS Token | Light mode | Dark mode |
| --- | --- | --- | --- |
| Muted text (dates, hero subline, card metadata) | `--muted-text-color` | `#5d616a` | `#9aa0a8` |
| Surface (capability cards, eyebrows, secondary pills) | `--surface-color` | `#E4E6EA` | `#23262C` |
| Border (cards, pills, avatar ring) | `--border-color` | `#D5D8DF` | `#2c2f36` |
| Inverted card background ("How I help" card) | `--card-bg-color` | `#1A1C20` | `#23262C` |
| Inverted card text | `--card-text-color` | `#EEEFF1` | `#EEEFF1` |

All text colors must meet WCAG AA (at least 4.5:1 for normal text) on both `--background-color` and `--surface-color`. Check the contrast before you lighten muted text.

Social preview images (`src/pages/og/[...slug].png.ts`) use their own dark-only colors, tuned for feeds.

## Typography

Use **Plus Jakarta Sans** across all brand touchpoints (wordmark, website, CV, and social banners):

- **Font stack:** `"Plus Jakarta Sans", system-ui, sans-serif`
- **Blog post text:** **Source Serif 4** (`400`–`700`, with italics) for running text inside posts only, for comfortable long-form reading. Headings stay in Plus Jakarta Sans.
- **Monospace:** **Fira Code** for eyebrows, labels and code (ligatures turned off in code).
- **Hosting:** All fonts are self-hosted through Astro's Fonts API (`fonts` in `astro.config.mjs`); never load them from Google Fonts.
- **Weights:** `700` (Bold) for the `telbin.dev` wordmark and headings; `400`–`600` for body copy and UI labels.
