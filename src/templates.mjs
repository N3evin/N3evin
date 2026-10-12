// Pure HTML template functions. All copy comes from content/*.json.

export const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/* ---------- icons ---------- */
const S = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  external: '<path d="M7 17L17 7M8 7h9v9"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/>',
  star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z"/>',
  fork: '<circle cx="6" cy="5.5" r="2"/><circle cx="18" cy="5.5" r="2"/><circle cx="12" cy="18.5" r="2"/><path d="M6 7.5V9a3 3 0 003 3h6a3 3 0 003-3V7.5M12 12v4.5"/>',
  pin: '<path d="M12 21s7-6.2 7-11.5a7 7 0 10-14 0C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  cap: '<path d="M2 9.5l10-5 10 5-10 5z"/><path d="M6 12v4.5c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5V12M22 9.5v5"/>',
  chat: '<path d="M4 5h16a1 1 0 011 1v10a1 1 0 01-1 1h-9l-5 4v-4H4a1 1 0 01-1-1V6a1 1 0 011-1z"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12.5l9 5 9-5M3 16.5l9 5 9-5"/>',
  nodes: '<circle cx="5.5" cy="6" r="2.5"/><circle cx="18.5" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 6h8M7 8.2l3.6 7.6M17 8.2l-3.6 7.6"/>',
  cloud: '<path d="M7 18a4.5 4.5 0 01-.6-8.96A6 6 0 0118 10.5 3.75 3.75 0 0117.5 18z"/>',
  code: '<path d="M8.5 7l-5 5 5 5M15.5 7l5 5-5 5M13.5 5l-3 14"/>',
  shield: '<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  camera: '<path d="M4 8h3l1.5-2.5h7L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"/><circle cx="12" cy="13" r="3.5"/>',
  cube: '<path d="M12 3l8.5 4.5v9L12 21l-8.5-4.5v-9z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9"/>',
  dice: '<path d="M12 2.5l8.5 5v9l-8.5 5-8.5-5v-9z"/><path d="M12 7l4.5 8h-9zM12 2.5V7M3.5 7.5L7.5 15M20.5 7.5L16.5 15"/>',
  server: '<rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 7h.01M7 17h.01"/>',
  chip: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
  spark: '<path d="M11 3l1.8 5.7 5.7 1.8-5.7 1.8L11 18l-1.8-5.7-5.7-1.8 5.7-1.8z"/><path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z"/>',
  watch: '<rect x="7" y="6" width="10" height="12" rx="3"/><path d="M9 6l.7-3h4.6l.7 3M9 18l.7 3h4.6l.7-3"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
};
const FILLED = {
  github:
    '<path d="M12 .5a11.5 11.5 0 00-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0012 .5z"/>',
  linkedin:
    '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45z"/>',
};

export function icon(name, cls = "") {
  const c = cls ? ` class="${esc(cls)}"` : "";
  if (FILLED[name])
    return `<svg${c} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${FILLED[name]}</svg>`;
  return `<svg${c} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${S[name] || ""}</svg>`;
}

/* ---------- small components ---------- */
const isExternal = (u) => /^https?:\/\//.test(u);
const extAttrs = (u) => (isExternal(u) ? ' target="_blank" rel="noopener"' : "");

export function button({ label, href, variant = "primary", icon: ic, trailing, cls = "" }) {
  const lead = ic ? icon(ic) : "";
  const tail = trailing ? icon(trailing) : "";
  return `<a class="btn btn--${esc(variant)} ${esc(cls)}" href="${esc(href)}"${extAttrs(href)}>${lead}<span>${esc(label)}</span>${tail}</a>`;
}

export function sectionHeading({ eyebrow, title, text, variant = "", id = "", level = 2 }) {
  return `<div class="sh ${esc(variant)}">
  <div class="sh__main"><p class="eyebrow"><span class="eyebrow__bar" aria-hidden="true"></span>${esc(eyebrow)}</p>
  <h${level}${id ? ` id="${esc(id)}"` : ""}>${esc(title)}</h${level}></div>
  ${text ? `<p class="lead">${esc(text)}</p>` : ""}
</div>`;
}

export const tags = (list = [], cls = "") =>
  list.length
    ? `<ul class="tags ${esc(cls)}">${list.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`
    : "";

const span = (o) => `--c:${Number(o.span) || 12};--t:${Number(o.tablet) || 6}`;

export const statsFor = (p, stats) => (p.repo && stats[p.repo]) || null;
const hasDetail = (p) => !!p.detail;
const projectHref = (p) => `/projects/${p.slug}/`;
const repoUrl = (site, p) => `https://github.com/${site.githubUser}/${p.repo}`;

/* ---------- header / footer ---------- */
export function header(site, current = "") {
  const cta = site.hero.secondary;
  return `<header class="site-header" id="top">
  <div class="container">
    <div class="pill">
      <a class="logo" href="/" aria-label="${esc(site.name)}, home">${esc(site.name)}<span class="logo__dot">.</span></a>
      <nav class="nav" id="site-nav" aria-label="Primary">
        <ul>${site.nav
          .map((n) => {
            const cur = current && n.href === current ? ' aria-current="page"' : "";
            return `<li><a href="${esc(n.href)}"${cur}>${esc(n.label)}</a></li>`;
          })
          .join("")}</ul>
      </nav>
      <a class="btn btn--primary btn--sm cta" href="/#contact">${esc(cta.label)}</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Menu">${icon("menu", "i-open")}${icon("close", "i-close")}</button>
    </div>
  </div>
</header>`;
}

export const socialLinks = (site, cls = "") =>
  `<ul class="social ${esc(cls)}">${site.social
    .map(
      (s) =>
        `<li><a href="${esc(s.url)}"${extAttrs(s.url)} aria-label="${esc(s.label)}">${icon(s.id)}</a></li>`
    )
    .join("")}</ul>`;

export function footer(site, year) {
  return `<footer class="site-footer">
  <div class="container footer__grid">
    <div class="footer__brand">
      <a class="logo" href="/">${esc(site.name)}<span class="logo__dot">.</span></a>
      <p class="muted">${esc(site.role)} · ${esc(site.location)}</p>
    </div>
    <nav aria-label="Footer"><ul class="footer__nav">${site.nav
      .map((n) => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`)
      .join("")}</ul></nav>
    ${socialLinks(site, "social--footer")}
  </div>
  <div class="container footer__bottom">
    <p>&copy; <span data-year>${esc(year)}</span> ${esc(site.name)}</p>
    <p>Built by hand. Hosted on GitHub Pages.</p>
  </div>
</footer>`;
}

/* ---------- decorative visuals ---------- */
export function systemMap() {
  const pills = [
    { y: 28, t: "APIs", c: "#DBEAFE", k: "#1D4ED8" },
    { y: 102, t: "Apps", c: "#EDE9FE", k: "#6D28D9" },
    { y: 176, t: "Hardware", c: "#DBEAFE", k: "#1D4ED8" },
  ];
  return `<svg class="sysmap" viewBox="0 12 400 216" aria-hidden="true" focusable="false">
  <defs><linearGradient id="smg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2563EB"/><stop offset="1" stop-color="#7C3AED"/></linearGradient></defs>
  <path class="flow" d="M136 120 C146 120 150 120 160 120" />
  ${pills.map((p) => `<path class="flow" d="M280 120 C290 120 290 ${p.y + 18} 300 ${p.y + 18}" />`).join("")}
  <rect x="16" y="96" width="120" height="48" rx="14" fill="#fff" stroke="#E2E8F0"/>
  <text x="76" y="120" text-anchor="middle" dominant-baseline="central" fill="#0F172A" font-weight="600">Business need</text>
  <rect x="160" y="88" width="120" height="64" rx="18" fill="url(#smg)"/>
  <text x="220" y="120" text-anchor="middle" dominant-baseline="central" fill="#fff" font-weight="700">Solution design</text>
  ${pills
    .map(
      (p) => `<rect x="300" y="${p.y}" width="88" height="36" rx="18" fill="${p.c}"/>
  <text x="344" y="${p.y + 18}" text-anchor="middle" dominant-baseline="central" fill="${p.k}" font-weight="600">${p.t}</text>`
    )
    .join("")}
  <g fill="#fff" stroke="#7C3AED" stroke-width="2">
    <circle cx="136" cy="120" r="4"/><circle cx="160" cy="120" r="4"/><circle cx="280" cy="120" r="4"/>
    ${pills.map((p) => `<circle cx="300" cy="${p.y + 18}" r="4"/>`).join("")}
  </g>
</svg>`;
}

const blueprintArcs = () => `<svg class="arcs" viewBox="0 0 200 200" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1">
  <circle cx="200" cy="0" r="60"/><circle cx="200" cy="0" r="100" stroke-dasharray="3 5"/><circle cx="200" cy="0" r="140"/><circle cx="200" cy="0" r="180" stroke-dasharray="3 5"/>
  <path d="M200 0L60 140M200 0L140 190M200 0L20 70" stroke-opacity=".6"/>
</svg>`;

/* ---------- watch frame ---------- */
export function watchFrame({ src, frame, w, alt = "", eager = false, cls = "" }) {
  const dims = frame === "round2" ? [260, 260] : [200, 228];
  const px = /^\d+px$/.test(w || "") && parseInt(w, 10) % dims[0] === 0;
  const style = w ? ` style="--w:${esc(w)}"` : "";
  const load = eager ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"';
  return `<span class="watch watch--${esc(frame)}${px ? " watch--px" : ""} ${esc(cls)}"${style}>
  <span class="watch__strap watch__strap--top" aria-hidden="true"></span>
  <span class="watch__body"><img src="${esc(src)}" alt="${esc(alt)}" width="${dims[0]}" height="${dims[1]}" ${load}></span>
  <span class="watch__strap watch__strap--bot" aria-hidden="true"></span>
  <span class="watch__btn" aria-hidden="true"></span>
</span>`;
}

/* ---------- project visuals ---------- */
function apiViz() {
  return `<div class="viz viz--api" role="img" aria-label="Example request and JSON response from AmiiboAPI">
  <div class="api__req" aria-hidden="true"><b>GET</b>&nbsp; /api/amiibo?name=mario</div>
  <svg class="api__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v15M6 13l6 6 6-6"/></svg>
  <pre class="api__res" aria-hidden="true"><code><span class="p">{</span> <span class="k">"amiibo"</span><span class="p">:</span> <span class="p">[</span>
  <span class="p">{</span> <span class="k">"name"</span><span class="p">:</span> <span class="s">"Mario"</span><span class="p">,</span>
    <span class="k">"amiiboSeries"</span><span class="p">:</span> <span class="s">"Super Smash Bros."</span><span class="p">,</span>
    <span class="k">"type"</span><span class="p">:</span> <span class="s">"Figure"</span> <span class="p">}</span> <span class="p">]</span> <span class="p">}</span></code></pre>
</div>`;
}

function graphViz(uid = "g") {
  const cols = 6, rows = 4, step = 48, pad = 28;
  const X = (c) => pad + c * step, Y = (r) => pad + r * step;
  const blocked = [[2, 3], [3, 2], [3, 1], [4, 2]];
  const path = [[0, 3], [1, 3], [1, 2], [2, 2], [2, 1], [2, 0], [3, 0], [4, 0], [4, 1], [5, 1]];
  const isB = (c, r) => blocked.some(([a, b]) => a === c && b === r);
  const isP = (c, r) => path.some(([a, b]) => a === c && b === r);
  let edges = "", nodes = "";
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      if (c < cols - 1) edges += `<line x1="${X(c)}" y1="${Y(r)}" x2="${X(c + 1)}" y2="${Y(r)}"/>`;
      if (r < rows - 1) edges += `<line x1="${X(c)}" y1="${Y(r)}" x2="${X(c)}" y2="${Y(r + 1)}"/>`;
    }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const x = X(c), y = Y(r);
      if (isB(c, r))
        nodes += `<circle cx="${x}" cy="${y}" r="9" fill="#CBD5E1"/><path d="M${x - 3.5} ${y - 3.5}l7 7M${x + 3.5} ${y - 3.5}l-7 7" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>`;
      else if (!isP(c, r)) nodes += `<circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="#94A3B8" stroke-width="1.5"/>`;
    }
  const d = path.map(([c, r], i) => `${i ? "L" : "M"}${X(c)} ${Y(r)}`).join("");
  const inner = path
    .slice(1, -1)
    .map(([c, r]) => `<circle cx="${X(c)}" cy="${Y(r)}" r="5" fill="#fff" stroke="url(#${uid})" stroke-width="2.5"/>`)
    .join("");
  const [ac, ar] = path[0], [bc, br] = path[path.length - 1];
  const end = (c, r, t) =>
    `<circle cx="${X(c)}" cy="${Y(r)}" r="12" fill="url(#${uid})"/><text x="${X(c)}" y="${Y(r)}" text-anchor="middle" dominant-baseline="central" fill="#fff" font-size="12" font-weight="700">${t}</text>`;
  const w = pad * 2 + (cols - 1) * step, h = pad * 2 + (rows - 1) * step;
  return `<div class="viz viz--graph"><svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Shortest path from A to B routing around blocked nodes">
  <defs><linearGradient id="${uid}" gradientUnits="userSpaceOnUse" x1="${X(0)}" y1="${Y(3)}" x2="${X(5)}" y2="${Y(1)}"><stop offset="0" stop-color="#2563EB"/><stop offset="1" stop-color="#7C3AED"/></linearGradient></defs>
  <g stroke="#C4B5FD" stroke-opacity=".7" stroke-width="1.5">${edges}</g>
  ${nodes}
  <path class="draw" pathLength="1" d="${d}" fill="none" stroke="url(#${uid})" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  ${inner}${end(ac, ar, "A")}${end(bc, br, "B")}
</svg></div>`;
}

const initials = (name) =>
  name.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w)).map((w) => w[0].toUpperCase()).join("").slice(0, 3);

function noneViz(p) {
  return `<div class="viz viz--none" aria-hidden="true"><span class="mono">${esc(initials(p.name))}</span></div>`;
}

function photoViz(p, eager = false) {
  const i = p.image;
  return `<div class="viz viz--photo"><img src="${esc(i.src)}" alt="${esc(i.alt)}" width="${Number(i.w)}" height="${Number(i.h)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></div>`;
}

export function projectVisual(p, eager = false) {
  switch (p.visual) {
    case "api": return apiViz();
    case "photo": return photoViz(p, eager);
    case "graph": return graphViz("g-" + p.slug);
    case "watches": return "";
    default: return noneViz(p);
  }
}

/* ---------- stats ---------- */
function statChips(p, st) {
  if (!st) return "";
  if (!(p.showStats || st.stars > 0)) return "";
  return `<span class="stat" title="GitHub stars">${icon("star")}${Number(st.stars)}</span><span class="stat" title="Forks">${icon("fork")}${Number(st.forks)}</span>`;
}

/* ---------- cards ---------- */
export function expertiseCard(it, i) {
  const tone = it.tone ? ` ecard--${esc(it.tone)}` : "";
  const first = i === 0;
  return `<article class="card ecard${tone}${it.wide ? " ecard--wide" : ""}${first ? " ecard--hero" : ""} reveal" style="${span(it)}">
  ${first ? blueprintArcs() : ""}
  <div class="ecard__head"><span class="chip">${icon(it.icon)}</span><h3>${esc(it.title)}</h3></div>
  <div class="ecard__body"><p>${esc(it.text)}</p>${tags(it.tags)}</div>
</article>`;
}

export function projectCard(p, ctx) {
  const st = statsFor(p, ctx.stats);
  const href = hasDetail(p) ? projectHref(p) : repoUrl(ctx.site, p);
  const ext = hasDetail(p) ? "" : extAttrs(href);
  const wide = (Number(p.span) || 0) >= 7;
  const links = (p.links || [])
    .map(
      (l) =>
        `<a class="chiplink" href="${esc(l.url)}"${extAttrs(l.url)}>${l.icon ? icon(l.icon) : ""}<span>${esc(l.label)}</span>${l.icon ? "" : icon("external")}</a>`
    )
    .join("");
  return `<article class="card pcard${wide ? " pcard--wide" : ""}${p.layout === "wide" ? " pcard--row" : ""} reveal" style="${span(p)}">
  <div class="pcard__viz">${projectVisual(p)}</div>
  <div class="pcard__body">
    <p class="kind">${esc(p.kind)}</p>
    <h3><a href="${esc(href)}"${ext}>${esc(p.name)}</a></h3>
    <p class="pcard__sum">${esc(p.summary)}</p>
    ${tags(p.stack)}
    <div class="pcard__foot">${links}<span class="stats">${statChips(p, st)}</span></div>
  </div>
</article>`;
}

export function moreOnGithub(site) {
  return `<a class="card more reveal" style="--c:12;--t:6" href="${esc(site.social.find((s) => s.id === "github").url)}" target="_blank" rel="noopener">
  ${icon("github", "more__icon")}
  <svg class="more__deco" viewBox="0 0 160 100" aria-hidden="true" focusable="false"><defs><pattern id="mdots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="currentColor"/></pattern></defs><rect width="160" height="100" fill="url(#mdots)"/><g stroke="currentColor" stroke-width="1.5" fill="#fff"><path d="M30 70L70 30L120 55L140 20" fill="none"/><circle cx="30" cy="70" r="6"/><circle cx="70" cy="30" r="6"/><circle cx="120" cy="55" r="6"/><circle cx="140" cy="20" r="6"/></g></svg>
  <span class="more__text"><span class="more__title">More on GitHub</span><span class="more__handle">${esc(site.social.find((s) => s.id === "github").handle)}</span></span>
  <span class="more__arrow">${icon("arrow")}</span>
</a>`;
}

export function featuredProject(p, ctx) {
  const heroScreens = (p.screens || []).filter((s) => s.hero);
  const detailLink = hasDetail(p)
    ? button({ label: "Read the case study", href: projectHref(p), variant: "ghost", trailing: "arrow" })
    : "";
  const links = (p.links || [])
    .map((l) =>
      button({ label: l.label, href: l.url, variant: l.primary ? "primary" : "outline", icon: l.icon, trailing: l.icon || l.primary ? "" : "external" })
    )
    .join("");
  return `<article class="card feat reveal" style="--c:12;--t:6">
  <div class="feat__visual" aria-hidden="false">
    ${heroScreens.map((s) => watchFrame({ src: s.src, frame: s.frame, alt: s.alt, cls: "feat__watch" })).join("")}
  </div>
  <div class="feat__text">
    <p class="kind">${esc(p.kind)}</p>
    <h3>${esc(p.name)}</h3>
    <p class="feat__tag">${esc(p.tagline)}</p>
    <p>${esc(p.summary)}</p>
    <ul class="checks">${(p.highlights || []).map((h) => `<li>${icon("check")}<span>${esc(h)}</span></li>`).join("")}</ul>
    ${tags(p.stack)}
    <div class="btn-row">${links}${detailLink}</div>
  </div>
</article>`;
}

/* ---------- sections ---------- */
function heroSection(ctx) {
  const { site, projects, stats } = ctx;
  const h = site.hero;
  const pebble = projects.find((p) => p.featured) || projects[0];
  const stat = projects.find((p) => p.showStats);
  const shot = (pebble.screens || []).find((s) => s.hero && s.frame === "time2") || pebble.screens[0];
  const st = stat && statsFor(stat, stats);
  return `<section class="hero" aria-label="Introduction">
  <div class="container hero__grid">
    <div class="hero__text">
      <p class="pillbadge reveal"><span class="pulse" aria-hidden="true"></span>${esc(h.eyebrow)}</p>
      <h1 class="reveal">${h.headline
        .map((l, i) => `<span class="line${i === h.headline.length - 1 ? " grad-text" : ""}">${esc(l)}</span>`)
        .join("")}</h1>
      <p class="hero__p reveal">${esc(h.text)}</p>
      <div class="btn-row reveal">
        ${button({ label: h.primary.label, href: h.primary.href, variant: "primary", trailing: "arrow" })}
        ${button({ label: h.secondary.label, href: h.secondary.href, variant: "outline" })}
        ${socialLinks({ social: site.social.filter((s) => s.id !== "mail") }, "social--round")}
      </div>
    </div>
    <div class="hero__cards">
      <figure class="card hmap reveal">
        ${systemMap()}
        <figcaption class="sr-only">From a business need, through solution design, to APIs, apps and hardware.</figcaption>
      </figure>
      <a class="card hpebble reveal" href="${projectHref(pebble)}">
        <span class="hpebble__text"><span class="kind">Latest build</span><span class="hpebble__title">${esc(pebble.name)}</span><span class="hpebble__go">${icon("arrow")}</span></span>
        ${watchFrame({ src: shot.src, frame: "time2", w: "92px", alt: shot.alt, eager: true })}
      </a>
      ${
        stat && st
          ? `<a class="card hstat reveal" href="${projectHref(stat)}">
        <span class="chip chip--white">${icon("star")}</span>
        <span class="hstat__n">${Number(st.stars)}</span>
        <span class="hstat__cap">GitHub stars on ${esc(stat.name)}</span>
      </a>`
          : ""
      }
    </div>
  </div>
</section>`;
}

function aboutSection({ site }) {
  const a = site.about;
  return `<section class="section" id="about" aria-labelledby="about-h">
  <div class="container bento">
    <div class="card about__intro reveal" style="--c:7;--t:6">
      <p class="eyebrow"><span class="eyebrow__bar" aria-hidden="true"></span>${esc(a.eyebrow)}</p>
      <h2 id="about-h">${esc(a.headline)}</h2>
      ${a.paragraphs.map((t) => `<p>${esc(t)}</p>`).join("")}
    </div>
    <div class="card about__photo reveal" style="--c:5;--t:6">
      <img src="${esc(site.photo.src)}" alt="${esc(site.photo.alt)}" width="${Number(site.photo.w)}" height="${Number(site.photo.h)}" loading="lazy" decoding="async">
      <span class="photochip">${esc(site.name)} · ${esc(site.role)}</span>
    </div>
    ${a.facts
      .map(
        (f) => `<div class="card fact reveal" style="--c:4;--t:2">
      <span class="chip">${icon(f.icon)}</span>
      <p class="fact__label">${esc(f.label)}</p>
      <p class="fact__value">${esc(f.value)}</p>
    </div>`
      )
      .join("")}
  </div>
</section>`;
}

function expertiseSection({ site }) {
  const e = site.expertise;
  return `<section class="section" id="expertise" aria-labelledby="expertise-h">
  <div class="container">
    ${sectionHeading({ eyebrow: e.eyebrow, title: e.headline, text: e.text, variant: "sh--split", id: "expertise-h" })}
    <div class="bento">${e.items.map(expertiseCard).join("")}</div>
  </div>
</section>`;
}

function projectsSection(ctx) {
  const { site, projects } = ctx;
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => p !== featured);
  return `<section class="section" id="projects" aria-labelledby="projects-h">
  <div class="container">
    ${sectionHeading({ ...site.projects, title: site.projects.headline, id: "projects-h" })}
    <div class="bento">
      ${featured ? featuredProject(featured, ctx) : ""}
      ${rest.map((p) => projectCard(p, ctx)).join("")}
      ${moreOnGithub(site)}
    </div>
  </div>
</section>`;
}

function openSourceSection(ctx) {
  const { site, projects, stats } = ctx;
  const o = site.openSource;
  const gh = site.social.find((s) => s.id === "github");
  const rows = projects
    .filter((p) => p.repo)
    .map((p) => {
      const st = statsFor(p, stats);
      return `<li class="osrow">
        <a class="osrow__name" href="${esc(repoUrl(site, p))}" target="_blank" rel="noopener">${esc(p.name)}</a>
        <span class="osrow__stack">${esc(p.kind)}</span>
        ${st ? `<span class="osrow__meta"><span class="stat">${icon("star")}${Number(st.stars)}</span><span class="stat">${icon("fork")}${Number(st.forks)}</span><span class="osrow__year">Updated ${esc(String(st.pushed).slice(0, 4))}</span>${st.archived ? '<span class="badge">Archived</span>' : ""}</span>` : ""}
      </li>`;
    })
    .join("");
  return `<section class="section" id="open-source" aria-labelledby="os-h">
  <div class="container bento">
    <div class="card os__lead reveal" style="--c:5;--t:6">
      ${icon("github", "os__icon")}
      <p class="eyebrow eyebrow--inv">${esc(o.eyebrow)}</p>
      <h2 id="os-h">${esc(o.headline)}</h2>
      <p>${esc(o.text)}</p>
      ${button({ label: gh.handle, href: gh.url, variant: "white", trailing: "external" })}
    </div>
    <div class="card os__list reveal" style="--c:7;--t:6">
      <ul>${rows}</ul>
      <p class="muted small">${esc(o.note)}</p>
    </div>
  </div>
</section>`;
}

function contactSection({ site }) {
  const c = site.contact;
  const mail = site.social.find((s) => s.id === "mail");
  const others = site.social.filter((s) => s.id !== "mail");
  return `<section class="section" id="contact" aria-labelledby="contact-h">
  <div class="container">
    <div class="card contact reveal">
      <p class="eyebrow"><span class="eyebrow__bar" aria-hidden="true"></span>${esc(c.eyebrow)}</p>
      <h2 id="contact-h">${esc(c.headline)}</h2>
      <p class="lead">${esc(c.text)}</p>
      <div class="btn-row btn-row--center">
        ${button({ label: mail.handle, href: mail.url, variant: "primary", icon: "mail", cls: "btn--lg" })}
        ${others.map((s) => button({ label: s.label, href: s.url, variant: "outline", icon: s.id })).join("")}
      </div>
    </div>
  </div>
</section>`;
}

/* ---------- layout ---------- */
const jsonLd = (o) =>
  `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;

export function layout(ctx, { title, description, path, body, ld = [], current = "", mainClass = "" }) {
  const { site, ver, year } = ctx;
  const url = site.url + path;
  const og = `${site.url}/assets/og.png`;
  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(url)}">
<meta name="theme-color" content="#F8FAFC">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(og)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="${esc(site.name)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(og)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap">
<script>document.documentElement.classList.add("js")</script>
<link rel="stylesheet" href="/styles.css?v=${esc(ver.css)}">
${ld.map(jsonLd).join("\n")}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="bg-blobs" aria-hidden="true"></div>
${header(site, current)}
<main id="main" class="${esc(mainClass)}">
${body}
</main>
${footer(site, year)}
<script src="/main.js?v=${esc(ver.js)}" defer></script>
</body>
</html>
`;
}

export function renderHome(ctx) {
  const { site } = ctx;
  const body = [
    heroSection(ctx),
    aboutSection(ctx),
    expertiseSection(ctx),
    projectsSection(ctx),
    openSourceSection(ctx),
    contactSection(ctx),
  ].join("\n");
  const sameAs = site.social.filter((s) => s.id !== "mail").map((s) => s.url);
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: site.name,
      jobTitle: site.role,
      url: site.url,
      image: site.url + site.photo.src,
      email: site.email,
      address: { "@type": "PostalAddress", addressLocality: "Melbourne", addressCountry: "AU" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Monash University" },
      sameAs,
    },
    { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url },
  ];
  return layout(ctx, { title: site.title, description: site.description, path: "/", body, ld });
}

function projectHero(p) {
  if (p.visual === "watches") {
    const shots = (p.screens || []).slice(0, 3);
    return `<div class="phero__viz phero__viz--watches">${shots
      .map((s) => watchFrame({ src: s.src, frame: s.frame, alt: s.alt, cls: "phero__watch" }))
      .join("")}</div>`;
  }
  return `<div class="phero__viz reveal">${projectVisual(p, true)}</div>`;
}

export function renderProject(ctx, p) {
  const { site, projects, stats } = ctx;
  const st = statsFor(p, stats);
  const d = p.detail;
  const withDetail = projects.filter(hasDetail);
  const next = withDetail[(withDetail.indexOf(p) + 1) % withDetail.length];
  const links = (p.links || [])
    .map((l) =>
      button({ label: l.label, href: l.url, variant: l.primary ? "primary" : "outline", icon: l.icon, trailing: l.icon || l.primary ? "" : "external" })
    )
    .join("");
  const side = [...(p.links || []), ...(d.extraLinks || [])]
    .map((l) => `<li><a href="${esc(l.url)}"${extAttrs(l.url)}>${esc(l.label)}${icon("external")}</a></li>`)
    .join("");
  const gallery = (p.screens || []).length
    ? `<section aria-labelledby="screens-h" class="reveal"><h2 id="screens-h">Screens</h2>
      <div class="gallery">${p.screens
        .map(
          (s) => `<figure>${watchFrame({ src: s.src, frame: s.frame, alt: s.alt, cls: "gallery__watch" })}<figcaption>${esc(s.caption)} <span class="muted">· ${s.frame === "round2" ? "Pebble Round 2" : "Pebble Time 2"}</span></figcaption></figure>`
        )
        .join("")}</div></section>`
    : "";
  const body = `<article class="container pdetail">
  <a class="back" href="/#projects">${icon("arrow", "flip")}<span>All projects</span></a>
  <div class="phero">
    <div class="phero__text">
      <p class="kind">${esc(p.kind)}</p>
      <h1>${esc(p.name)}</h1>
      <p class="phero__tag">${esc(p.tagline)}</p>
      <div class="btn-row">${links}</div>
    </div>
    ${projectHero(p)}
  </div>
  <div class="pdetail__grid">
    <div class="pdetail__main">
      <section aria-labelledby="ov-h" class="reveal"><h2 id="ov-h">Overview</h2>${d.overview.map((t) => `<p>${esc(t)}</p>`).join("")}</section>
      <section aria-labelledby="hl-h" class="reveal"><h2 id="hl-h">Highlights</h2>
        <ul class="checks">${(p.highlights || []).map((h) => `<li>${icon("check")}<span>${esc(h)}</span></li>`).join("")}</ul></section>
      ${(d.sections || []).map((s) => `<section class="reveal"><h2>${esc(s.title)}</h2><p>${esc(s.text)}</p></section>`).join("")}
      ${gallery}
    </div>
    <aside class="card pside reveal" aria-label="Project details">
      <h2 class="pside__h">Stack</h2>${tags(p.stack)}
      ${
        st
          ? `<h2 class="pside__h">GitHub</h2>
      <p class="pside__stats"><span class="stat">${icon("star")}${Number(st.stars)} stars</span><span class="stat">${icon("fork")}${Number(st.forks)} forks</span></p>
      <p class="muted small">Updated ${esc(st.pushed)} ${st.archived ? '<span class="badge">Archived</span>' : ""}</p>`
          : ""
      }
      <h2 class="pside__h">Links</h2><ul class="sidelinks">${side}</ul>
    </aside>
  </div>
  <a class="card nextp reveal" href="${projectHref(next)}">
    <span class="nextp__label">Next project</span>
    <span class="nextp__name">${esc(next.name)}</span>
    <span class="nextp__tag">${esc(next.tagline)}</span>
    <span class="more__arrow">${icon("arrow")}</span>
  </a>
</article>`;
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": p.repo ? "SoftwareSourceCode" : "CreativeWork",
      name: p.name,
      description: p.summary,
      author: { "@type": "Person", name: site.name, url: site.url },
      url: `${site.url}${projectHref(p)}`,
      ...(p.repo ? { codeRepository: repoUrl(site, p) } : {}),
    },
  ];
  return layout(ctx, {
    title: `${p.name} | ${site.name}`,
    description: p.summary,
    path: projectHref(p),
    body,
    ld,
    current: "/#projects",
  });
}

export function render404(ctx) {
  const { site } = ctx;
  const body = `<section class="container nf">
  <p class="kind">404</p>
  <h1>Page not found</h1>
  <p class="lead">That page does not exist or has moved.</p>
  <div class="btn-row">${button({ label: "Back to home", href: "/", variant: "primary", trailing: "arrow" })}</div>
</section>`;
  return layout(ctx, {
    title: `Page not found | ${site.name}`,
    description: site.description,
    path: "/404.html",
    body,
  }).replace("</title>", "</title>\n<meta name=\"robots\" content=\"noindex\">");
}
