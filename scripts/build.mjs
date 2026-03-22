import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "_site");

const REGIONS = ["EYEBROW", "NAV", "SECTION"];

function shouldShowJobSearch() {
  const v = process.env.SHOW_JOB_SEARCH;
  if (v == null || String(v).trim() === "") return true;
  const s = String(v).trim().toLowerCase();
  return !["false", "0", "no", "off"].includes(s);
}

function stripRegion(html, name) {
  const re = new RegExp(
    `<!-- JOB_SEARCH:${name}:START -->[\\s\\S]*?<!-- JOB_SEARCH:${name}:END -->`,
    "g"
  );
  return html.replace(re, "");
}

function removeMarkerComments(html) {
  let out = html;
  for (const name of REGIONS) {
    out = out.replace(
      new RegExp(`\\s*<!-- JOB_SEARCH:${name}:START -->\\s*`, "g"),
      ""
    );
    out = out.replace(
      new RegExp(`\\s*<!-- JOB_SEARCH:${name}:END -->\\s*`, "g"),
      ""
    );
  }
  return out;
}

function copyIfExists(srcName) {
  const src = path.join(root, srcName);
  if (!fs.existsSync(src)) return;
  fs.copyFileSync(src, path.join(outDir, srcName));
}

const indexPath = path.join(root, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

if (shouldShowJobSearch()) {
  html = removeMarkerComments(html);
} else {
  for (const name of REGIONS) {
    html = stripRegion(html, name);
  }
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
copyIfExists("styles.css");
copyIfExists("Nevin-Vu-Resume.pdf");
fs.writeFileSync(path.join(outDir, ".nojekyll"), "", "utf8");
