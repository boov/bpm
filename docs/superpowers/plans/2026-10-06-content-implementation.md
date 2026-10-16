# Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Astro site so every page shows the approved copy in `docs/content/written/`, with the new page structure, routes, collections, forms and redirects.

**Architecture:** Service and audience pages come from JSON content collections (`src/content/services`, new `src/content/audiences`) rendered by shared section components. FAQs and team come from the `@bpm/data` package. One-off pages (home, services, about, contact, pay, utility, legal) hold their copy in `.astro` or `.md` files, as now. Small pure TypeScript modules hold shared logic (inline links, calls to action, enquiry types, FAQ schema) and are unit-tested with Node's built-in test runner. A post-build script checks every built page (one H1, title and description length, broken internal links, leftover placeholder text).

**Tech Stack:** Astro 6.2, Tailwind 4, AlpineJS 3, Lucide icons (`@lucide/astro`), Node 22 (`node --test` with built-in type stripping), Netlify Forms, Stripe payment link.

**Spec:** The copy and rules in `docs/content/`. The page copy is in `docs/content/written/` (index in `docs/content/written/README.md`). Page structure and fields are in `docs/content/page-map.md`. Call to action labels are in `docs/content/tone-of-voice.md`.

## Global Constraints

- Copy is transcribed **verbatim** from `docs/content/written/`. Do not reword, shorten or "improve" it. If copy looks wrong, stop and report it.
- Strip every `` `[NEEDS: …]` `` tag. Keep the sentence around it. If a list row, table or section contains only a `[NEEDS: …]` tag, leave that row, table or section out. List each one you leave out in your task report.
- "Facts used", "Gaps", "Build note" and "Build notes (not copy)" blocks are not copy. Never render them.
- Markdown links in copy (`[label](/path)`) stay as markdown in JSON and data files. Templates render them with `renderInline()` (Task 1). Never render copy containing links with `set:text` or `{text}`.
- Call to action labels come only from the table in `docs/content/tone-of-voice.md`. Their targets are in `src/assets/scripts/calls-to-action.ts` (Task 2).
- Full page title: 65 characters max (`meta_title` plus the 31-character suffix " - Belgarum Property Management"; the home page has no suffix). Meta description: 155 characters max.
- One H1 per page.
- No new npm dependencies.
- UK English. No em dashes or en dashes in any rendered text. No exclamation marks.
- Use path aliases (`@helpers`, `@components/*`, `@layouts/*`, `@assets/*`, `@types`). Lucide icons: `import Name from "@lucide/astro/icons/name";`.
- Before each commit, run `npm run format` from the repo root.
- Commit format: `<TYPE>: <subject>`, types `FEATURE | FIX | UPDATE | DOCS | STYLE | REFACTOR | TEST | CHORE | PERF | SECURITY`, imperative, no full stop. Stage files by name. Never `git add -A` or `git add .`.

## Decisions taken in this plan

The copy does not settle these points. The plan uses the default shown. Change it here before execution if you disagree.

1. **Message length:** the contact form drops the 200-character minimum and the counter. The message stays required.
2. **Section headings on service and audience pages:** "How it works" (steps), "Why BPM" (proof), "Common questions" (FAQs), "Related services" (service pages) and "Services for you" (audience pages). Task 17 records them in `page-map.md`.
3. **Images:** service pages keep the current placeholder hero image (`https://dummyimage.com/1536x658/ede2de/7e6d67`) until BPM supplies photos (client question 2). Audience pages have no hero image.
4. **Social links:** `SocialLinks.astro` stays in the footer and on the thank-you page. It links to Facebook, Instagram and LinkedIn, each at `belgarumpropertymanagementltd`.
5. **Cookie consent:** out of scope. The footer leaves out the "Cookie settings" link until a consent tool exists. This is a launch blocker (see the end of this plan).
6. **Extra contact form fields** (the fields shown for one enquiry type) use the browser's default error messages. The copy gives error text for the main fields only.
7. **Team groups on About:** four groups with headings "Directors", "Property managers", "Accounts", "Administration", in that order.

## Review Focus

These conditions are not fully covered by the unit tests. The task that owns each one adds the check.

1. **A call to action reached by client-side navigation** (`/contact?type=new-management` from a page button, through Astro's `ClientRouter`): the enquiry type must still be preset. Task 14 tests this in the browser by clicking the header button from another page, not only by loading the URL.
2. **Copy with special characters and links** (`&`, `£`, apostrophes, `?type=` query strings): it must render as text, with working links, and must not break the HTML. Task 1 has unit tests for this. Task 6 checks one rendered page.
3. **Internal links and anchors after the slug renames** (`/services/budgeting` becomes `/services/service-charge-budgets`; `#how-it-works` on the sale packs page): every internal link must resolve. The build checker (Task 1) fails on any broken internal link or missing same-page anchor.
4. **Leftover placeholder or schema text** (`[NEEDS`, lorem ipsum, markdown link syntax inside JSON-LD): none may reach the built HTML. The build checker fails on these.
5. **Long header labels** ("Request a management proposal", "Pay your service charge", 6 menu items): the header must not overflow or wrap badly between 640px and 1536px wide. Task 4 includes a browser check at 640, 1024, 1280 and 1536px.

---

## File structure

**Create**

| File                                                              | Responsibility                                                         |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `apps/web/src/assets/scripts/inline-markdown.ts`                  | `renderInline()` and `stripInline()` for `[label](href)` links in copy |
| `apps/web/src/assets/scripts/inline-markdown.test.ts`             | Unit tests                                                             |
| `apps/web/src/assets/scripts/site.ts`                             | Business constants (name, phone, email, hours, addresses)              |
| `apps/web/src/assets/scripts/calls-to-action.ts`                  | Call to action keys, labels, targets, band mapping                     |
| `apps/web/src/assets/scripts/calls-to-action.test.ts`             | Unit tests                                                             |
| `apps/web/src/assets/scripts/enquiry-types.ts`                    | Contact enquiry types, `?type=` preset, address rule                   |
| `apps/web/src/assets/scripts/enquiry-types.test.ts`               | Unit tests                                                             |
| `apps/web/src/assets/scripts/faq-schema.ts`                       | Builds FAQPage JSON-LD from FAQ data                                   |
| `apps/web/src/assets/scripts/faq-schema.test.ts`                  | Unit tests                                                             |
| `apps/web/src/assets/scripts/contact-form.ts`                     | Alpine data for the contact form                                       |
| `apps/web/src/assets/scripts/validation-messages.ts`              | Shows `data-error` text as the browser validation message              |
| `apps/web/scripts/check-build.mjs`                                | Post-build checker                                                     |
| `apps/web/scripts/expected-pages.mjs`                             | Expected title and H1 per page                                         |
| `apps/web/src/components/global/TrustStrip.astro`                 | Full and compact trust strip                                           |
| `apps/web/src/components/sections/InlineText.astro`               | Renders one copy string with links                                     |
| `apps/web/src/components/sections/PageHero.astro`                 | Hero for service and audience pages                                    |
| `apps/web/src/components/sections/IntroBlock.astro`               | Intro heading and paragraphs                                           |
| `apps/web/src/components/sections/IncludedList.astro`             | "What's included" list                                                 |
| `apps/web/src/components/sections/StepList.astro`                 | "How it works" steps                                                   |
| `apps/web/src/components/sections/ProofList.astro`                | "Why BPM" list                                                         |
| `apps/web/src/components/sections/FaqList.astro`                  | FAQ accordion                                                          |
| `apps/web/src/components/sections/ServiceLinks.astro`             | Related services cards                                                 |
| `apps/web/src/components/collection/service/ServiceCard.astro`    | Service card: title, description, link                                 |
| `apps/web/src/components/collection/audience/AudienceCards.astro` | The 3 audience route cards                                             |
| `apps/web/src/components/pages/home/ResidentSupport.astro`        | Home resident support block                                            |
| `apps/web/src/components/pages/about/HowWeWork.astro`             | About "How we work" items                                              |
| `apps/web/src/components/pages/about/Memberships.astro`           | About "Who we answer to"                                               |
| `apps/web/src/content/services/*.json` (9 new names)              | Service page content                                                   |
| `apps/web/src/content/audiences/*.json` (3)                       | Audience page content                                                  |
| `apps/web/src/pages/who-we-work-with/[slug].astro`                | Audience page route                                                    |

**Modify:** `content.config.ts`, `helpers.ts`, `nav-links.ts`, `payment-form.ts`, `Base.astro`, `Default.astro`, `Text.astro`, `Banner.astro`, `Gutter.astro`, `CTA.astro`, `Footer.astro`, `Trim.astro`, `Schema.astro`, `Question.astro`, `QuestionGroup.astro`, `Personnel.astro`, `PersonnelGrid.astro`, `ServicesGrid.astro`, `pages/home/Hero.astro`, `pages/home/Intro.astro`, `pages/about/Intro.astro`, `pages/about/Timeline.astro`, `ContactForm.astro`, `PaymentForm.astro`, every file in `src/pages/`, `packages/data/content/questions.ts`, `packages/data/content/personnel.ts`, `astro.config.mjs`, `netlify.toml`, `apps/web/package.json`, `CLAUDE.md`, `docs/content/page-map.md`, `docs/content/facts.md`, build notes in `docs/content/written/`.

**Delete:** the 9 old service JSON files, `collection/service/{About,Features,Why,ServicesIntro,Service}.astro`, `pages/home/WhyChooseUs.astro`.

## How to verify (used in every task)

- Unit tests: `npm run test --workspace=@bpm/web`
- Build: `npm run build` (repo root)
- Build checker, all pages: `npm run check --workspace=@bpm/web`
- Build checker, some pages: `npm run check --workspace=@bpm/web -- /services/ /who-we-work-with/` (path prefixes)
- Browser: `npm run dev`, then open `http://localhost:4321/`

The full checker fails until Task 17, because untouched pages still hold old copy. Each task runs it with its own prefixes. The prefix `/` matches the home page only.

---

### Task 1: Test tooling, inline links and the build checker

**Files:**

- Create: `apps/web/src/assets/scripts/inline-markdown.ts`, `apps/web/src/assets/scripts/inline-markdown.test.ts`, `apps/web/scripts/check-build.mjs`, `apps/web/scripts/expected-pages.mjs`, `apps/web/src/components/sections/InlineText.astro`
- Modify: `apps/web/package.json`

**Interfaces:**

- Produces: `renderInline(text: string): string` (HTML-escaped text, `[label](href)` becomes `<a href="href" class="link">label</a>`); `stripInline(text: string): string` (links become their label); `<InlineText as="p" text="…" class="…" />`; `expectedPages` object `{ [path: string]: { title: string; h1: string } }`; npm scripts `test` and `check` in `@bpm/web`.

- [ ] **Step 1: Write the failing test**

`apps/web/src/assets/scripts/inline-markdown.test.ts`:

```ts
import assert from "node:assert/strict";
import { test } from "node:test";

import { renderInline, stripInline } from "./inline-markdown.ts";

test("escapes plain text", () => {
  assert.equal(renderInline('Fees & charges <£250> "quoted" it\'s'), "Fees &amp; charges &lt;£250&gt; &quot;quoted&quot; it&#39;s");
});

test("renders a link and keeps its query string", () => {
  assert.equal(renderInline("To find out, [request a management proposal](/contact?type=new-management)."), 'To find out, <a href="/contact?type=new-management" class="link">request a management proposal</a>.');
});

test("renders several links in one string", () => {
  assert.equal(renderInline("[A](/a) and [B](/b)"), '<a href="/a" class="link">A</a> and <a href="/b" class="link">B</a>');
});

test("leaves square brackets that are not links as text", () => {
  assert.equal(renderInline("Read [this] (later)"), "Read [this] (later)");
});

test("stripInline keeps the label only", () => {
  assert.equal(stripInline("Read how [Section 20 consultation](/services/section-20-consultation) works."), "Read how Section 20 consultation works.");
});
```

- [ ] **Step 2: Add the npm scripts**

In `apps/web/package.json`, add to `scripts`:

```json
"test": "node --test \"src/**/*.test.ts\"",
"check": "node scripts/check-build.mjs"
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm run test --workspace=@bpm/web` Expected: FAIL, "Cannot find module … inline-markdown.ts".

- [ ] **Step 4: Write the implementation**

`apps/web/src/assets/scripts/inline-markdown.ts`:

```ts
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

const escapeHtml = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export const renderInline = (text: string): string => {
  let html = "";
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    html += escapeHtml(text.slice(last, match.index));
    html += `<a href="${escapeHtml(href)}" class="link">${escapeHtml(label)}</a>`;
    last = match.index + whole.length;
  }
  return html + escapeHtml(text.slice(last));
};

export const stripInline = (text: string): string => text.replace(LINK, "$1");
```

`apps/web/src/components/sections/InlineText.astro`:

```astro
---
import { renderInline } from "@assets/scripts/inline-markdown";
import type { HTMLTag } from "astro/types";

interface Props {
  text: string;
  as?: HTMLTag;
  class?: string;
}

const { text, as: Tag = "p", class: classes } = Astro.props;
---

<Tag class={classes} set:html={renderInline(text)} />
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm run test --workspace=@bpm/web` Expected: PASS, 5 tests.

- [ ] **Step 6: Write the build checker**

`apps/web/scripts/expected-pages.mjs`:

```js
// Full <title> and H1 text per built page. Each task adds its pages.
export const expectedPages = {};
```

`apps/web/scripts/check-build.mjs`:

```js
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
  [/Find out more|Enquire online|Pay bill|Give us a call/, "retired label"],
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
```

- [ ] **Step 7: Run the checker against the current site**

Run: `npm run build && npm run check --workspace=@bpm/web` Expected: FAIL with many problems (placeholder Latin, retired labels, missing descriptions). This proves the checker finds them. Do not fix them in this task.

- [ ] **Step 8: Commit**

```bash
npm run format
git add apps/web/package.json apps/web/src/assets/scripts/inline-markdown.ts apps/web/src/assets/scripts/inline-markdown.test.ts apps/web/src/components/sections/InlineText.astro apps/web/scripts/check-build.mjs apps/web/scripts/expected-pages.mjs
git commit -m "TEST: add inline link rendering, unit tests and build checker"
```

---

### Task 2: Shared constants, calls to action, enquiry types, FAQ schema

**Files:**

- Create: `apps/web/src/assets/scripts/site.ts`, `calls-to-action.ts`, `calls-to-action.test.ts`, `enquiry-types.ts`, `enquiry-types.test.ts`, `faq-schema.ts`, `faq-schema.test.ts` (all in `apps/web/src/assets/scripts/`)

**Interfaces:**

- Consumes: `stripInline` (Task 1).
- Produces:
  - `site` object (fields below).
  - `callKeys` tuple `["proposal", "development", "residents", "sale-pack", "pay"]`, `type CallKey`, `type BandVariant = "proposal" | "development" | "residents"`, `calls: Record<CallKey, { label: string; href: string }>`, `bandFor(key: CallKey): BandVariant`.
  - `enquiryTypes: readonly { value: string; label: string }[]`, `type EnquiryType`, `presetEnquiryType(search: string): EnquiryType | ""`, `needsPropertyAddress(type: string): boolean`.
  - `type Faq = { question: string; answer: string[] }`, `faqPageSchema(faqs: Faq[]): object`.

- [ ] **Step 1: Write the failing tests**

`calls-to-action.test.ts`:

```ts
import assert from "node:assert/strict";
import { test } from "node:test";

import { bandFor, calls } from "./calls-to-action.ts";

test("labels match the tone of voice table", () => {
  assert.equal(calls.proposal.label, "Request a management proposal");
  assert.equal(calls.development.label, "Talk to us about a new development");
  assert.equal(calls.residents.label, "Contact your property manager");
  assert.equal(calls["sale-pack"].label, "Order a leasehold sale pack");
  assert.equal(calls.pay.label, "Pay your service charge");
});

test("proposal and development preset the enquiry type", () => {
  assert.equal(calls.proposal.href, "/contact?type=new-management");
  assert.equal(calls.development.href, "/contact?type=new-development");
});

test("leaseholder calls use the residents band", () => {
  assert.equal(bandFor("proposal"), "proposal");
  assert.equal(bandFor("development"), "development");
  assert.equal(bandFor("residents"), "residents");
  assert.equal(bandFor("sale-pack"), "residents");
  assert.equal(bandFor("pay"), "residents");
});
```

`enquiry-types.test.ts`:

```ts
import assert from "node:assert/strict";
import { test } from "node:test";

import { enquiryTypes, needsPropertyAddress, presetEnquiryType } from "./enquiry-types.ts";

test("lists the 10 enquiry types in order", () => {
  assert.deepEqual(
    enquiryTypes.map(type => type.value),
    ["new-management", "new-development", "service-charge", "repairs", "leasehold-sale-pack", "fire-safety", "section-20", "company-secretarial", "complaint", "general"]
  );
});

test("presets a known type from the query string", () => {
  assert.equal(presetEnquiryType("?type=new-management"), "new-management");
  assert.equal(presetEnquiryType("?utm_source=x&type=new-development"), "new-development");
});

test("ignores a missing or unknown type", () => {
  assert.equal(presetEnquiryType(""), "");
  assert.equal(presetEnquiryType("?type=site-visit"), "");
  assert.equal(presetEnquiryType("?type="), "");
});

test("property address is needed except for no type, new development and general", () => {
  assert.equal(needsPropertyAddress(""), false);
  assert.equal(needsPropertyAddress("new-development"), false);
  assert.equal(needsPropertyAddress("general"), false);
  assert.equal(needsPropertyAddress("repairs"), true);
  assert.equal(needsPropertyAddress("new-management"), true);
});
```

`faq-schema.test.ts`:

```ts
import assert from "node:assert/strict";
import { test } from "node:test";

import { faqPageSchema } from "./faq-schema.ts";

test("builds FAQPage schema with plain-text answers", () => {
  const schema = faqPageSchema([{ question: "How do I pay?", answer: ["You can [pay online](/pay-online).", "Use the amount on your demand."] }]);
  assert.deepEqual(schema, {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I pay?",
        acceptedAnswer: { "@type": "Answer", text: "You can pay online.\n\nUse the amount on your demand." }
      }
    ]
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test --workspace=@bpm/web` Expected: FAIL, modules not found.

- [ ] **Step 3: Write the implementations**

`site.ts`:

```ts
export const site = {
  brand: "Belgarum Property Management",
  legalName: "Belgarum Property Management Limited",
  strapline: "Block and estate management since 1989",
  phone: "0800 298 0069",
  phoneHref: "tel:+448002980069",
  email: "management@bpmanagement.org",
  solicitorEmail: "solicitorenquiries@bpmanagement.org",
  office: "Old Manor Nursery, Kilham Lane, Winchester, Hampshire, SO22 5QD",
  hours: "Monday to Thursday, 9am to 5pm; Friday, 9am to 4.30pm",
  companyNumber: "07580603",
  registeredOffice: "Highland House, Mayflower Close, Chandlers Ford, Hampshire, SO53 4AR"
} as const;
```

`calls-to-action.ts`:

```ts
export const callKeys = ["proposal", "development", "residents", "sale-pack", "pay"] as const;

export type CallKey = (typeof callKeys)[number];
export type BandVariant = "proposal" | "development" | "residents";

export const calls: Record<CallKey, { label: string; href: string }> = {
  proposal: { label: "Request a management proposal", href: "/contact?type=new-management" },
  development: { label: "Talk to us about a new development", href: "/contact?type=new-development" },
  residents: { label: "Contact your property manager", href: "/contact" },
  "sale-pack": { label: "Order a leasehold sale pack", href: "#how-it-works" },
  pay: { label: "Pay your service charge", href: "/pay-online" }
};

export const bandFor = (key: CallKey): BandVariant => (key === "proposal" || key === "development" ? key : "residents");
```

`enquiry-types.ts`:

```ts
export const enquiryTypes = [
  { value: "new-management", label: "New management for a building" },
  { value: "new-development", label: "A new development" },
  { value: "service-charge", label: "Service charge or accounts" },
  { value: "repairs", label: "Repairs and maintenance" },
  { value: "leasehold-sale-pack", label: "Leasehold sale pack" },
  { value: "fire-safety", label: "Fire and building safety" },
  { value: "section-20", label: "Section 20 or major works" },
  { value: "company-secretarial", label: "Company secretary" },
  { value: "complaint", label: "A complaint" },
  { value: "general", label: "Something else" }
] as const;

export type EnquiryType = (typeof enquiryTypes)[number]["value"];

export const presetEnquiryType = (search: string): EnquiryType | "" => {
  const type = new URLSearchParams(search).get("type");
  return enquiryTypes.find(entry => entry.value === type)?.value ?? "";
};

export const needsPropertyAddress = (type: string): boolean => type !== "" && type !== "new-development" && type !== "general";
```

`faq-schema.ts`:

```ts
import { stripInline } from "./inline-markdown.ts";

export type Faq = { question: string; answer: string[] };

export const faqPageSchema = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer.map(stripInline).join("\n\n") }
  }))
});
```

The `.ts` extension in `faq-schema.ts`'s import lets `node --test` load it. Astro's base tsconfig allows `.ts` import extensions. If `astro build` rejects it, stop and report it.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test --workspace=@bpm/web` Expected: PASS, 14 tests.

- [ ] **Step 5: Commit**

```bash
npm run format
git add apps/web/src/assets/scripts/site.ts apps/web/src/assets/scripts/calls-to-action.ts apps/web/src/assets/scripts/calls-to-action.test.ts apps/web/src/assets/scripts/enquiry-types.ts apps/web/src/assets/scripts/enquiry-types.test.ts apps/web/src/assets/scripts/faq-schema.ts apps/web/src/assets/scripts/faq-schema.test.ts
git commit -m "FEATURE: add site constants, calls to action, enquiry types and FAQ schema"
```

---

### Task 3: Layout shell: titles, CTA band, trust strip, legal layout

Copy sources: `docs/content/written/global/cta-band.md`, `global/trust-strip.md`.

**Files:**

- Create: `apps/web/src/components/global/TrustStrip.astro`
- Modify: `apps/web/src/layouts/Base.astro`, `Default.astro`, `Text.astro`, `apps/web/src/components/global/CTA.astro`, `Schema.astro`

**Interfaces:**

- Consumes: `site`, `calls`, `BandVariant` (Task 2).
- Produces:
  - `Default` props: everything in `Base` `Props`, plus `cta?: BandVariant | false` (default `"proposal"`; `false` hides the band), `ctaHeading?: string`, `ctaText?: string`, `trustStrip?: boolean` (default `false`).
  - `<TrustStrip variant="full" | "compact" />`.
  - `Base`: on `/` the `<title>` is the `title` prop exactly; elsewhere `${title} - Belgarum Property Management`.
  - `Text` layout frontmatter: `title`, `description`, `updated` (YAML date).

- [ ] **Step 1: Base titles**

In `Base.astro`, replace lines 38 to 42 with:

```ts
const brand = "Belgarum Property Management";
const pageTitle = isHomePage ? title : `${title} - ${brand}`;
```

Change `<meta property="og:site_name" content={appTitle} />` to `content={brand}`, and `<Schema data={{ appTitle, schemaImage: socialImageURL, schemaLogo }} />` to `<Schema data={{ schemaImage: socialImageURL, schemaLogo }} />`. In `Schema.astro`, remove `appTitle` from `Props` and from the destructuring.

- [ ] **Step 2: TrustStrip component**

`apps/web/src/components/global/TrustStrip.astro`:

```astro
---
import twMerge from "@bpm/custom-merge";

interface Props {
  variant?: "full" | "compact";
  class?: string;
}

const { variant = "full", class: classes } = Astro.props;

const items = {
  full: ["Established in 1989", "Over 150 developments managed", "Full Member of The Property Institute", "Member of The Property Ombudsman", "Service charge money held in designated trust accounts", "£5 million professional indemnity insurance"],
  compact: ["Over 150 developments managed", "Full Member of The Property Institute", "Member of The Property Ombudsman", "Service charge money held in designated trust accounts"]
};
---

<ul aria-label="About Belgarum Property Management" class={twMerge(variant === "full" ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-wrap gap-x-6 gap-y-2 text-sm", classes)}>
  {
    items[variant].map(item => (
      <li class="label flex items-center gap-3">
        <span class="bg-theme-brand size-1.5 shrink-0 rounded-full" aria-hidden="true" />
        {item}
      </li>
    ))
  }
</ul>
```

- [ ] **Step 3: CTA band variants**

Replace the content of `CTA.astro` (keep the outer markup, classes and logo mark) so the text comes from a variant:

```astro
---
import logoMark from "@assets/images/logo-mark.svg?raw";
import { type BandVariant, calls } from "@assets/scripts/calls-to-action";
import { site } from "@assets/scripts/site";
import Button from "@components/Button.astro";
import Heading from "@components/Heading.astro";
import ArrowRight from "@lucide/astro/icons/arrow-right";

interface Props {
  variant?: BandVariant;
  heading?: string;
  text?: string;
}

const bands = {
  proposal: {
    heading: "Looking for a managing agent?",
    text: "Tell us about your block or estate. We'll reply with a management proposal that sets out what we would do, with one dedicated property manager as your contact."
  },
  development: {
    heading: "Planning a new development?",
    text: "Involve us at the planning stage, so the management of your development is set up from the start."
  },
  residents: {
    heading: "Live in a building we manage?",
    text: "Your property manager is your first contact for questions about your building, your service charge or repairs."
  }
};

const { variant = "proposal", heading = bands[variant].heading, text = bands[variant].text } = Astro.props;
const call = calls[variant];
---
```

In the markup: remove the "Get in touch" subheading; the `Heading` shows `{heading}`; add `<p class="max-w-[60ch] text-lg">{text}</p>` under it; the button is `<Button label={call.label} href={call.href}>`; the phone block becomes:

```astro
<div class="flex flex-col whitespace-nowrap">
  <p class="label text-sm">Or call us</p>
  <a class="label link leading-snug" href={site.phoneHref}>Call {site.phone}</a>
  <p class="text-sm">{site.hours}</p>
</div>
```

Remove `max-sm:hidden` from the phone block, so mobile visitors see the number.

- [ ] **Step 4: Default layout props**

`Default.astro`:

```astro
---
import type { BandVariant } from "@assets/scripts/calls-to-action";
import Banner from "@components/global/Banner.astro";
import CTA from "@components/global/CTA.astro";
import Footer from "@components/global/Footer.astro";
import FooterBorder from "@components/global/FooterBorder.astro";
import Trim from "@components/global/Trim.astro";
import TrustStrip from "@components/global/TrustStrip.astro";
import Section from "@components/Section.astro";
import Base, { type Props as BaseProps } from "@layouts/Base.astro";

interface Props extends BaseProps {
  cta?: BandVariant | false;
  ctaHeading?: string;
  ctaText?: string;
  trustStrip?: boolean;
}

const { title, description, cta = "proposal", ctaHeading, ctaText, trustStrip = false, ...props } = Astro.props;
---

<Base title={title} description={description} {...props}>
  <slot name="head" slot="head" />
  <div id="p_site" class="theme-light relative flex min-h-screen flex-col">
    <slot name="header">
      <header id="p_header-group">
        <Banner />
      </header>
    </slot>
    <main id="p_main-group" class="my-auto">
      <slot name="default" />
      {
        trustStrip && (
          <Section class="pt-0 sm:pt-0 md:pt-0 lg:pt-0">
            <div class="container">
              <TrustStrip />
            </div>
          </Section>
        )
      }
    </main>
    <slot name="footer">
      <footer id="p_footer-group" class="bg-theme-background theme-dark">
        {cta && <CTA variant={cta} heading={ctaHeading} text={ctaText} />}
        <Footer />
        <FooterBorder />
        <Trim />
      </footer>
    </slot>
  </div>
  <slot name="foot" slot="foot" />
</Base>
```

- [ ] **Step 5: Text layout date**

In `Text.astro`, replace the hard-coded `<dd>8 November 2024</dd>` block with a date from frontmatter, shown only when set:

```astro
{
  frontmatter.updated && (
    <dl class="border-theme-border flex items-center gap-3.5 border-y py-3 text-sm">
      <dt class="text-theme-foreground-bold font-bold">Last updated</dt>
      <dd>{new Date(frontmatter.updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</dd>
    </dl>
  )
}
```

- [ ] **Step 6: Build and check in the browser**

Run: `npm run build` Expected: build succeeds. Run `npm run dev`. On `/about`, the CTA band shows "Looking for a managing agent?", the proposal text, the "Request a management proposal" button and the phone line with hours. The tab title is "Our property management story - Belgarum Property Management" (old page title; Task 12 changes it).

- [ ] **Step 7: Commit**

```bash
npm run format
git add apps/web/src/layouts/Base.astro apps/web/src/layouts/Default.astro apps/web/src/layouts/Text.astro apps/web/src/components/global/CTA.astro apps/web/src/components/global/TrustStrip.astro apps/web/src/components/global/Schema.astro
git commit -m "FEATURE: add CTA band variants, trust strip and page title rules"
```

---

### Task 4: Header and mobile navigation

Copy source: `docs/content/written/global/header.md`.

**Files:**

- Modify: `apps/web/src/assets/scripts/nav-links.ts`, `apps/web/src/assets/scripts/helpers.ts`, `apps/web/src/components/global/Banner.astro`, `apps/web/src/components/global/Gutter.astro`

**Interfaces:**

- Consumes: `calls`, `site` (Task 2).
- Produces: `NavLink = { label: string; href?: string; activePath?: string; allLabel?: string; children?: NavLink[] }`; `getAudiences()` in `helpers.ts` (returns `[]` until Task 8 adds the collection; see Step 1).

- [ ] **Step 1: Navigation data**

`nav-links.ts`:

```ts
import { getAudiences, getServices } from "@helpers";

export type NavLink = {
  label: string;
  href?: string;
  activePath?: string;
  allLabel?: string;
  children?: NavLink[];
};

export const getNavLinks = async (): Promise<NavLink[]> => {
  const [services, audiences] = await Promise.all([getServices(), getAudiences()]);

  return [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "/services",
      allLabel: "All services",
      children: services.map(service => ({ label: service.data.title, href: `/services/${service.id}` }))
    },
    {
      label: "Who we work with",
      activePath: "/who-we-work-with",
      children: audiences.map(audience => ({ label: audience.data.title, href: `/who-we-work-with/${audience.id}` }))
    },
    { label: "About", href: "/about" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" }
  ];
};
```

In `helpers.ts`, add a temporary `getAudiences` that Task 8 replaces:

```ts
export const getAudiences = async () => [] as { id: string; data: { title: string } }[];
```

- [ ] **Step 2: Banner**

In `Banner.astro`:

- Active state: replace both `parentPath === link.href` with `parentPath === (link.activePath ?? link.href)`.
- Dropdown footer link: render the `<hr>` and the "All …" link only when `link.href && link.allLabel`, with the text `{link.allLabel}`.
- Hide a dropdown with no children: wrap the dropdown `li` in a check `link.children && link.children.length > 0`; otherwise render nothing for that item. (Before Task 8, "Who we work with" has no children.)
- Logo link: `title="Belgarum Property Management home page"`.
- Actions: replace the "Give us a call" block with one link: `<a class="label link whitespace-nowrap max-sm:hidden" href={site.phoneHref}>Call {site.phone}</a>`. Primary button: `label={calls.proposal.label} href={calls.proposal.href}`. Secondary button: `label={calls.pay.label} href={calls.pay.href}`. Keep the icons.
- Menu button: `aria-label="Open menu"`, `title="Open menu"`, screen reader text "Open menu".

- [ ] **Step 3: Gutter (mobile navigation)**

In `Gutter.astro` apply the same changes: "All …" link only when `link.href && link.allLabel`, using `link.allLabel`; skip dropdowns with no children; the close button gets `aria-label="Close menu"`, `title="Close menu"` and screen reader text "Close menu"; the action block (around lines 79 to 86) shows `Call {site.phone}` as a link, then the proposal button and the pay button with labels and targets from `calls`. Remove "Give us a call".

- [ ] **Step 4: Build and check**

Run: `npm run build` Expected: succeeds.

Run `npm run dev` and check, with the browser window at 640, 1024, 1280 and 1536px wide:

- the menu items read Home, Services, About, FAQs, Contact ("Who we work with" appears after Task 8);
- the Services dropdown ends with "All services";
- the buttons read "Request a management proposal" and "Pay your service charge";
- nothing overflows the header or wraps onto a second line. If it does, report it with a screenshot. Do not change the copy to fix it.

- [ ] **Step 5: Commit**

```bash
npm run format
git add apps/web/src/assets/scripts/nav-links.ts apps/web/src/assets/scripts/helpers.ts apps/web/src/components/global/Banner.astro apps/web/src/components/global/Gutter.astro
git commit -m "UPDATE: header and mobile navigation to approved copy"
```

---

### Task 5: Footer and legal line

Copy source: `docs/content/written/global/footer.md`.

**Files:**

- Modify: `apps/web/src/components/global/Footer.astro`, `apps/web/src/components/global/Trim.astro`, `apps/web/src/components/SocialLinks.astro`

**Interfaces:**

- Consumes: `site` (Task 2), `getServices`, `getAudiences` (`helpers.ts`).

- [ ] **Step 1: Footer**

Rewrite the inner content of `Footer.astro`, keeping its outer layout classes:

```astro
---
import { site } from "@assets/scripts/site";
import Heading from "@components/Heading.astro";
import { getAudiences, getServices } from "@helpers";

const [services, audiences] = await Promise.all([getServices(), getAudiences()]);

const linkClass = "text-theme-foreground hover:text-theme-foreground-bold";
const bulletClass = "before:bg-theme-brand flex items-center gap-2 before:block before:h-3 before:w-1 before:rounded-full";
---

<div class="p_footer py-14 sm:py-16 md:py-20">
  <div class="container">
    <div class="flex flex-col flex-wrap justify-between gap-10 text-sm sm:gap-12 md:gap-14 lg:flex-row xl:flex-nowrap xl:items-start">
      <div class="xl:w-4c flex w-full flex-col items-start gap-5">
        <div class="flex flex-col items-start gap-2.5">
          <Heading as="h2" class="text-h5">{site.brand}</Heading>
          <p class="md:text-balance">Block and estate management since 1989. From our Winchester office, we look after blocks of flats and shared estates across Hampshire, Sussex, Dorset, London and the Home Counties.</p>
        </div>
        <ul class="flex flex-col gap-1">
          <li>Full Member of The Property Institute</li>
          <li>Member of The Property Ombudsman</li>
        </ul>
      </div>
      <div class="flex flex-col items-start gap-2.5 lg:shrink">
        <Heading as="h2" class="text-h5">Services</Heading>
        <ul class="flex flex-col gap-1">
          {
            services.map(service => (
              <li class={bulletClass}>
                <a href={`/services/${service.id}`} class={linkClass}>
                  {service.data.title}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
      <div class="flex flex-col items-start gap-2.5 lg:shrink">
        <Heading as="h2" class="text-h5">Who we work with</Heading>
        <ul class="flex flex-col gap-1">
          {
            audiences.map(audience => (
              <li class={bulletClass}>
                <a href={`/who-we-work-with/${audience.id}`} class={linkClass}>
                  {audience.data.title}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
      <div class="flex shrink flex-col items-start gap-2.5">
        <Heading as="h2" class="text-h5">Contact details</Heading>
        <dl class="grid grid-cols-[max-content_1fr] gap-x-5 gap-y-1">
          <dt><strong class="label text-sm">Phone</strong></dt>
          <dd><a href={site.phoneHref}>{site.phone}</a></dd>
          <dt><strong class="label text-sm">Email</strong></dt>
          <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
          <dt><strong class="label text-sm">Office</strong></dt>
          <dd class="lg:max-w-[28ch]">{site.office}</dd>
          <dt><strong class="label text-sm">Office hours</strong></dt>
          <dd class="lg:max-w-[28ch]">{site.hours}</dd>
        </dl>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Trim**

In `Trim.astro`, set the links to the footer copy order and build the legal line from `site`:

```ts
const links = [
  { label: "Pay online", href: "/pay-online" },
  { label: "Contact", href: "/contact" },
  { label: "Complaints procedure", href: "/complaints-procedure" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Cookie policy", href: "/cookie-policy" }
];
```

Legal line: `&copy; {new Date().getFullYear()} {site.legalName}. Registered in England and Wales, company number {site.companyNumber}. Registered office: {site.registeredOffice}.`

"Cookie settings" is left out (decision 5).

- [ ] **Step 3: Social links**

In `SocialLinks.astro`, keep the Facebook, Instagram and LinkedIn entries and remove the others. Set each `href` to `https://www.facebook.com/belgarumpropertymanagementltd`, `https://www.instagram.com/belgarumpropertymanagementltd` and `https://www.linkedin.com/company/belgarumpropertymanagementltd`.

- [ ] **Step 4: Build and check**

Run: `npm run build` Expected: succeeds. In the dev server, the footer shows the description, memberships, Services, Who we work with (empty until Task 8), Contact details with office hours, and the legal line.

- [ ] **Step 5: Commit**

```bash
npm run format
git add apps/web/src/components/global/Footer.astro apps/web/src/components/global/Trim.astro apps/web/src/components/SocialLinks.astro
git commit -m "UPDATE: footer and legal line to approved copy"
```

---

### Task 6: Service page template and the block and estate management page

Copy source: `docs/content/written/services/block-and-estate-management.md`.

**Files:**

- Modify: `apps/web/src/content.config.ts`, `apps/web/src/pages/services/[...slug].astro`, `apps/web/src/components/collection/question/Question.astro`
- Create: `apps/web/src/components/sections/{PageHero,IntroBlock,IncludedList,StepList,ProofList,FaqList,ServiceLinks}.astro`, `apps/web/src/content/services/block-and-estate-management.json`
- Delete: all 9 files in `apps/web/src/content/services/` (`budgeting.json`, `company-secretarial.json`, `fire-safety-guidance.json`, `major-works.json`, `property-sales-legal-support.json`, `repairs-maintenance.json`, `section-20-consultation.json`, `site-visits.json`, `year-end-accounting.json`). They hold placeholder text and do not fit the new schema. Task 7 adds the other 8 pages.
- Delete: `apps/web/src/components/collection/service/{About,Features,Why}.astro`
- Modify: `apps/web/scripts/expected-pages.mjs`

**Interfaces:**

- Consumes: `renderInline` and `InlineText` (Task 1); `calls`, `callKeys`, `bandFor`, `faqPageSchema` (Task 2); `Default` props (Task 3).
- Produces:
  - Service entry `data`: `{ status, order, title, metaTitle: string, hero: { heading?: string; note?: string; trustLine: boolean }, cta: CallKey, description, image, intro: { heading, paragraphs: string[] }, included: { heading, items: string[] }, steps: { title, text }[], proof: string[], faqs: { question, answer: string[] }[], related: { collection: "services"; id: string }[] }`.
  - Shared field object `pageFields`, `stepSchema`, `faqSchema` in `content.config.ts`, used by Task 8.
  - Section components with these props:
    - `PageHero { eyebrow: string; heading: string; lead: string; call: CallKey; note?: string; trustLine?: boolean; image?: ImageMetadata; imageAlt?: string }`
    - `IntroBlock { heading: string; paragraphs: string[] }`
    - `IncludedList { heading: string; items: string[] }`
    - `StepList { steps: { title: string; text: string }[] }` (renders `id="how-it-works"`)
    - `ProofList { items: string[] }`
    - `FaqList { faqs: { question: string; answer: string[] }[] }`
    - `ServiceLinks { heading: string; ids: string[] }`

- [ ] **Step 1: Add the expected page**

In `expected-pages.mjs`:

```js
export const expectedPages = {
  "/services/block-and-estate-management/": {
    title: "Block management in Hampshire - Belgarum Property Management",
    h1: "Block and estate management"
  }
};
```

Note: the expected `<title>` uses the `meta_title` value from the copy file, not the `title` field. Step 6 passes `meta_title` to the layout.

- [ ] **Step 2: Run the checker to verify it fails**

Run: `npm run build && npm run check --workspace=@bpm/web -- /services/block-and-estate-management/` Expected: FAIL, "page not built".

- [ ] **Step 3: Collection schema**

In `content.config.ts`, import `reference` from `astro:content` and `callKeys` from `@assets/scripts/calls-to-action`. Replace the `services` collection with:

```ts
const stepSchema = z.object({ title: z.string(), text: z.string() });
const faqSchema = z.object({ question: z.string(), answer: z.array(z.string()).min(1) });

const pageFields = {
  status: statusSchema,
  order: z.number().optional().default(0),
  title: z.string(),
  metaTitle: z.string().max(34),
  hero: z.object({ heading: z.string().optional(), note: z.string().optional(), trustLine: z.boolean().default(false) }).default({ trustLine: false }),
  cta: z.enum(callKeys),
  description: z.string().max(155),
  intro: z.object({ heading: z.string(), paragraphs: z.array(z.string()).min(1) }),
  included: z.object({ heading: z.string(), items: z.array(z.string()).min(1) }),
  proof: z.array(z.string()).min(1),
  faqs: z.array(faqSchema).min(1)
};

const services = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/services" }),
  schema: ({ image }) =>
    z.object({
      ...pageFields,
      image: image(),
      steps: z.array(stepSchema).min(1),
      related: z.array(reference("services")).min(1)
    })
});
```

`metaTitle` holds the copy file's `meta_title`. The page route passes it to the layout as the `<title>`.

- [ ] **Step 4: Hub content**

Create `apps/web/src/content/services/block-and-estate-management.json`. Transcription rules (Task 7 and Task 8 use the same rules):

| Copy file                                            | JSON                                                            |
| ---------------------------------------------------- | --------------------------------------------------------------- |
| `meta_title` (front matter)                          | `metaTitle`                                                     |
| `## title`                                           | `title`                                                         |
| `## hero.heading` (if present)                       | `hero.heading`                                                  |
| "Under the hero: compact trust line"                 | `hero.trustLine: true`                                          |
| "Under the hero call to action: …"                   | `hero.note` (the quoted text)                                   |
| `## description`                                     | `description`                                                   |
| "Hero call to action: Request a management proposal" | `cta: "proposal"` (map labels with the `calls` table in Task 2) |
| `### intro.heading`, `### intro.paragraphs`          | `intro.heading`, `intro.paragraphs` (one string per paragraph)  |
| `### included.heading`, `### included.items`         | `included.heading`, `included.items`                            |
| `### 1. Title` and its text under `## steps`         | `steps[].title` (without the number), `steps[].text`            |
| `## proof` list                                      | `proof`                                                         |
| `### Question?` and its paragraphs under `## faqs`   | `faqs[].question`, `faqs[].answer` (one string per paragraph)   |
| `## related` (or `## services`) slugs                | `related` (or `services`)                                       |
| Order in `global/header.md` services dropdown        | `order` (1 to 9)                                                |

Full file:

```json
{
  "order": 1,
  "title": "Block and estate management",
  "metaTitle": "Block management in Hampshire",
  "hero": { "trustLine": true },
  "cta": "proposal",
  "description": "Block and estate management across Hampshire and the south since 1989. A dedicated property manager, money held in trust and the legal admin done for you.",
  "image": "https://dummyimage.com/1536x658/ede2de/7e6d67",
  "intro": {
    "heading": "What block and estate management covers",
    "paragraphs": ["Running a block of flats or a shared estate takes time and carries legal duties. A managing agent takes that work on for you: the money, the repairs, the safety checks and the company paperwork.", "Belgarum Property Management works for [resident management companies (RMCs) and right to manage (RTM) companies](/who-we-work-with/rmc-and-rtm-directors), run by the leaseholders. We also work for [freeholders](/who-we-work-with/freeholders-and-private-landlords) (the owners of the building and the land) and private landlords.", "You get one dedicated property manager who knows your building. Block and estate management is all we do, and we've done it since 1989."]
  },
  "included": {
    "heading": "What's included",
    "items": ["A dedicated property manager, available Monday to Friday in office hours", "Regular site inspections, so your property manager sees problems in the communal areas", "Management reports for larger developments", "[Service charge budgets](/services/service-charge-budgets) (the yearly plan for what leaseholders pay), so each leaseholder knows what they will pay towards running the building", "Reserve fund planning, to save for large future costs such as a new roof", "Collection of service charges, with in-house credit control and independent solicitors for arrears", "Bookkeeping, with the money for each block or estate held in its own designated trust account, separate from our own money", "Repairs and maintenance through contractors from our database, with work tendered regularly so prices are compared", "Insurance policies, as part of managing the communal areas", "[Fire risk, asbestos and health and safety assessments](/services/fire-and-building-safety) by specialist firms, with the actions and their urgency reported to you", "Planning for major works, and [Section 20 consultation](/services/section-20-consultation) (the legal process for consulting leaseholders before major works)", "[Company secretary duties for RMCs](/services/company-secretarial): annual general meetings (AGMs), Companies House returns, the share register and a registered office", "Enforcement of lease covenants, the promises in each lease such as paying the service charge or not causing a nuisance"]
  },
  "steps": [
    {
      "title": "One named contact",
      "text": "You get a dedicated property manager. They know your building and are your main contact, Monday to Thursday, 9am to 5pm, and Friday, 9am to 4.30pm."
    },
    {
      "title": "A service charge budget that saves ahead",
      "text": "We prepare the service charge budget, including what goes into the reserve fund. Then we collect the service charges and chase any arrears."
    },
    {
      "title": "Regular inspections and repairs",
      "text": "Your property manager inspects the building and communal areas regularly. When something needs fixing, we arrange the work with a contractor."
    },
    {
      "title": "Safety and legal checks",
      "text": "We arrange the fire risk, asbestos and health and safety assessments the building needs, using specialist firms. For RMCs, we also handle the company secretary work."
    },
    {
      "title": "Accounts at the year end",
      "text": "We keep the books for each block or estate and produce the service charge accounts, which show what was spent against the budget. Larger developments also get regular management reports."
    }
  ],
  "proof": ["Block and estate management is all we do. We don't sell or let property.", "We manage developments from blocks of 4 flats to a 22-floor high rise.", "Our office is in Winchester, close to the M3.", "Our own accounts team keeps the books and runs credit control for each block or estate.", "We act as company secretary for about 15 RMCs today.", "We use specialist firms for fire risk, asbestos, lifts and health and safety.", "Several of our team have been with BPM since 2011 or earlier. [Meet the team](/about)."],
  "faqs": [
    {
      "question": "What does a managing agent do?",
      "answer": ["A managing agent runs a building or estate day to day for the people responsible for it. That usually means the freeholder, an RMC or an RTM company.", "We set and collect the service charge, arrange repairs and safety checks, and keep the accounts. The service charge is the money leaseholders pay, under their lease, towards running, repairing and insuring the building."]
    },
    {
      "question": "How much does block management cost?",
      "answer": ["It depends on the building: its size, its communal areas and the work it needs. Our management fee is one part of the service charge, and it is set out in the budget.", "To find out what we would charge for your building, [request a management proposal](/contact?type=new-management)."]
    },
    {
      "question": "Do you manage small blocks?",
      "answer": ["Yes. We manage buildings from 4 flats up to a 22-floor high rise. We also work for private landlords."]
    },
    {
      "question": "Do you manage freehold estates as well as blocks of flats?",
      "answer": ["Yes. We manage leasehold blocks and freehold estate areas. On an estate, the homeowners usually pay an estate charge towards the shared roads, paths and green spaces."]
    },
    {
      "question": "Which areas do you cover?",
      "answer": ["Hampshire, Sussex, Dorset, London and the Home Counties. Our office is in Winchester, close to the M3."]
    }
  ],
  "related": ["block-and-estate-management"]
}
```

`related` points at the hub itself only until Task 7 adds the real targets (`service-charge-budgets`, `company-secretarial`, `fire-and-building-safety`); `reference()` fails the build on a slug that does not exist yet. Task 7 Step 3 sets the real list.

- [ ] **Step 5: Section components**

Use the existing visual style (container widths, `Heading`, `subheading` eyebrow with the action-coloured rule, `bg-theme-background-highlight` cards) from the current `[...slug].astro`, `Features.astro` and `Question.astro`.

`PageHero.astro`:

```astro
---
import logoMark from "@assets/images/logo-mark.svg?raw";
import { type CallKey, calls } from "@assets/scripts/calls-to-action";
import Button from "@components/Button.astro";
import TrustStrip from "@components/global/TrustStrip.astro";
import Heading from "@components/Heading.astro";
import ArrowRight from "@lucide/astro/icons/arrow-right";
import type { ImageMetadata } from "astro";
import { Image } from "astro:assets";

interface Props {
  eyebrow: string;
  heading: string;
  lead: string;
  call: CallKey;
  note?: string;
  trustLine?: boolean;
  image?: ImageMetadata;
  imageAlt?: string;
}

const { eyebrow, heading, lead, call, note, trustLine = false, image, imageAlt = "" } = Astro.props;
const { label, href } = calls[call];
---

<div class="container">
  <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-20 xl:gap-40">
    <div class="lg:max-w-6c flex flex-col gap-2 md:gap-3">
      <div class="flex items-center gap-5">
        <p class="subheading text-theme-action">{eyebrow}</p>
        <div class="bg-theme-action h-0.5 w-20 rounded sm:w-24"></div>
      </div>
      <Heading as="h1" class="text-h2 sm:text-h1 md:text-h0">{heading}</Heading>
    </div>
    <div class="flex flex-col items-start gap-5 lg:max-w-[50ch] lg:flex-1">
      <p class="text-lg sm:text-balance xl:text-xl">{lead}</p>
      <Button label={label} href={href}>
        <ArrowRight slot="suffix" />
      </Button>
      {note && <p class="text-sm">{note}</p>}
    </div>
  </div>
  {trustLine && <TrustStrip variant="compact" class="mt-8 md:mt-10" />}
</div>
{
  image && (
    <div class="container-14c">
      <div class="theme-dark scoop relative overflow-hidden rounded-xl xl:rounded-3xl">
        <Image src={image} alt={imageAlt} width={1536} height={658} class="aspect-ultrawide w-full object-cover" />
        <div class="text-theme-foreground-bold pointer-events-none absolute right-0 bottom-0 z-20 hidden w-90 translate-1/6 -scale-x-100 opacity-40 lg:block xl:w-120" aria-hidden="true" set:html={logoMark} />
      </div>
    </div>
  )
}
```

`IntroBlock.astro` (paragraphs may contain links):

```astro
---
import Heading from "@components/Heading.astro";
import InlineText from "@components/sections/InlineText.astro";

interface Props {
  heading: string;
  paragraphs: string[];
}

const { heading, paragraphs } = Astro.props;
---

<div class="container">
  <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-20 xl:gap-40">
    <Heading as="h2" class="text-h4 sm:text-h3 xl:text-h2 lg:w-80 lg:shrink-0 xl:w-96" set:text={heading} />
    <div class="flex flex-1 flex-col gap-5">
      {paragraphs.map((paragraph, index) => <InlineText text={paragraph} class={index === 0 ? "text-lg" : ""} />)}
    </div>
  </div>
</div>
```

`IncludedList.astro`:

```astro
---
import Heading from "@components/Heading.astro";
import InlineText from "@components/sections/InlineText.astro";

interface Props {
  heading: string;
  items: string[];
}

const { heading, items } = Astro.props;
---

<div class="container">
  <div class="flex flex-col gap-8">
    <Heading as="h2" class="text-h4 sm:text-h3" set:text={heading} />
    <ul class="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
      {
        items.map(item => (
          <li class="flex items-start gap-4">
            <span class="bg-theme-action mt-2.5 size-1.5 shrink-0 rounded-full" aria-hidden="true" />
            <InlineText as="span" text={item} />
          </li>
        ))
      }
    </ul>
  </div>
</div>
```

`StepList.astro`:

```astro
---
import Heading from "@components/Heading.astro";
import InlineText from "@components/sections/InlineText.astro";

interface Props {
  steps: { title: string; text: string }[];
}

const { steps } = Astro.props;
---

<div class="container" id="how-it-works">
  <div class="flex flex-col gap-8">
    <Heading as="h2" class="text-h4 sm:text-h3">How it works</Heading>
    <ol class="grid grid-cols-1 gap-1.5 overflow-hidden rounded-xl sm:grid-cols-2 xl:grid-cols-3">
      {
        steps.map((step, index) => (
          <li class="bg-theme-background-highlight flex flex-col gap-3 p-8 sm:p-10">
            <p class="text-theme-action text-h4 font-bold" aria-hidden="true">
              {index + 1}
            </p>
            <Heading as="h3" class="text-h5" set:text={step.title} />
            <InlineText text={step.text} class="text-sm" />
          </li>
        ))
      }
    </ol>
  </div>
</div>
```

`ProofList.astro`:

```astro
---
import Heading from "@components/Heading.astro";
import InlineText from "@components/sections/InlineText.astro";

interface Props {
  items: string[];
}

const { items } = Astro.props;
---

<div class="container">
  <div class="flex flex-col gap-8">
    <Heading as="h2" class="text-h4 sm:text-h3">Why BPM</Heading>
    <ul class="flex flex-col gap-4">
      {
        items.map(item => (
          <li class="flex items-start gap-4">
            <span class="bg-theme-brand mt-2.5 size-1.5 shrink-0 rounded-full" aria-hidden="true" />
            <InlineText as="span" text={item} />
          </li>
        ))
      }
    </ul>
  </div>
</div>
```

`Question.astro`: change the answer line to render links:

```astro
{answer.map(paragraph => <InlineText text={paragraph} />)}
```

(import `InlineText` from `@components/sections/InlineText.astro`).

`FaqList.astro`:

```astro
---
import Question from "@components/collection/question/Question.astro";
import Heading from "@components/Heading.astro";

interface Props {
  faqs: { question: string; answer: string[] }[];
}

const { faqs } = Astro.props;
---

<div class="container-8c">
  <div class="flex flex-col gap-8">
    <Heading as="h2" class="text-h4 sm:text-h3">Common questions</Heading>
    <div class="flex flex-col gap-4">
      {faqs.map(faq => <Question title={faq.question} answer={faq.answer} />)}
    </div>
  </div>
</div>
```

`ServiceLinks.astro` (Task 9 replaces the list with cards):

```astro
---
import Heading from "@components/Heading.astro";
import { getServices } from "@helpers";

interface Props {
  heading: string;
  ids: string[];
}

const { heading, ids } = Astro.props;
const services = (await getServices()).filter(service => ids.includes(service.id));
---

<div class="container">
  <div class="flex flex-col gap-8">
    <Heading as="h2" class="text-h4 sm:text-h3" set:text={heading} />
    <ul class="flex flex-col gap-2">
      {
        services.map(service => (
          <li>
            <a class="link" href={`/services/${service.id}`}>
              {service.data.title}
            </a>
          </li>
        ))
      }
    </ul>
  </div>
</div>
```

- [ ] **Step 6: Service route**

Replace `apps/web/src/pages/services/[...slug].astro`:

```astro
---
import { bandFor } from "@assets/scripts/calls-to-action";
import { faqPageSchema } from "@assets/scripts/faq-schema";
import Section from "@components/Section.astro";
import FaqList from "@components/sections/FaqList.astro";
import IncludedList from "@components/sections/IncludedList.astro";
import IntroBlock from "@components/sections/IntroBlock.astro";
import PageHero from "@components/sections/PageHero.astro";
import ProofList from "@components/sections/ProofList.astro";
import ServiceLinks from "@components/sections/ServiceLinks.astro";
import StepList from "@components/sections/StepList.astro";
import { getServices } from "@helpers";
import Default from "@layouts/Default.astro";

export async function getStaticPaths() {
  const services = await getServices();
  return services.map(service => ({ params: { slug: service.id }, props: { service } }));
}

const { service } = Astro.props;
const { data } = service;

const siteURL = Astro.site?.href;
const canonicalURL = Astro.url.href;

const serviceSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${canonicalURL}#service`,
      name: data.title,
      serviceType: data.title,
      description: data.description,
      url: canonicalURL,
      provider: { "@id": `${siteURL}#localbusiness` },
      areaServed: ["Hampshire", "Sussex", "Dorset", "London", "Home Counties"]
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteURL },
        { "@type": "ListItem", position: 2, name: "Services", item: new URL("/services", Astro.site).href },
        { "@type": "ListItem", position: 3, name: data.title, item: canonicalURL }
      ]
    }
  ]
});
const faqSchema = JSON.stringify(faqPageSchema(data.faqs));
---

<Default title={data.metaTitle} description={data.description} cta={bandFor(data.cta)} trustStrip>
  <Fragment slot="head">
    <script type="application/ld+json" set:html={serviceSchema} />
    <script type="application/ld+json" set:html={faqSchema} />
  </Fragment>
  <Section>
    <div class="flex flex-col gap-14 sm:gap-16 md:gap-18 lg:gap-20 xl:gap-24">
      <PageHero eyebrow="Our services" heading={data.hero.heading ?? data.title} lead={data.description} call={data.cta} note={data.hero.note} trustLine={data.hero.trustLine} image={data.image} />
      <IntroBlock heading={data.intro.heading} paragraphs={data.intro.paragraphs} />
      <IncludedList heading={data.included.heading} items={data.included.items} />
      <StepList steps={data.steps} />
      <ProofList items={data.proof} />
      <FaqList faqs={data.faqs} />
      <ServiceLinks heading="Related services" ids={data.related.map(entry => entry.id)} />
    </div>
  </Section>
</Default>
```

The hero image is decorative, so `imageAlt` stays empty.

- [ ] **Step 7: Delete the old service components and content**

Delete the 9 old JSON files and `About.astro`, `Features.astro`, `Why.astro`. Run `rg -n "collection/service/(About|Features|Why)" apps/web/src` and expect no matches.

- [ ] **Step 8: Build and run the checker**

Run: `npm run build && npm run check --workspace=@bpm/web -- /services/block-and-estate-management/` Expected: the only problems are broken links to `/services/service-charge-budgets`, `/services/fire-and-building-safety`, `/services/section-20-consultation`, `/services/company-secretarial` and `/who-we-work-with/…`. Task 7 and Task 8 add those pages. Fix any other problem.

In the dev server, open `/services/block-and-estate-management` and check: the four inline links in "What's included" are clickable and show their label, not brackets; "we've" shows an apostrophe, not `&#39;`; the compact trust line sits under the hero.

- [ ] **Step 9: Commit**

```bash
npm run format
git add apps/web/src/content.config.ts apps/web/src/pages/services/[...slug].astro apps/web/src/components/sections apps/web/src/components/collection/question/Question.astro apps/web/src/content/services apps/web/src/components/collection/service/About.astro apps/web/src/components/collection/service/Features.astro apps/web/src/components/collection/service/Why.astro apps/web/scripts/expected-pages.mjs
git commit -m "FEATURE: new service page template and block and estate management page"
```

---

### Task 7: The other 8 service pages

Copy sources: the other 8 files in `docs/content/written/services/`.

**Files:**

- Create in `apps/web/src/content/services/`: `service-charge-budgets.json`, `service-charge-accounts.json`, `company-secretarial.json`, `repairs-and-maintenance.json`, `major-works.json`, `section-20-consultation.json`, `fire-and-building-safety.json`, `leasehold-sale-packs.json`
- Modify: `apps/web/src/content/services/block-and-estate-management.json` (`related`), `apps/web/scripts/expected-pages.mjs`

**Interfaces:**

- Consumes: the service schema and transcription rules (Task 6).

- [ ] **Step 1: Add the expected pages**

Add to `expectedPages`:

```js
"/services/service-charge-budgets/": { title: "Service charge budgets - Belgarum Property Management", h1: "Service charge budgets" },
"/services/service-charge-accounts/": { title: "Service charge accounts - Belgarum Property Management", h1: "Service charge accounts" },
"/services/company-secretarial/": { title: "RMC company secretary - Belgarum Property Management", h1: "Company secretary for RMCs" },
"/services/repairs-and-maintenance/": { title: "Block repairs and maintenance - Belgarum Property Management", h1: "Repairs and maintenance" },
"/services/major-works/": { title: "Major works managing agent - Belgarum Property Management", h1: "Major works" },
"/services/section-20-consultation/": { title: "Section 20 consultation explained - Belgarum Property Management", h1: "Section 20 consultation" },
"/services/fire-and-building-safety/": { title: "Fire safety in blocks of flats - Belgarum Property Management", h1: "Fire and building safety" },
"/services/leasehold-sale-packs/": { title: "Leasehold sale packs (LPE1) - Belgarum Property Management", h1: "Leasehold sale packs" }
```

- [ ] **Step 2: Run the checker to verify it fails**

Run: `npm run build && npm run check --workspace=@bpm/web -- /services/` Expected: FAIL, 8 "page not built".

- [ ] **Step 3: Transcribe the 8 pages**

For each copy file, create the JSON file with the same name, following the transcription rules in Task 6 Step 4 exactly. Per-page values:

| File                            | `order` | `cta`       | `hero`                                                                |
| ------------------------------- | ------- | ----------- | --------------------------------------------------------------------- |
| `service-charge-budgets.json`   | 2       | `proposal`  | `{}`                                                                  |
| `service-charge-accounts.json`  | 3       | `proposal`  | `{}`                                                                  |
| `company-secretarial.json`      | 4       | `proposal`  | `{}`                                                                  |
| `repairs-and-maintenance.json`  | 5       | `residents` | `{}`                                                                  |
| `major-works.json`              | 6       | `proposal`  | `{}`                                                                  |
| `section-20-consultation.json`  | 7       | `residents` | `{}`                                                                  |
| `fire-and-building-safety.json` | 8       | `proposal`  | `{}`                                                                  |
| `leasehold-sale-packs.json`     | 9       | `sale-pack` | `{ "note": "Solicitors: email solicitorenquiries@bpmanagement.org" }` |

All use `"image": "https://dummyimage.com/1536x658/ede2de/7e6d67"`.

Points to watch:

- `repairs-and-maintenance.md` step 1 ends with a `[NEEDS: repair reporting (Q6)]` tag. Strip it.
- `repairs-and-maintenance.md` FAQ "What should I do in an emergency?" has a `[NEEDS: out-of-hours line (Q1)]` paragraph. Leave that paragraph out; keep the first one.
- `leasehold-sale-packs.md` steps 1 to 3 and the FAQ "How much does a pack cost, and how long does it take?" contain `[NEEDS: …]` tags. Strip the tags. The FAQ's answer becomes two paragraphs: "The seller usually pays the fee. Depending on the lease, it may count as an administration charge." and "To avoid delays, the seller's solicitor should order the pack as soon as a sale is agreed."
- `major-works.md` has 6 FAQs. Keep all 6.
- `leasehold-sale-packs.md` names its included heading "What a pack usually covers". Use it.

Then set the hub's `related` to `["service-charge-budgets", "company-secretarial", "fire-and-building-safety"]`.

- [ ] **Step 4: Check no tag survived**

Run: `rg -n "NEEDS" apps/web/src/content/services` Expected: no matches.

- [ ] **Step 5: Build and run the checker**

Run: `npm run build && npm run check --workspace=@bpm/web -- /services/` Expected: the only problems are broken links to `/who-we-work-with/…` (Task 8 adds them). On `/services/leasehold-sale-packs`, the "Order a leasehold sale pack" button jumps to "How it works". On `/services/section-20-consultation`, step 5 shows the "Request a management proposal" link.

- [ ] **Step 6: Commit**

```bash
npm run format
git add apps/web/src/content/services apps/web/scripts/expected-pages.mjs
git commit -m "FEATURE: add the remaining 8 service pages"
```

---

### Task 8: Audience pages

Copy sources: `docs/content/written/who-we-work-with/*.md`; card text from the `audiences` table in `docs/content/written/pages/home.md`.

**Files:**

- Modify: `apps/web/src/content.config.ts`, `apps/web/src/assets/scripts/helpers.ts`, `apps/web/scripts/expected-pages.mjs`
- Create: `apps/web/src/content/audiences/rmc-and-rtm-directors.json`, `freeholders-and-private-landlords.json`, `developers.json`, `apps/web/src/pages/who-we-work-with/[slug].astro`

**Interfaces:**

- Consumes: `pageFields`, `stepSchema` (Task 6); section components (Task 6).
- Produces: audience entry `data`: the `pageFields` plus `card: string`, `steps: { title, text }[]` (may be empty), `services: { collection: "services"; id: string }[]`; `getAudiences()` sorted by `order`.

- [ ] **Step 1: Add the expected pages**

```js
"/who-we-work-with/rmc-and-rtm-directors/": { title: "RMC and RTM managing agent - Belgarum Property Management", h1: "A managing agent for RMC and RTM boards" },
"/who-we-work-with/freeholders-and-private-landlords/": { title: "Freeholder block management - Belgarum Property Management", h1: "Block management for freeholders and landlords" },
"/who-we-work-with/developers/": { title: "New build managing agent - Belgarum Property Management", h1: "Block and estate management for new developments" }
```

- [ ] **Step 2: Run the checker to verify it fails**

Run: `npm run build && npm run check --workspace=@bpm/web -- /who-we-work-with/` Expected: FAIL, 3 "page not built".

- [ ] **Step 3: Collection and helper**

In `content.config.ts` add:

```ts
const audiences = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/audiences" }),
  schema: z.object({
    ...pageFields,
    card: z.string(),
    steps: z.array(stepSchema).default([]),
    services: z.array(reference("services")).min(1)
  })
});
```

and add `audiences` to `collections`. In `helpers.ts`, replace the temporary `getAudiences` with:

```ts
export const getAudiences = async () => (await getCollection("audiences")).filter(audience => audience.data.status === "published").sort((a, b) => a.data.order - b.data.order);
```

- [ ] **Step 4: Transcribe the 3 pages**

Use the Task 6 rules. Per-page values:

| File                                     | `order` | `cta`         | `hero`                                                                                 | `card` (from `pages/home.md`)                                                                                          |
| ---------------------------------------- | ------- | ------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `rmc-and-rtm-directors.json`             | 1       | `proposal`    | `{ "heading": "A managing agent for RMC and RTM boards", "trustLine": true }`          | "You give your time for free but carry legal duties. We do the day-to-day work and can act as your company secretary." |
| `freeholders-and-private-landlords.json` | 2       | `proposal`    | `{ "heading": "Block management for freeholders and landlords", "trustLine": true }`   | "Meet your obligations under the leases and the law, with money held in trust and arrears chased in-house."            |
| `developers.json`                        | 3       | `development` | `{ "heading": "Block and estate management for new developments", "trustLine": true }` | "Involve us from the planning stage, so the management of your development is set up from the start."                  |

The `## services` list becomes `services`. The freeholders page has no steps: omit `steps`. Strip `[NEEDS: switching process (Q8)]` from the RMC switching FAQ; keep the sentences around it. Run `rg -n "NEEDS" apps/web/src/content/audiences` and expect no matches.

- [ ] **Step 5: Route**

`apps/web/src/pages/who-we-work-with/[slug].astro`:

```astro
---
import { bandFor } from "@assets/scripts/calls-to-action";
import { faqPageSchema } from "@assets/scripts/faq-schema";
import Section from "@components/Section.astro";
import FaqList from "@components/sections/FaqList.astro";
import IncludedList from "@components/sections/IncludedList.astro";
import IntroBlock from "@components/sections/IntroBlock.astro";
import PageHero from "@components/sections/PageHero.astro";
import ProofList from "@components/sections/ProofList.astro";
import ServiceLinks from "@components/sections/ServiceLinks.astro";
import StepList from "@components/sections/StepList.astro";
import { getAudiences } from "@helpers";
import Default from "@layouts/Default.astro";

export async function getStaticPaths() {
  const audiences = await getAudiences();
  return audiences.map(audience => ({ params: { slug: audience.id }, props: { audience } }));
}

const { data } = Astro.props.audience;
const faqSchema = JSON.stringify(faqPageSchema(data.faqs));
---

<Default title={data.metaTitle} description={data.description} cta={bandFor(data.cta)} trustStrip>
  <Fragment slot="head">
    <script type="application/ld+json" set:html={faqSchema} />
  </Fragment>
  <Section>
    <div class="flex flex-col gap-14 sm:gap-16 md:gap-18 lg:gap-20 xl:gap-24">
      <PageHero eyebrow="Who we work with" heading={data.hero.heading ?? data.title} lead={data.description} call={data.cta} note={data.hero.note} trustLine={data.hero.trustLine} />
      <IntroBlock heading={data.intro.heading} paragraphs={data.intro.paragraphs} />
      <IncludedList heading={data.included.heading} items={data.included.items} />
      {data.steps.length > 0 && <StepList steps={data.steps} />}
      <ProofList items={data.proof} />
      <FaqList faqs={data.faqs} />
      <ServiceLinks heading="Services for you" ids={data.services.map(entry => entry.id)} />
    </div>
  </Section>
</Default>
```

- [ ] **Step 6: Build and run the checker**

Run: `npm run build && npm run check --workspace=@bpm/web -- /services/ /who-we-work-with/` Expected: PASS. In the dev server, the header shows the "Who we work with" dropdown with 3 pages and no "All" link; the footer column lists the 3 pages.

- [ ] **Step 7: Commit**

```bash
npm run format
git add apps/web/src/content.config.ts apps/web/src/assets/scripts/helpers.ts apps/web/src/content/audiences apps/web/src/pages/who-we-work-with apps/web/scripts/expected-pages.mjs
git commit -m "FEATURE: add who we work with audience pages"
```

---

### Task 9: Service and audience cards

Copy sources: `docs/content/written/pages/home.md` (card link label note), `pages/services.md` ("Service cards").

**Files:**

- Create: `apps/web/src/components/collection/service/ServiceCard.astro`, `apps/web/src/components/collection/audience/AudienceCards.astro`
- Modify: `apps/web/src/components/collection/service/ServicesGrid.astro`, `apps/web/src/components/sections/ServiceLinks.astro`
- Delete: `apps/web/src/components/collection/service/Service.astro`

**Interfaces:**

- Produces: `ServiceCard { service: CollectionEntry<"services">; label?: string; featured?: boolean }`; `ServicesGrid { ids?: string[]; featureFirst?: boolean }`; `<AudienceCards />`.

- [ ] **Step 1: ServiceCard**

```astro
---
import Heading from "@components/Heading.astro";
import twMerge from "@bpm/custom-merge";
import type { CollectionEntry } from "astro:content";

interface Props {
  service: CollectionEntry<"services">;
  label?: string;
  featured?: boolean;
}

const { service, label = service.data.title, featured = false } = Astro.props;
const href = `/services/${service.id}`;
---

<article class={twMerge("bg-theme-background-highlight flex flex-col gap-3 rounded-xl p-6 sm:py-7 md:p-8", featured && "theme-dark bg-theme-background-lowlight sm:col-span-2 lg:col-span-3")}>
  <Heading as="h3" class={featured ? "text-h4 sm:text-h3" : "text-h5 sm:text-h4"}>
    <a href={href} class="text-theme-foreground-bold hover:text-theme-action">{label}</a>
  </Heading>
  <p class="text-sm">{service.data.description}</p>
</article>
```

The card title is the link. There is no "Find out more" label (copy rule).

- [ ] **Step 2: ServicesGrid**

```astro
---
import ServiceCard from "@components/collection/service/ServiceCard.astro";
import { getServices } from "@helpers";

interface Props {
  ids?: string[];
  featureFirst?: boolean;
}

const { ids, featureFirst = false } = Astro.props;
const services = (await getServices()).filter(service => !ids || ids.includes(service.id));
---

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
  {services.map((service, index) => (featureFirst && index === 0 ? <ServiceCard service={service} label="Full block and estate management" featured /> : <ServiceCard service={service} />))}
</div>
```

`ServiceLinks.astro`: replace the plain list with `<ServicesGrid ids={ids} />` (keep the heading).

- [ ] **Step 3: AudienceCards**

```astro
---
import Heading from "@components/Heading.astro";
import { getAudiences } from "@helpers";

const audiences = await getAudiences();
---

<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
  {
    audiences.map(audience => (
      <article class="bg-theme-background-highlight flex flex-col gap-3 rounded-xl p-6 sm:py-7 md:p-8">
        <Heading as="h3" class="text-h5 sm:text-h4">
          <a href={`/who-we-work-with/${audience.id}`} class="text-theme-foreground-bold hover:text-theme-action">
            {audience.data.title}
          </a>
        </Heading>
        <p class="text-sm">{audience.data.card}</p>
      </article>
    ))
  }
</div>
```

- [ ] **Step 4: Delete the old card**

Delete `Service.astro`. Run `rg -n "collection/service/Service.astro" apps/web/src` and expect no matches.

- [ ] **Step 5: Build and run the checker**

Run: `npm run build && npm run check --workspace=@bpm/web -- /services/ /who-we-work-with/` Expected: PASS. "Related services" shows cards with title and description.

- [ ] **Step 6: Commit**

```bash
npm run format
git add apps/web/src/components/collection/service/ServiceCard.astro apps/web/src/components/collection/service/ServicesGrid.astro apps/web/src/components/collection/service/Service.astro apps/web/src/components/collection/audience/AudienceCards.astro apps/web/src/components/sections/ServiceLinks.astro
git commit -m "FEATURE: add service and audience cards"
```

---

### Task 10: Home page

Copy source: `docs/content/written/pages/home.md`.

**Files:**

- Modify: `apps/web/src/pages/index.astro`, `apps/web/src/components/pages/home/Hero.astro`, `apps/web/src/components/pages/home/Intro.astro`, `apps/web/scripts/expected-pages.mjs`
- Create: `apps/web/src/components/pages/home/ResidentSupport.astro`
- Delete: `apps/web/src/components/pages/home/WhyChooseUs.astro`

**Interfaces:**

- Consumes: `calls`, `site`, `TrustStrip`, `AudienceCards`, `ServicesGrid`, `Default` props.

- [ ] **Step 1: Add the expected page**

```js
"/": { title: "Block management Winchester | Belgarum Property Management", h1: "One property manager who knows your building" }
```

- [ ] **Step 2: Run the checker to verify it fails**

Run: `npm run build && npm run check --workspace=@bpm/web -- /` Expected: FAIL on the `/` title and H1.

- [ ] **Step 3: Hero**

In `Hero.astro`, keep the background, logo mark and layout. Replace the text and buttons:

```astro
<div class="max-w-8c flex flex-col gap-4">
  <p class="subheading text-theme-action">{site.strapline}</p>
  <Heading as="h1" class="text-h2 sm:text-h1">One property manager who knows your building</Heading>
  <p class="text-theme-foreground max-w-2xl text-lg sm:text-xl md:text-2xl">{description}</p>
</div>
<div class="flex flex-row flex-wrap gap-3 sm:gap-5">
  <Button label={calls.proposal.label} href={calls.proposal.href} class="grow text-base sm:grow-0">
    <ArrowRight slot="suffix" />
  </Button>
  <Button label={calls.pay.label} href={calls.pay.href} variant="outline" palette="bold" class="grow text-base sm:grow-0">
    <CreditCard slot="suffix" />
  </Button>
</div>
<TrustStrip variant="compact" />
```

`Hero.astro` takes a `description: string` prop. Import `CreditCard` from `@lucide/astro/icons/credit-card`; remove the unused `Mail` import.

- [ ] **Step 4: Intro and resident support**

`Intro.astro` (replace the whole file):

```astro
---
import Heading from "@components/Heading.astro";
---

<div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-20 xl:gap-28">
  <Heading as="h2" class="text-h3 sm:text-h2 lg:max-w-1/3 lg:min-w-85">Block management from Winchester</Heading>
  <div class="flex flex-1 flex-col gap-5">
    <p class="sm:text-lg">Belgarum Property Management looks after blocks of flats and shared estates across Hampshire, Sussex, Dorset, London and the Home Counties. Our office is in Winchester, close to the M3.</p>
    <p>Your property manager inspects the building regularly and is your main contact. Service charge money for each block or estate is held in its own designated trust account. Block and estate management is all we do.</p>
  </div>
</div>
```

`ResidentSupport.astro`:

```astro
---
import { calls } from "@assets/scripts/calls-to-action";
import { site } from "@assets/scripts/site";
import Heading from "@components/Heading.astro";

const links = [calls.pay, calls.residents, { label: "Order a leasehold sale pack", href: "/services/leasehold-sale-packs" }, { label: "Read our complaints procedure", href: "/complaints-procedure" }];
---

<div class="bg-theme-background-highlight flex flex-col gap-6 rounded-xl p-8 sm:p-10 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
  <div class="flex flex-col gap-3 lg:max-w-1/2">
    <Heading as="h2" class="text-h4 sm:text-h3">Live in a building we manage?</Heading>
    <p>Pay your service charge, contact your property manager or find what you need to sell your flat.</p>
    <p class="text-sm">
      <a class="link" href={site.phoneHref}>Call {site.phone}</a>. {site.hours}.
    </p>
  </div>
  <ul class="flex flex-col gap-3">
    {
      links.map(link => (
        <li>
          <a class="link label" href={link.href}>
            {link.label}
          </a>
        </li>
      ))
    }
  </ul>
</div>
```

- [ ] **Step 5: Page**

`index.astro`:

```astro
---
import AudienceCards from "@components/collection/audience/AudienceCards.astro";
import ServicesGrid from "@components/collection/service/ServicesGrid.astro";
import Banner from "@components/global/Banner.astro";
import Heading from "@components/Heading.astro";
import Hero from "@components/pages/home/Hero.astro";
import Intro from "@components/pages/home/Intro.astro";
import ResidentSupport from "@components/pages/home/ResidentSupport.astro";
import Section from "@components/Section.astro";
import Default from "@layouts/Default.astro";

const title = "Block management Winchester | Belgarum Property Management";
const description = "Block and estate management for RMCs, RTM companies, freeholders and developers across Hampshire and the south, from our office in Winchester.";
---

<Default title={title} description={description} trustStrip ctaHeading="Looking for a managing agent?" ctaText="Tell us about your block or estate, and we'll send you a management proposal.">
  <Fragment slot="header">
    <header id="p_header-group" class="bg-theme-background theme-dark">
      <Banner />
      <Hero description={description} />
    </header>
  </Fragment>
  <Section>
    <div class="flex flex-col gap-16 sm:gap-20 md:gap-24 lg:gap-28">
      <div class="container">
        <AudienceCards />
      </div>
      <div class="container">
        <Intro />
      </div>
      <div class="container">
        <ResidentSupport />
      </div>
      <div class="container">
        <div class="flex flex-col gap-10 sm:gap-14">
          <Heading as="h2" class="text-h3 sm:text-h2">Block and estate management services</Heading>
          <ServicesGrid />
        </div>
      </div>
    </div>
  </Section>
</Default>
```

- [ ] **Step 6: Delete old components**

Delete `WhyChooseUs.astro`. `ServicesIntro.astro` is still used by `services.astro`; Task 11 deletes it.

- [ ] **Step 7: Build and run the checker**

Run: `npm run build && npm run check --workspace=@bpm/web -- / /services/ /who-we-work-with/` Expected: PASS. In the browser, the tab title is "Block management Winchester | Belgarum Property Management" and the eyebrow reads "Block and estate management since 1989".

- [ ] **Step 8: Commit**

```bash
npm run format
git add apps/web/src/pages/index.astro apps/web/src/components/pages/home apps/web/scripts/expected-pages.mjs
git commit -m "UPDATE: home page to approved copy"
```

---

### Task 11: Services overview page

Copy source: `docs/content/written/pages/services.md`.

**Files:**

- Modify: `apps/web/src/pages/services.astro`, `apps/web/scripts/expected-pages.mjs`
- Delete: `apps/web/src/components/collection/service/ServicesIntro.astro`

- [ ] **Step 1: Add the expected page and verify it fails**

```js
"/services/": { title: "Block management services - Belgarum Property Management", h1: "Block management services" }
```

Run: `npm run build && npm run check --workspace=@bpm/web -- /services/` Expected: FAIL on `/services/` title and H1.

- [ ] **Step 2: Page**

```astro
---
import { calls } from "@assets/scripts/calls-to-action";
import AudienceCards from "@components/collection/audience/AudienceCards.astro";
import ServicesGrid from "@components/collection/service/ServicesGrid.astro";
import Heading from "@components/Heading.astro";
import PageHero from "@components/sections/PageHero.astro";
import IntroBlock from "@components/sections/IntroBlock.astro";
import Section from "@components/Section.astro";
import Default from "@layouts/Default.astro";

const title = "Block management services";
const description = "Our services for blocks and estates: budgets, accounts, repairs, major works, Section 20, fire safety, company secretary and leasehold sale packs.";
---

<Default title={title} description={description} trustStrip>
  <Section>
    <div class="flex flex-col gap-14 sm:gap-16 md:gap-18 lg:gap-20 xl:gap-24">
      <PageHero eyebrow="Our services" heading="Block management services" lead={description} call="proposal" />
      <IntroBlock heading="The services a block or estate needs, from one managing agent" paragraphs={["Belgarum Property Management looks after blocks of flats and shared estates for the people responsible for them. That can be a resident management company (RMC), a right to manage (RTM) company, a freeholder, a private landlord or a developer.", "Our full block and estate management service brings together the money, the repairs, the safety checks and the company paperwork. You get one dedicated property manager as your contact. Each page below explains one part of that work: what is included, how it works and the questions people ask."]} />
      <div class="container"><ServicesGrid featureFirst /></div>
      <div class="container">
        <div class="flex flex-col gap-8">
          <Heading as="h2" class="text-h4 sm:text-h3">Find the services for you</Heading>
          <AudienceCards />
        </div>
      </div>
      <div class="container">
        <div class="bg-theme-background-highlight flex flex-col gap-3 rounded-xl p-8 sm:p-10">
          <Heading as="h2" class="text-h4">Live in a building we manage?</Heading>
          <p>To pay your service charge or ask about your building, use the links below.</p>
          <ul class="flex flex-wrap gap-x-8 gap-y-2">
            <li><a class="link label" href={calls.pay.href}>{calls.pay.label}</a></li>
            <li><a class="link label" href={calls.residents.href}>{calls.residents.label}</a></li>
          </ul>
        </div>
      </div>
    </div>
  </Section>
</Default>
```

Delete `ServicesIntro.astro`. Run `rg -n "ServicesIntro" apps/web/src` and expect no matches.

- [ ] **Step 3: Build and run the checker**

Run: `npm run build && npm run check --workspace=@bpm/web -- /services/` Expected: PASS. The first card reads "Full block and estate management" and spans the row.

- [ ] **Step 4: Commit**

```bash
npm run format
git add apps/web/src/pages/services.astro apps/web/src/components/collection/service/ServicesIntro.astro apps/web/scripts/expected-pages.mjs
git commit -m "UPDATE: services overview page to approved copy"
```

---

### Task 12: About page and team data

Copy source: `docs/content/written/pages/about.md`.

**Files:**

- Modify: `packages/data/content/personnel.ts`, `apps/web/src/components/collection/personnel/Personnel.astro`, `PersonnelGrid.astro`, `apps/web/src/pages/about.astro`, `apps/web/src/components/pages/about/Intro.astro`, `Timeline.astro`, `apps/web/scripts/expected-pages.mjs`
- Create: `apps/web/src/components/pages/about/HowWeWork.astro`, `Memberships.astro`

**Interfaces:**

- Produces: `Person = { status?: "draft" | "published"; headshot?: ImageMetadata; name: string; role: string; since: number; group: "directors" | "property-managers" | "accounts" | "administration" }`.

- [ ] **Step 1: Add the expected page and verify it fails**

```js
"/about/": { title: "About our Winchester team - Belgarum Property Management", h1: "About Belgarum Property Management" }
```

Run: `npm run build && npm run check --workspace=@bpm/web -- /about/` Expected: FAIL.

- [ ] **Step 2: Team data**

`personnel.ts`: replace `data` with the 13 people from the "Members" table in `about.md`, with `group` from its build note, and replace `contact` in the schema with `since` and `group`:

```ts
const data = [
  { name: "Alan Gregory", role: "Company Director", since: 2011, group: "directors" },
  { name: "Olivia Gregory", role: "Operations Director", since: 2015, group: "directors" },
  { name: "Ryan Ashurst", role: "Senior Property and Team Management Leader", since: 2015, group: "property-managers" },
  { name: "Rob Barker", role: "Property Manager", since: 2011, group: "property-managers" },
  { name: "Jane Webber", role: "Property Manager", since: 2024, group: "property-managers" },
  { name: "Anna Gibbons", role: "Support Property Manager", since: 2024, group: "property-managers" },
  { name: "Joanne Savage", role: "Support Property Manager", since: 2020, group: "property-managers" },
  { name: "Chloe Dixon", role: "Support Property Manager", since: 2025, group: "property-managers" },
  { name: "Peter Colman", role: "Block Accounts and Bookkeeping", since: 2014, group: "accounts" },
  { name: "Nicola Culhane", role: "Company Bookkeeper Consultant", since: 2009, group: "accounts" },
  { name: "Andrea Scott", role: "Senior Administrator", since: 2014, group: "administration" },
  { name: "Chantelle Adams", role: "Administrator", since: 2020, group: "administration" },
  { name: "Marium Pirzada", role: "Administrator", since: 2024, group: "administration" }
] satisfies Person[];

const schema = ({ image }: SchemaContext) =>
  z.object({
    status: z.enum(["draft", "published"]).default("published").optional(),
    headshot: z.optional(image()),
    name: z.string(),
    role: z.string(),
    since: z.number().int(),
    group: z.enum(["directors", "property-managers", "accounts", "administration"])
  });
```

- [ ] **Step 3: Team components**

`Personnel.astro`: remove the placeholder biography paragraph; under the role, add `<p class="text-theme-foreground-light">With us since {since}</p>`.

`PersonnelGrid.astro`: render four groups in the order of decision 7, each with an `h3` heading ("Directors", "Property managers", "Accounts", "Administration") and its people in data order:

```astro
---
import Personnel from "@components/collection/personnel/Personnel.astro";
import Heading from "@components/Heading.astro";
import { getPersonnel } from "@helpers";

const personnel = await getPersonnel();
const groups = [
  { key: "directors", heading: "Directors" },
  { key: "property-managers", heading: "Property managers" },
  { key: "accounts", heading: "Accounts" },
  { key: "administration", heading: "Administration" }
] as const;
---

<div class="flex flex-col gap-16">
  {
    groups.map(group => (
      <div class="flex flex-col gap-8">
        <Heading as="h3" class="text-h5 sm:text-h4" set:text={group.heading} />
        <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-4">
          {personnel
            .filter(person => person.data.group === group.key)
            .map(person => (
              <Personnel data={person} />
            ))}
        </div>
      </div>
    ))
  }
</div>
```

`Personnel.astro` uses `as="h3"` for names; change it to `as="h4"` so the heading order stays correct.

- [ ] **Step 4: About sections**

`Intro.astro`: eyebrow "About us"; H1 "About Belgarum Property Management"; lead "A family firm established in 1989. Block and estate management is all we do."; H2 "Block and estate management from Winchester" with the three "Intro" paragraphs from `about.md`. Remove all current text.

`Timeline.astro`: no heading (the copy gives none). Render the 3 rows of the "Milestones" table in `about.md` ("1989", "2011", "Today") as `title` and `text`, in the current timeline style.

`HowWeWork.astro`: H2 "How we work"; the 5 items from the "How we work" table as `h3` title plus text.

`Memberships.astro`: H2 "Who we answer to"; the 3 items, each with a bold lead-in (the text inside `**…**`) followed by the rest; the TPO item ends with the link "Read our complaints procedure" to `/complaints-procedure` (render the item text with `InlineText`).

`about.astro`:

```astro
---
import PersonnelGrid from "@components/collection/personnel/PersonnelGrid.astro";
import Heading from "@components/Heading.astro";
import HowWeWork from "@components/pages/about/HowWeWork.astro";
import Intro from "@components/pages/about/Intro.astro";
import Memberships from "@components/pages/about/Memberships.astro";
import Timeline from "@components/pages/about/Timeline.astro";
import Section from "@components/Section.astro";
import Default from "@layouts/Default.astro";

const title = "About our Winchester team";
const description = "A Winchester family firm managing blocks and estates since 1989. Meet the team, several of whom have been with us since 2011 or earlier.";
---

<Default title={title} description={description}>
  <Section>
    <div class="flex flex-col gap-16 sm:gap-20 md:gap-24 lg:gap-28">
      <div class="container"><Intro /></div>
      <div class="container"><Timeline /></div>
      <div class="container"><HowWeWork /></div>
      <div class="container" id="team">
        <div class="flex flex-col gap-12 md:gap-16 lg:gap-20">
          <div class="flex flex-col gap-2.5 text-center">
            <Heading as="h2" class="text-h3 lg:text-h2">Meet the team</Heading>
            <p class="text-xl">The people who manage your building, keep its accounts and answer your calls.</p>
          </div>
          <PersonnelGrid />
        </div>
      </div>
      <div class="container"><Memberships /></div>
    </div>
  </Section>
</Default>
```

No trust strip on this page (copy). CTA band: proposal (the default).

- [ ] **Step 5: Build and run the checker**

Run: `npm run build && npm run check --workspace=@bpm/web -- /about/` Expected: PASS.

- [ ] **Step 6: Commit**

```bash
npm run format
git add packages/data/content/personnel.ts apps/web/src/components/collection/personnel apps/web/src/components/pages/about apps/web/src/pages/about.astro apps/web/scripts/expected-pages.mjs
git commit -m "UPDATE: about page and team to approved copy"
```

---

### Task 13: FAQs page and question data

Copy source: `docs/content/written/pages/faqs.md`.

**Files:**

- Modify: `packages/data/content/questions.ts`, `apps/web/src/content.config.ts` (questions loader), `apps/web/src/assets/scripts/helpers.ts`, `apps/web/src/pages/faqs.astro`, `docs/content/facts.md`, `apps/web/scripts/expected-pages.mjs`

**Interfaces:**

- Produces: question entry `data`: `{ title: string; group: string; answer: string[]; order: number }`; `getQuestions()` sorted by `order`; `getQuestionsByGroup()` returns `[group, entries][]` in first-appearance order.

- [ ] **Step 1: Add the expected page and verify it fails**

```js
"/faqs/": { title: "Leaseholder and RMC FAQs - Belgarum Property Management", h1: "Frequently asked questions" }
```

Run: `npm run build && npm run check --workspace=@bpm/web -- /faqs/` Expected: FAIL.

- [ ] **Step 2: Question data**

Replace `data` in `questions.ts` with every question in `faqs.md`, in file order. `title` is the question, `group` is the group name after "Group: ", `answer` is one string per paragraph. Strip `[NEEDS: …]` tags. "How much does a leasehold sale pack cost, and how long does it take?" keeps only "The seller usually pays the fee. Depending on the lease, it may count as an administration charge." Add `order: z.number().default(0)` to the question schema.

In `content.config.ts`, set the order in the questions loader:

```ts
loader: async () => questionsContent.data.map((question, index) => ({ id: question.title.toLowerCase().replace(/\s+/g, "-"), order: index, ...question })),
```

In `helpers.ts`:

```ts
export const getQuestions = async () => (await getCollection("questions")).sort((a, b) => a.data.order - b.data.order);

export const getQuestionsByGroup = async () => {
  const groups = new Map<string, Awaited<ReturnType<typeof getQuestions>>>();
  for (const question of await getQuestions()) groups.set(question.data.group, [...(groups.get(question.data.group) ?? []), question]);
  return [...groups.entries()];
};
```

Run: `rg -n "NEEDS" packages/data/content/questions.ts` and expect no matches.

- [ ] **Step 3: Page**

In `faqs.astro`: `title = "Leaseholder and RMC FAQs"`; `description` = the copy's meta description; H1 text "Frequently asked questions" (set it directly, not from `title`); add the lead paragraph under the H1 (same text as the description); build the schema with `faqPageSchema(questions.map(q => ({ question: q.data.title, answer: q.data.answer })))`; set `cta="residents"` on `Default`.

- [ ] **Step 4: Update the fact source**

In `docs/content/facts.md`, the `FAQ` source row points at `packages/data/content/questions.ts`, which no longer holds the client text. Change its Source cell to: "Client-supplied FAQ text, formerly in `packages/data/content/questions.ts` (git history before this commit)".

- [ ] **Step 5: Build and run the checker**

Run: `npm run build && npm run check --workspace=@bpm/web -- /faqs/` Expected: PASS. Groups appear in copy order, starting with "Paying your service charge". Links in answers work.

- [ ] **Step 6: Commit**

```bash
npm run format
git add packages/data/content/questions.ts apps/web/src/content.config.ts apps/web/src/assets/scripts/helpers.ts apps/web/src/pages/faqs.astro docs/content/facts.md apps/web/scripts/expected-pages.mjs
git commit -m "UPDATE: FAQs page and questions to approved copy"
```

---

### Task 14: Contact page, form and enquiry confirmation

Copy sources: `docs/content/written/pages/contact.md`, `utility/contact-thanks.md`, `utility/contact-submitting.md`.

**Files:**

- Create: `apps/web/src/assets/scripts/contact-form.ts`, `apps/web/src/assets/scripts/validation-messages.ts`
- Modify: `apps/web/src/components/pages/contact/ContactForm.astro`, `apps/web/src/pages/contact.astro`, `apps/web/src/pages/contact/thanks.astro`, `apps/web/src/pages/contact/submitting.astro`, `apps/web/src/layouts/Base.astro` (script block), `apps/web/scripts/expected-pages.mjs`

**Interfaces:**

- Consumes: `enquiryTypes`, `presetEnquiryType`, `needsPropertyAddress` (Task 2); `site`.
- Produces: Alpine data `contactForm` with `enquiryType: string` and getter `needsAddress: boolean`; `installValidationMessages(root: Document): void` (shows an element's `data-error` text when it is invalid).

- [ ] **Step 1: Add the expected pages and verify they fail**

```js
"/contact/": { title: "Contact our Winchester office - Belgarum Property Management", h1: "Contact us" },
"/contact/thanks/": { title: "Thank you for your enquiry - Belgarum Property Management", h1: "Thank you for your enquiry" },
"/contact/submitting/": { title: "Sending your enquiry - Belgarum Property Management", h1: "Sending your enquiry" }
```

Run: `npm run build && npm run check --workspace=@bpm/web -- /contact` Expected: FAIL.

- [ ] **Step 2: Scripts**

`contact-form.ts`:

```ts
import { needsPropertyAddress, presetEnquiryType } from "./enquiry-types";

export default () => ({
  enquiryType: "",

  init() {
    this.enquiryType = presetEnquiryType(window.location.search);
  },

  get needsAddress() {
    return needsPropertyAddress(this.enquiryType);
  }
});
```

`validation-messages.ts`:

```ts
type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const clear = (event: Event) => {
  const field = event.target as Field;
  if (field.dataset?.error) field.setCustomValidity("");
};

export const installValidationMessages = (root: Document) => {
  root.addEventListener(
    "invalid",
    event => {
      const field = event.target as Field;
      if (field.dataset.error) field.setCustomValidity(field.dataset.error);
    },
    true
  );
  root.addEventListener("input", clear, true);
  root.addEventListener("change", clear, true);
};
```

In `Base.astro`'s script block, add:

```ts
import contactForm from "@assets/scripts/contact-form";
import { installValidationMessages } from "@assets/scripts/validation-messages";

Alpine.data("contactForm", contactForm);
installValidationMessages(document);
```

(before `Alpine.start()`; keep the import list sorted).

- [ ] **Step 3: Contact form**

Rewrite `ContactForm.astro` to the field tables in `contact.md`. Requirements:

- Hidden Netlify form lists exactly these names: `form-name`, `bot-field`, `name`, `email_address`, `phone_number`, `enquiry_type`, `property_address`, `client_type`, `unit_count`, `current_agent`, `agreement_end`, `development_location`, `home_count`, `development_stage`, `repair_location`, `repair_urgency`, `seller_role`, `solicitor_details`, `enquiry_text`.
- Visible form: `x-data="contactForm()"`, `action="/contact/submitting"`, `method="POST"`, `netlify`, honeypot as now.
- Heading above the form (in `contact.astro`, Step 4): "Send us an enquiry".
- Main fields, labels and hints exactly as in `contact.md`, each with its `data-error` from the "Error messages" table:

| Name               | Label             | Control                                                                   | Hint / placeholder                                                                                                                                      | Required | `data-error`                                           |
| ------------------ | ----------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------ |
| `name`             | Your name         | Input                                                                     |                                                                                                                                                         | yes      | Enter your name                                        |
| `email_address`    | Email address     | Input `type="email"`                                                      |                                                                                                                                                         | yes      | Enter your email address, for example name@example.com |
| `phone_number`     | Phone number      | Input `type="tel"`                                                        | "optional" beside the label, as now                                                                                                                     | no       |                                                        |
| `enquiry_type`     | What is it about? | Select, first option `{ value: "", label: "Select" }` then `enquiryTypes` |                                                                                                                                                         | yes      | Select what your enquiry is about                      |
| `property_address` | Property address  | Input, shown with `x-if="needsAddress"`                                   | placeholder "The building or flat address"                                                                                                              | yes      | Enter the building or flat address                     |
| `enquiry_text`     | Your message      | Textarea, `rows="4"`, no `minlength`, no counter (decision 1)             | placeholder "Tell us how we can help"; for `new-management` "Tell us about the building and what you need from a managing agent" (`x-bind:placeholder`) | yes      | Enter your message                                     |

- Extra fields, each block in `<template x-if="enquiryType === '…'">`, labels and options exactly as `contact.md`. All are required except those marked "optional" in the copy:
  - `new-management`: `client_type` "You are" (Select: An RMC director; An RTM director; A freeholder; A private landlord; Other), `unit_count` "Number of flats or homes" (Input `type="number"` `min="1"`, placeholder "For example, 24"), `current_agent` "Current managing agent" (optional), `agreement_end` "When does your current management agreement end?" (optional).
  - `new-development`: `development_location` "Development location" (placeholder "Town or postcode"), `home_count` "Number of homes" (`type="number"`, placeholder "For example, 40"), `development_stage` "Stage" (Select: Planning; Under construction; Selling).
  - `repairs`: `repair_location` "Where is it?" (Select: Communal area; Roof or outside of the building; Inside my flat; Grounds or car park; Not sure), `repair_urgency` "How urgent is it?" (Select: Urgent: it is causing damage or a safety risk; Not urgent), with the hint paragraph above the urgency field: "This form isn't for emergencies. If there is a risk to life, call 999."
  - `leasehold-sale-pack`: `seller_role` "You are" (Select: The seller; The seller's solicitor; The buyer's solicitor), `solicitor_details` "Solicitor details" (optional, placeholder "Name and firm"), hint "Solicitors can also email solicitorenquiries@bpmanagement.org." with the address as a `mailto:` link.
  - `complaint`: hint paragraph "Tell us what happened, when, and what you would like us to do. Read our complaints procedure." with "complaints procedure" linking to `/complaints-procedure`.
  - Select values are the option labels in kebab case (for example `rmc-director`, `under-construction`).
- Privacy line above the button: "We use your details to reply to your enquiry. Read our privacy policy." with "privacy policy" linking to `/privacy-policy`.
- Submit button label: "Send your enquiry".

- [ ] **Step 4: Contact page**

`contact.astro`: keep its footer slot. `title="Contact our Winchester office"`, `description` = the copy's meta description. Content in this order, copy from `contact.md`:

1. H1 "Contact us" and the lead.
2. Contact details `dl`: Phone, Email, Solicitor enquiries, Office, Office hours (links as in the table). Then "We record calls for training."
3. H2 "If you live in a building we manage" and its two paragraphs ("pay online" links to `/pay-online`).
4. H2 "If you're looking for a managing agent" and its paragraph.
5. Emergency note paragraph (no heading). Leave out the `[NEEDS]` line.
6. H2 "Send us an enquiry", then `<ContactForm />`.

- [ ] **Step 5: Thanks and submitting pages**

`thanks.astro`: title and H1 "Thank you for your enquiry"; description = the copy's meta description; the paragraphs from `contact-thanks.md`, word for word (the office hours sentence uses the copy's wording, not `site.hours`); "call us on 0800 298 0069" as a `tel:` link; the three links "Head back home" (`/`, with an `ArrowLeft` prefix icon), "Read our FAQs" (`/faqs`), "About us" (`/about`). Keep `allowIndexing={false}` and the footer slot.

`submitting.astro`: title and H1 "Sending your enquiry"; description and paragraph "This will only take a moment."; keep the redirect script and `allowIndexing={false}`.

- [ ] **Step 6: Build, check and test in the browser**

Run: `npm run build && npm run check --workspace=@bpm/web -- /contact` Expected: PASS.

In `npm run dev`:

1. Load `/contact?type=new-management`. "What is it about?" shows "New management for a building", and the 4 extra fields show.
2. Load `/about`, then click "Request a management proposal" in the header (client-side navigation). The enquiry type is preset in the same way. If it is not, report it before changing anything (Review Focus 1).
3. Load `/contact?type=site-visit`. The select shows "Select". No error.
4. Submit the empty form. The name field shows "Enter your name". Type a name; the message clears.
5. Choose "A new development". "Property address" disappears.

- [ ] **Step 7: Commit**

```bash
npm run format
git add apps/web/src/assets/scripts/contact-form.ts apps/web/src/assets/scripts/validation-messages.ts apps/web/src/components/pages/contact/ContactForm.astro apps/web/src/pages/contact.astro apps/web/src/pages/contact/thanks.astro apps/web/src/pages/contact/submitting.astro apps/web/src/layouts/Base.astro apps/web/scripts/expected-pages.mjs
git commit -m "UPDATE: contact page and enquiry form to approved copy"
```

---

### Task 15: Pay online, payment results and 404

Copy sources: `docs/content/written/pages/pay-online.md`, `utility/payment-success.md`, `utility/payment-failed.md`, `utility/404.md`.

**Files:**

- Modify: `apps/web/src/pages/pay-online.astro`, `apps/web/src/components/pages/pay-online/PaymentForm.astro`, `apps/web/src/assets/scripts/payment-form.ts`, `apps/web/src/pages/pay-online/success.astro`, `apps/web/src/pages/pay-online/failed.astro`, `apps/web/src/pages/404.astro`, `apps/web/scripts/expected-pages.mjs`

- [ ] **Step 1: Add the expected pages and verify they fail**

```js
"/pay-online/": { title: "Pay your service charge - Belgarum Property Management", h1: "Pay your service charge" },
"/pay-online/success/": { title: "Payment complete - Belgarum Property Management", h1: "Payment complete" },
"/pay-online/failed/": { title: "Payment not completed - Belgarum Property Management", h1: "Payment not completed" },
"/404": { title: "Page not found - Belgarum Property Management", h1: "Page not found" }
```

Run: `npm run build && npm run check --workspace=@bpm/web -- /pay-online /404` Expected: FAIL.

- [ ] **Step 2: Payment form**

`payment-form.ts`: add `email: "",` to the returned object (the template already binds `x-model="email"`).

`PaymentForm.astro`: amount label "Amount to pay (£)" with `data-error="Enter the amount to pay, for example 250.50"`; email label "Email address", hint under the label "For your payment confirmation", remove the placeholder, `data-error="Enter your email address, for example name@example.com"`; button label "Pay your service charge"; under the button, "Payments by Stripe" (move the Stripe logo here from the page header).

- [ ] **Step 3: Pay online page**

`pay-online.astro`: `title="Pay your service charge"`, description from the copy; H1 "Pay your service charge"; the lead; H2 "How to pay" with the 4-step ordered list (leave out the `[NEEDS]` line); `<PaymentForm />`; H2 "Questions about your demand?" and its paragraph with the phone as a `tel:` link and the email as a `mailto:` link. Remove the old "Pay bill Online" heading and paragraph.

- [ ] **Step 4: Result and 404 pages**

Set title, description, H1, text and links exactly as each copy file. Links:

- success: "Go to the home page" (`/`), "Make another payment" (`/pay-online`);
- failed: "Try again" (`/pay-online`), "Contact your property manager" (`/contact`);
- 404: "Go to the home page" (`/`), "See our services" (`/services`), "Pay your service charge" (`/pay-online`), "Contact your property manager" (`/contact`).

Phone numbers in the text are `tel:` links. Keep each page's icon, `allowIndexing={false}`, footer slot and (on success) the redirect script.

- [ ] **Step 5: Build, check and test**

Run: `npm run build && npm run check --workspace=@bpm/web -- /pay-online /404` Expected: PASS. In the browser, submit `/pay-online` with an empty amount: the field shows "Enter the amount to pay, for example 250.50".

- [ ] **Step 6: Commit**

```bash
npm run format
git add apps/web/src/pages/pay-online.astro apps/web/src/components/pages/pay-online/PaymentForm.astro apps/web/src/assets/scripts/payment-form.ts apps/web/src/pages/pay-online/success.astro apps/web/src/pages/pay-online/failed.astro apps/web/src/pages/404.astro apps/web/scripts/expected-pages.mjs
git commit -m "UPDATE: payment and 404 pages to approved copy"
```

---

### Task 16: Legal pages

Copy sources: `docs/content/written/pages/complaints-procedure.md`, `privacy-policy.md`, `cookie-policy.md`.

**Files:**

- Modify: `apps/web/src/pages/complaints-procedure.md`, `privacy-policy.md`, `cookie-policy.md`, `apps/web/scripts/expected-pages.mjs`

- [ ] **Step 1: Add the expected pages and verify they fail**

```js
"/complaints-procedure/": { title: "Complaints procedure - Belgarum Property Management", h1: "Complaints procedure" },
"/privacy-policy/": { title: "Privacy policy - Belgarum Property Management", h1: "Privacy policy" },
"/cookie-policy/": { title: "Cookie policy - Belgarum Property Management", h1: "Cookie policy" }
```

Run: `npm run build && npm run check --workspace=@bpm/web -- /complaints-procedure/ /privacy-policy/ /cookie-policy/` Expected: FAIL.

- [ ] **Step 2: Replace the pages**

For each file, keep `layout: "@layouts/Text.astro"`; set `title` to the copy's `meta_title`, `description` to its `meta_description`, and `updated` to the date you make this change (`YYYY-MM-DD`). Replace the body with the copy below `## Heading` (do not repeat the heading; the layout renders it). Turn copy sections into `##` and `###` headings as in the copy file. Then:

- complaints: strip the `[NEEDS: complaint timescales]` tag.
- privacy: leave out the `[NEEDS: privacy details]` paragraph after the intro and after "Who we are"; leave out the `[NEEDS: cookie list]` line under "Who we share it with"; leave out the whole "How long we keep it" section (only a `[NEEDS]` tag). List it as a launch blocker.
- cookie: leave out both cookie tables (only `[NEEDS]` rows); keep each subsection's sentences. List them as launch blockers.

Run: `rg -n "NEEDS" apps/web/src/pages/*.md` and expect no matches.

- [ ] **Step 3: Build and run the checker**

Run: `npm run build && npm run check --workspace=@bpm/web -- /complaints-procedure/ /privacy-policy/ /cookie-policy/` Expected: PASS. Each page shows "Last updated" with the date written as "6 October 2026" style.

- [ ] **Step 4: Commit**

```bash
npm run format
git add apps/web/src/pages/complaints-procedure.md apps/web/src/pages/privacy-policy.md apps/web/src/pages/cookie-policy.md apps/web/scripts/expected-pages.mjs
git commit -m "UPDATE: complaints, privacy and cookie pages to approved copy"
```

---

### Task 17: Redirects, audits, clean-up, docs and full check

**Files:**

- Modify: `apps/web/astro.config.mjs`, `apps/web/netlify.toml`, `CLAUDE.md`, `docs/content/page-map.md`, `docs/content/written/pages/home.md` (build note), `docs/content/written/global/header.md` (build notes)

- [ ] **Step 1: Redirects**

In `astro.config.mjs`, set `redirects` to the table in `page-map.md` ("Redirects from the live site"):

```js
redirects: {
  "/services/developers": "/who-we-work-with/developers",
  "/services/residential": "/who-we-work-with/rmc-and-rtm-directors",
  "/services/freeholders": "/who-we-work-with/freeholders-and-private-landlords",
  "/our-team": "/about",
  "/about-us": "/about",
  "/about-us/links": "/about",
  "/contact-us": "/contact"
},
```

Run: `npm run build`. If Astro reports a route collision between `/services/developers` (or the other two) and `services/[...slug].astro`, rename the route file to `services/[slug].astro` (the slug never contains `/`) and build again.

- [ ] **Step 2: Lighthouse paths**

In `netlify.toml`, replace `path = "/services/budgeting"` with `path = "/services/block-and-estate-management"`, and add an audit for `/who-we-work-with/rmc-and-rtm-directors`.

- [ ] **Step 3: Dead code**

Run: `rg -n "dummyimage.com/200x200|Veteran property management|Lending a supportive hand|one-stop|Discover how we can help" apps/web packages` Expected: no matches. Fix any that remain.

Run: `rg -ln "Feature.astro|Badge.astro" apps/web/src`. If nothing imports `Feature.astro` or `Badge.astro`, leave them (out of scope) and list them in your report.

- [ ] **Step 4: Documents**

- `docs/content/page-map.md`:
  - "Content fields": add `metaTitle` (string, the `meta_title`, 34 characters max), `hero.note`, `hero.trustLine` and `cta` (one of `proposal`, `development`, `residents`, `sale-pack`, `pay`) to the services table, and `card` (string, the card text on the home and services pages) to the audiences description.
  - Add a line under the services table: section headings are "How it works", "Why BPM", "Common questions" and "Related services" ("Services for you" on audience pages).
  - "Build changes": remove the items this plan has done (service slugs, audience pages, contact form). Keep the heading only if something remains; otherwise remove the section.
  - "Redirects from the live site": keep the table; change the lead sentence so it says the redirects are in `apps/web/astro.config.mjs`, and keep the Netlify domain step (it is manual).
- `docs/content/written/pages/home.md`: remove the build note about `appTitle` (the layout now uses this title).
- `docs/content/written/global/header.md`: remove both build notes (the dropdown has no "All" link; the sale packs page is live).
- `CLAUDE.md`: in "Content Collections System", list `personnel`, `services`, `audiences`, `questions`, `testimonials` and say services and audiences are JSON in `src/content/`; in "Build & Deployment", update the Lighthouse paths; in "Commands", add `npm run test --workspace=@bpm/web` (unit tests) and `npm run check --workspace=@bpm/web` (post-build checks, run after `npm run build`).

After editing, search each document for text the edit made stale (`rg -n "budgeting|site-visits|appTitle|Build changes" docs CLAUDE.md`) and fix it.

- [ ] **Step 5: Full verification**

Run, from the repo root:

```bash
npm run test --workspace=@bpm/web
npm run build
npm run check --workspace=@bpm/web
npm run format
```

Expected: tests PASS; build succeeds; checker prints `OK: N page(s) checked` with no problems; format makes no further changes.

Then, in `npm run dev`, open every page in `docs/content/written/README.md` at 400px and 1280px wide. Check that nothing overflows, every heading matches its copy file, and no "Facts used" or build note text shows.

- [ ] **Step 6: Commit**

```bash
git add apps/web/astro.config.mjs apps/web/netlify.toml CLAUDE.md docs/content/page-map.md docs/content/written/pages/home.md docs/content/written/global/header.md
git commit -m "CHORE: add live site redirects, update audits and docs"
```

---

## Launch blockers (not in this plan)

The plan builds the site, but these must be settled before it goes live:

1. **Cookie consent.** Google Tag Manager loads with no consent check, and the cookie policy describes a banner and a "Cookie settings" link that do not exist. Choose a consent tool, block analytics until consent, add the footer link, and fill in the cookie tables.
2. **Privacy retention periods and ICO number** (`[NEEDS: privacy details]`). The "How long we keep it" section is left out until BPM supplies them.
3. **Client answers** that the pages leave gaps for: sale pack ordering, cost and turnaround (Q5), switching process (Q8), repair reporting (Q6), out-of-hours line (Q1), photos (Q2).
4. **Stripe receipts.** The pay form hint promises a confirmation. Check the Stripe payment link sends receipts.
5. **Netlify domain redirect** from `belgarum-property.co.uk` to `https://www.belgarum-property.co.uk` (dashboard setting).
