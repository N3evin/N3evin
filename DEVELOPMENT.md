# Development

## Overview

Zero-dependency static site generator for n3evin.com. `content/*.json` and `src/templates.mjs` are rendered by `scripts/build.mjs` into `_site/`, which GitHub Pages deploys. No npm install, no framework.

## Requirements

- Node.js 20+ (uses global `fetch`, `AbortSignal.timeout`, top-level `await`)

## Commands

Run from the repo root.

- `node scripts/build.mjs` — fetches GitHub repo stats (falls back to cache on failure), wipes and rebuilds `_site/`.
- `node scripts/build.mjs --offline` — builds using `content/github-cache.json` only. No network.
- `node scripts/build.mjs --serve` — builds, then serves `_site/` at http://localhost:4321. Does not rebuild on change; re-run the command after edits. Unknown paths return `404.html`.
- `node scripts/build.mjs --update-cache` — after a successful live fetch, rewrites `content/github-cache.json` with stats for projects that have a `repo`. Ignored with `--offline` or when the fetch fails.

Flags can be combined, e.g. `--update-cache --serve`.

## Repository structure

```text
.github/workflows/deploy-pages.yml  Build and deploy to GitHub Pages
assets/                             Images: nevin.jpg, favicon.svg, projects/<slug>/
content/site.json                   Site text and settings
content/projects.json               Project list
content/github-cache.json           Fallback GitHub stars/forks
scripts/build.mjs                   Generator, --serve, --update-cache
src/templates.mjs                   HTML rendering (no framework)
src/styles.css, src/main.js         Copied into _site/ as-is
src/og.html                         Source for the social image
README.md                           GitHub profile README (not the site)
_site/                              Build output (gitignored)
```

## Editing content

`content/site.json` holds all page copy. Main keys:

- `hero` — headline, eyebrow, CTA buttons
- `about` — bio section
- `expertise` — skills cards (`span`, `tablet`, `tone`, `icon`, `title`, `text`)
- `beyond` — personal interest tiles
- `contact` — contact section
- `nav` — header and footer links
- `social` — links; the entry with `id: "github"` drives the GitHub links, `id: "mail"` is the email entry

Other keys: `url`, `name`, `role`, `location`, `email`, `githubUser`, `title`, `description`, `photo`, `projects` (section heading), `openSource`.

## Adding a project

Append an object to `content/projects.json`. Minimal example:

```json
{
  "slug": "my-project",
  "name": "My Project",
  "kind": "Open-source tool",
  "tagline": "One-line pitch.",
  "summary": "Slightly longer description for the card.",
  "span": 6,
  "tablet": 6,
  "visual": "none",
  "repo": "My-Project",
  "stack": ["Python"],
  "highlights": ["Does a thing"],
  "links": [{ "label": "GitHub", "url": "https://github.com/N3evin/My-Project", "icon": "github" }]
}
```

Fields:

- `slug` — unique; used in URLs and element IDs. Required.
- `name`, `kind`, `tagline`, `summary` — card text.
- `repo` — GitHub repo name under `githubUser`; used for stats.
- `stack`, `highlights` — tags and bullet list.
- `links` — `{ label, url, primary?, icon? }`. `primary` styles the button; `icon: "github"` shows the GitHub icon.
- `showStats` — shows stars/forks on the card even if zero. The hero stat uses the first project with `showStats`.
- `span` — desktop width on a 12-column grid (default 12). `span` 7 or more renders the card wide.
- `tablet` — width on a 6-column grid (default 6).
- `featured` — at most one. Shown as the large feature block above the grid and used for the hero Pebble card. Featured projects are not repeated in the grid.
- `visual` — card visual:
  - `none` (default) — initials from `name`. No extra fields.
  - `api` — fixed API request/response illustration. No extra fields.
  - `graph` — fixed shortest-path illustration. No extra fields.
  - `photo` — requires `image: { src, w, h, alt }`. `w`/`h` must match the file's pixel size.
  - `watches` — no card visual; needs `screens` for the feature block and detail page.
- `screens` — `[{ src, frame, hero?, caption, alt }]`. `frame` is `time2` or `round2`. `hero: true` marks screens shown in the featured block. `visual: watches` detail pages show the first 3 screens in the header; all screens appear in a gallery.
- `detail` — when present, `scripts/build.mjs` generates `/projects/<slug>/`. A "Read the case study" link appears in the featured block only. Shape: `{ overview: [paragraphs], sections: [{ title, text }], extraLinks?: [{ label, url }] }`.

## Updating screenshots and images

- Project screenshots: `assets/projects/<slug>/`. Reference them as absolute paths, e.g. `/assets/projects/my-project/shot.png`.
- Photo visual: keep `image.w` and `image.h` equal to the real pixel size, or the layout shifts.
- Pebble `screens`: watch frames have fixed sizes in the template (`time2` 200x228, `round2` 260x260), so no `w`/`h` is needed in the JSON. Export screenshots at a matching aspect ratio.
- `site.photo` has its own `w`/`h` for the profile photo; keep them accurate.

## Social image

`assets/og.png` (1200x630) is referenced by the page meta tags. Regenerate from `src/og.html` with headless Edge or Chrome:

```powershell
msedge --headless=new --hide-scrollbars --window-size=1200,630 --screenshot=assets\og.png file:///<repo>/src/og.html
```

Replace `<repo>` with the absolute repo path, e.g. `C:/Users/nvu/Documents/Git/N3evin`. Commit the PNG.

## GitHub stats

- Build fetches `https://api.github.com/users/<githubUser>/repos?per_page=100` with an 8 second timeout.
- Stars and forks are merged into the matching projects by `repo`.
- On failure (network, rate limit, bad response) the build logs the reason and uses `content/github-cache.json`.
- A token is optional. If `GITHUB_TOKEN` is set, it is sent as a bearer token to raise the rate limit. The Pages workflow passes `secrets.GITHUB_TOKEN`.
- To refresh the fallback cache locally: `node scripts/build.mjs --update-cache`.

## Deployment

- Pushes to `master` or `main` run `.github/workflows/deploy-pages.yml`.
- The workflow also runs weekly (Mondays 03:00 UTC) and on manual dispatch, so star counts refresh.
- The `build` job runs `node scripts/build.mjs` and uploads `_site/`. The `deploy` job publishes it.
- Repo Settings → Pages → Source must be set to "GitHub Actions".

## Custom domain

- The domain `n3evin.com` is set in repo Settings → Pages → Custom domain.
- The build also writes `CNAME` containing `n3evin.com` into `_site/`.
- DNS:
  - Apex `n3evin.com`: A and AAAA records pointing to the GitHub Pages IPs (see GitHub Pages docs for current values).
  - Optional `www`: CNAME to `n3evin.github.io`.
- Once the certificate is issued, enable "Enforce HTTPS".
