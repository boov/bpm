# SEO Action Plan

Generated from the SEO audit run against `http://localhost:4321/` on 2026-05-06. Tasks are grouped by who is best placed to do them. AI-agent tasks are scoped tightly so a coding agent can complete them without business decisions.

## Conventions

- **P0** = block before launch
- **P1** = high impact, low effort, do soon
- **P2** = worthwhile, can wait
- **Post-launch** = run after the site is live

---

## Confirmed Inputs (2026-05-06)

These have been confirmed by the business owner and should be used as the source of truth in code.

| Field                                            | Value                                                           |
| ------------------------------------------------ | --------------------------------------------------------------- |
| Canonical phone (display)                        | `0800 298 0069`                                                 |
| Canonical phone (E.164 / `tel:` href)            | `+448002980069`                                                 |
| Email                                            | `management@bpmanagement.org`                                   |
| Address                                          | Old Manor Nursery, Kilham Lane, Winchester, Hampshire, SO22 5QD |
| Country                                          | GB                                                              |
| Opening hours                                    | Mon to Fri, 09:00 to 18:00                                      |
| `priceRange`                                     | `££`                                                            |
| `areaServed`                                     | Hampshire, Sussex, Dorset, London, Home Counties                |
| `/pay-online/success/` and `/pay-online/failed/` | noindex + remove from sitemap                                   |
| Hero background image                            | purely decorative, keep `alt=""`                                |

---

## Human Tasks

These need real-world data, business decisions, brand voice, or external accounts. An agent should not invent values for them.

### P0

- [ ] **Rewrite the seven service descriptions.** Files: `apps/web/src/content/services/*.json`. Each needs:
  - A unique 150 to 160 character `description` (currently lorem ipsum, identical across all).
  - Two unique body paragraphs in `content.paragraphs` (currently the same boilerplate duplicated on every service).
  - A meaningful `content.heading` (currently identical across all).
- [ ] **Source seven unique service cover images.** Currently every service uses `https://dummyimage.com/1536x658/ede2de/7e6d67`. Provide image files (or licensed image URLs) and descriptive alt text per service.
- [ ] **Write a real meta description for `/contact/` and `/faqs/`.** Currently empty. Around 150 to 160 characters each.
- [ ] **Replace lorem ipsum FAQ content.** File: `packages/data/content/questions.ts`. Real questions and answers will then flow into the visible `/faqs/` page and the FAQPage JSON-LD automatically.
- [ ] **Replace placeholder copy in policy pages.** `apps/web/src/pages/cookie-policy.md` and `privacy-policy.md` use first-person ("I", "my data") and look templated. Rewrite as a company policy.

### P1

- [ ] **Approve which personnel to surface on About.** A `personnel` collection exists but is not displayed. Adding bios with credentials boosts E-E-A-T but needs sign-off from the people involved.
- [ ] **Approve which testimonials to surface.** A `testimonials` collection exists. Pick 2 to 3 with real attribution.
- [ ] **Configure Typekit `font-display`.** Set `font-display: swap` in the Typekit kit dashboard (`use.typekit.net` kit `glq6gsv`). This is account-side, not code-side.
- [ ] **Tone audit on the About page copy.** The current narrative reads with classic AI cadence (parallelism, "It is not X, it is Y"). For a 1989 founding date, replacing some passages with concrete history (founders, named milestones, real client references) helps E-E-A-T and avoids AI-text patterns.

### Post-launch

- [ ] **Verify the site in Google Search Console** and submit the sitemap.
- [ ] **Run PageSpeed Insights** on `/`, `/services/`, `/services/budgeting/`, `/contact/` and confirm LCP is under 2.5s after the hero image fix.
- [ ] **Validate schema with Google Rich Results Test** once placeholder data has been replaced.
- [ ] **Set up Bing Webmaster Tools** and submit the sitemap there.
- [ ] **Monitor Core Web Vitals** report in Search Console for the first month.

---

## AI Agent Tasks

These are deterministic code changes. The remaining items are blocked on human input or are P2 items.

### P0

- [ ] **Replace lorem ipsum service metadata in JSON files** once human supplies copy. Files: `apps/web/src/content/services/*.json`. Update `description`, `content.heading`, `content.paragraphs`, `image` per file. (Blocked on human copy/imagery.)

### P1

- [ ] **Update service cover image alt text** when real images and per-service alt text are supplied. Edit homepage `ServicesGrid` and service detail `[...slug].astro:41`. (Blocked on human imagery decisions.)

### P2

- [ ] **Add `BreadcrumbList` schema and a visual breadcrumb component on service detail pages.** New component plus inline JSON-LD in `apps/web/src/pages/services/[...slug].astro`.
- [ ] **Add `Service` schema on each service detail page.** Generate a `Service` block per page with `provider: { @id: "#localbusiness" }`, `serviceType: service.data.title`, and the confirmed `areaServed`.
- [ ] **Audit `prefetchAll: true`.** In `apps/web/astro.config.mjs:13-15`, consider switching to `prefetch: { defaultStrategy: "viewport" }` if Search Console or analytics later show heavy data usage on mobile. No action needed unless data shows a problem.
- [ ] **Remove `// @ts-nocheck` from `apps/web/astro.config.mjs:1`** and fix any resulting type issues. Not SEO directly, but surfacing config typos prevents future indexation regressions.
