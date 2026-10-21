# Portfolio

Angular 22 standalone app for [himanshuanand05-works](https://github.com/himanshuan05-works) — static export, deployed to GitHub Pages.

Live site: <https://himanshuanand05-works.github.io/PersonalPortfolio/>

[![Deploy to GitHub Pages](https://github.com/himanshuanand05-works/PersonalPortfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/himanshuanand05-works/PersonalPortfolio/actions/workflows/deploy.yml)

## Stack

Angular 22 (standalone, signals, lazy routes) · SCSS · Vitest · Node 24 · npm

## Development server

```bash
npm start          # ng serve → http://localhost:4200
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm start` | Dev server with HMR |
| `npm run content` | Regenerate articles data, `sitemap.xml`, `robots.txt`, `llms.txt` |
| `npm run build` | Production build to `dist/portfolio/browser` (base href `/`) |
| `npm run build:pages` | Project-site build: base href `/PersonalPortfolio/` + route shells + `.nojekyll` |
| `npm test` | Vitest unit tests |

## Deploy to GitHub Pages

Pushing to `master`/`main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to the `github-pages` environment.

1. **Enable Pages once** — repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
   (The workflow also tries to enable it automatically via `actions/configure-pages`, but that needs admin access to the repo.)
2. **Push** — any commit to `master` triggers a deploy. Or run it manually: **Actions → Deploy to GitHub Pages → Run workflow**.
3. The site is served at `https://himanshuanand05-works.github.io/PersonalPortfolio/`.

### Project site vs custom domain

This repo is a **project site**, so the build uses `--base-href=/PersonalPortfolio/` (`npm run build:pages`). For a user/organization site (`<user>.github.io`) or a custom domain, use `npm run build` (base href `/`) and update:

- `content/site.config.json` → `siteUrl` (sitemap, robots, `llms.txt`)
- `src/index.html` → static `canonical` + `og:url`
- add a `public/CNAME` file with your domain and point DNS at GitHub Pages

### Deep links

`scripts/postbuild.mjs` writes a folder shell (`<route>/index.html`) for every static route and article so GitHub Pages serves deep links, plus `.nojekyll` so `_`-prefixed asset folders are published. Unknown paths fall back to `public/404.html`.

## Layout

- `src/app/features/<route>/` — one page per route (`*Page` class, colocated `.html` + `.scss`)
- `src/app/shared/ui/` — presentational `ui-*` components
- `src/app/core/data/` — typed constants (`PROFILE`, `EXPERIENCE`, `PROJECTS`, …)
- `src/app/core/services/` — `SeoService`, `JsonLdService`
- `content/` — articles (markdown) and `site.config.json`
- `scripts/build-meta.mjs` — generates articles, sitemap, `llms.txt`
- `scripts/postbuild.mjs` — route shells, `.nojekyll`
