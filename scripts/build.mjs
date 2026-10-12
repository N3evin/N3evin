import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { renderHome, renderProject, render404 } from "../src/templates.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "_site");
const args = new Set(process.argv.slice(2));
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));

const site = readJson("content/site.json");
const projects = readJson("content/projects.json");
const cachePath = path.join(root, "content/github-cache.json");

async function fetchStats() {
  const headers = { "User-Agent": "n3evin-site-build", Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com/users/${site.githubUser}/repos?per_page=100`, {
    headers,
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const repos = await res.json();
  if (!Array.isArray(repos)) throw new Error("unexpected response");
  const map = {};
  for (const r of repos)
    map[r.name] = {
      stars: r.stargazers_count,
      forks: r.forks_count,
      pushed: String(r.pushed_at).slice(0, 10),
      archived: !!r.archived,
    };
  return map;
}

async function loadStats() {
  const cache = readJson("content/github-cache.json");
  if (args.has("--offline")) {
    console.log("GitHub stats: cache (--offline)");
    return cache;
  }
  try {
    const live = await fetchStats();
    const merged = { ...cache };
    for (const p of projects) if (p.repo && live[p.repo]) merged[p.repo] = live[p.repo];
    console.log("GitHub stats: live API");
    if (args.has("--update-cache")) {
      const slim = {};
      for (const p of projects) if (p.repo && merged[p.repo]) slim[p.repo] = merged[p.repo];
      fs.writeFileSync(cachePath, JSON.stringify(slim, null, 2) + "\n");
      console.log("Cache updated: content/github-cache.json");
    }
    return merged;
  } catch (e) {
    console.log(`GitHub stats: cache (fetch failed: ${e.message})`);
    return cache;
  }
}

const hash = (file) =>
  crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex").slice(0, 8);

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dest, e.name);
    e.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

function write(rel, content) {
  const f = path.join(out, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
}

async function build() {
  const stats = await loadStats();
  const ver = {
    css: hash(path.join(root, "src/styles.css")),
    js: hash(path.join(root, "src/main.js")),
  };
  const ctx = { site, projects, stats, ver, year: new Date().getFullYear() };

  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });

  write("index.html", renderHome(ctx));
  const detailed = projects.filter((p) => p.detail);
  for (const p of detailed) write(`projects/${p.slug}/index.html`, renderProject(ctx, p));
  write("404.html", render404(ctx));

  const urls = ["/", ...detailed.map((p) => `/projects/${p.slug}/`)];
  const today = new Date().toISOString().slice(0, 10);
  write(
    "sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${site.url}${u}</loc><lastmod>${today}</lastmod></url>`)
      .join("\n")}\n</urlset>\n`
  );
  write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
  write("CNAME", "n3evin.com");
  write(".nojekyll", "");
  copyDir(path.join(root, "assets"), path.join(out, "assets"));
  fs.copyFileSync(path.join(root, "src/styles.css"), path.join(out, "styles.css"));
  fs.copyFileSync(path.join(root, "src/main.js"), path.join(out, "main.js"));
  console.log(`Built ${urls.length + 1} pages -> _site (css ${ver.css}, js ${ver.js})`);
}

const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".xml": "application/xml",
  ".txt": "text/plain", ".json": "application/json",
};

function serve() {
  http
    .createServer((req, res) => {
      let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
      let file = path.join(out, path.normalize(p));
      if (!file.startsWith(out)) file = "";
      if (file && fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
      let status = 200;
      if (!file || !fs.existsSync(file)) {
        file = path.join(out, "404.html");
        status = 404;
      }
      res.writeHead(status, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
      fs.createReadStream(file).pipe(res);
    })
    .listen(4321, () => console.log("Serving _site at http://localhost:4321"));
}

await build();
if (args.has("--serve")) serve();
