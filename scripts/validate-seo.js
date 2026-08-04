const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const site = path.join(root, "JaneM_Website");
const config = JSON.parse(fs.readFileSync(path.join(site, "seo.config.json"), "utf8"));
const base = new URL(process.env.JANEM_SITE_URL || config.customDomain || config.productionUrl).href;
const files = [];
function walk(directory) { for (const item of fs.readdirSync(directory, { withFileTypes: true })) { const target = path.join(directory, item.name); if (item.isDirectory()) walk(target); else if (item.name.endsWith(".html")) files.push(target); } }
walk(site);
const fail = [];
const titles = new Map(); const descriptions = new Map(); const sitemap = fs.readFileSync(path.join(site, "sitemap.xml"), "utf8"); const robots = fs.readFileSync(path.join(site, "robots.txt"), "utf8");
if (!robots.includes("Disallow: /admin/") || !robots.includes("Sitemap:")) fail.push("robots.txt is missing admin exclusion or sitemap declaration");
if (/<loc>[^<]*(?:\/admin\/|catalogue\.pdf)/.test(sitemap)) fail.push("sitemap contains an excluded URL");
for (const file of files) {
  const html = fs.readFileSync(file, "utf8"); const relative = path.relative(site, file);
  if (relative === "404.html" || relative === "admin.html") continue;
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]; const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1]; const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  if (!title) fail.push(`${relative}: missing title`); else { if (titles.has(title)) fail.push(`${relative}: duplicate title with ${titles.get(title)}`); titles.set(title, relative); }
  if (!description) fail.push(`${relative}: missing description`); else { if (descriptions.has(description)) fail.push(`${relative}: duplicate description with ${descriptions.get(description)}`); descriptions.set(description, relative); }
  if (!canonical || !canonical.startsWith(base)) fail.push(`${relative}: invalid canonical`);
  if ((html.match(/rel="canonical"/g) || []).length !== 1) fail.push(`${relative}: expected one canonical`);
  if (!html.includes('meta name="robots" content="index,follow')) fail.push(`${relative}: missing index,follow robots directive`);
  if (!html.includes('property="og:title"') || !html.includes('name="twitter:card"')) fail.push(`${relative}: incomplete social metadata`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!schemas.length) fail.push(`${relative}: missing structured data`); for (const schema of schemas) { try { JSON.parse(schema[1]); } catch { fail.push(`${relative}: invalid JSON-LD`); } }
  for (const image of html.matchAll(/<img\b([^>]*)>/gi)) { if (!/\balt=/.test(image[1])) fail.push(`${relative}: image missing alt text`); if (!/\bwidth=/.test(image[1]) || !/\bheight=/.test(image[1])) fail.push(`${relative}: image missing dimensions`); }
  for (const anchor of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) { const href = anchor[1]; if (!href || href.startsWith("#") || /^(https?:|mailto:|tel:)/.test(href)) continue; const resolved = path.resolve(path.dirname(file), href.replace(/#.*/, "")); const candidates = [resolved, path.join(resolved, "index.html")]; if (!candidates.some(fs.existsSync)) fail.push(`${relative}: broken internal link ${href}`); }
}
if (!sitemap.includes(base) || (sitemap.match(/<loc>/g) || []).length < 18) fail.push("sitemap is missing expected public URLs");
if (fail.length) { console.error(fail.join("\n")); process.exit(1); }
console.log(`SEO validation passed: ${files.length} HTML files, ${titles.size} indexable pages, sitemap and structured data checked.`);
