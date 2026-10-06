import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { expectedPages } from "./expected-pages.mjs";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const prefixes = process.argv.slice(2);
const failures = [];

const banned = [
  [/\[NEEDS/, "[NEEDS tag"],
  [/\b(lorem|ipsum|incididunt|consequat|dolore)\b/i, "placeholder Latin"],
  [/Find out more|Enquire online|Pay bill|Give us a call|Head back home/, "retired label"],
  [/[–—]/, "en or em dash"]
];

const decode = text =>
  text
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

const walk = dir => readdirSync(dir).flatMap(name => (statSync(join(dir, name)).isDirectory() ? walk(join(dir, name)) : [join(dir, name)]));

const toPath = file => {
  const rel = relative(dist, file).split(sep).join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel.replace(/\.html$/, "")}`;
};

const targetExists = href => {
  const path = decodeURI(href.split(/[?#]/)[0]);
  if (path === "/") return true;
  const clean = path.replace(/^\//, "");
  return [clean, join(clean, "index.html"), `${clean.replace(/\/$/, "")}.html`].some(candidate => existsSync(join(dist, candidate)));
};

const matchesPrefix = path => prefixes.length === 0 || prefixes.some(prefix => (prefix === "/" ? path === "/" : path === prefix || path.startsWith(prefix)));

const pages = walk(dist)
  .filter(file => file.endsWith(".html"))
  .map(file => ({ file, path: toPath(file), html: readFileSync(file, "utf8") }))
  .filter(page => !page.html.includes('http-equiv="refresh"'))
  .filter(page => matchesPrefix(page.path));

for (const page of pages) {
  const fail = message => failures.push(`${page.path}: ${message}`);
  const { html } = page;

  const h1s = html.match(/<h1[\s>][\s\S]*?<\/h1>/g) ?? [];
  if (h1s.length !== 1) fail(`expected 1 <h1>, found ${h1s.length}`);

  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
  if (!title) fail("missing <title>");
  if (title.length > 65) fail(`title is ${title.length} characters: ${title}`);

  const noindex = /<meta name="robots" content="noindex/.test(html);
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  if (!noindex && !description) fail("missing meta description");
  if (description.length > 155) fail(`description is ${description.length} characters`);

  for (const [pattern, label] of banned) {
    if (pattern.test(html.replace(/<svg[\s\S]*?<\/svg>/g, ""))) fail(`contains ${label}`);
  }

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(json);
    } catch {
      fail("invalid JSON-LD");
    }
    if (json.includes("](")) fail("markdown link inside JSON-LD");
  }

  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (href.startsWith("#")) {
      if (href.length > 1 && !html.includes(`id="${href.slice(1)}"`)) fail(`anchor ${href} has no target`);
      continue;
    }
    if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/_astro/") || href.startsWith("/images/") || href.startsWith("/sitemap")) continue;
    if (!targetExists(href)) fail(`broken link ${href}`);
  }

  const expected = expectedPages[page.path];
  if (expected) {
    if (title !== expected.title) fail(`title "${title}" is not "${expected.title}"`);
    const h1 = decode(h1s[0] ?? "");
    if (h1 !== expected.h1) fail(`h1 "${h1}" is not "${expected.h1}"`);
  }
}

for (const path of Object.keys(expectedPages).filter(matchesPrefix)) {
  if (!pages.some(page => page.path === path)) failures.push(`${path}: page not built`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  console.error(`\n${failures.length} problem(s) in ${pages.length} page(s)`);
  process.exit(1);
}
console.log(`OK: ${pages.length} page(s) checked`);
