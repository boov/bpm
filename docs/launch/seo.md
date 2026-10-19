# SEO audit

**Result: not ready. Technical SEO is sound, but the share image, the schema logo and the touch icon are placeholders. 2 must-fix items.**

The audit covers the production build in `apps/web/dist` (26 HTML pages: 22 indexable, 4 noindex), `robots.txt`, the sitemaps, `llms.txt` and the redirects in `apps/web/netlify.toml`.

## Must fix before launch

### 1. The social share image and the schema image and logo are blank placeholders

- **Pages:** all 26.
- **What is wrong:** `og:image` and `twitter:image` point to `/images/social_share.png`. The file exists and is 1200 x 630, but it is a flat teal rectangle with no logo or text (485 bytes). The LocalBusiness schema uses the same file as `image`, and its `logo` is `/images/schema_logo.png`, which is also a plain teal rectangle (430 x 230, 209 bytes). Every link shared on social media or in messaging apps shows an empty teal card. Google can use the schema `logo` in search results.
- **Fix:** replace `apps/web/public/images/social_share.png` with a real 1200 x 630 image (logo and strapline on the brand colour is enough). Replace `apps/web/public/images/schema_logo.png` with the real logo: a square or near-square PNG, at least 112 x 112, on a solid background. The paths are set in `apps/web/src/layouts/Base.astro`, so only the files need to change.

### 2. The Apple touch icon shows "MB", not the Belgarum mark

- **Pages:** all 26.
- **What is wrong:** `/images/apple_touch_icon.png` (180 x 180) is a teal square with the letters "MB". It is not the BPM logo. It shows when someone saves the site to a phone home screen, and some browsers use it as the tab or bookmark icon.
- **Fix:** replace `apps/web/public/images/apple_touch_icon.png` with a 180 x 180 PNG of the BPM mark used in `favicon.svg`, on a solid background.

## Fine as is

- **Titles:** present and unique on all 26 pages, 44 to 64 characters, keyword first, brand last. The SVG logo also contains a `<title>`, which search engines ignore. The home page uses "|" as the separator and other pages use "-": not a problem.
- **Meta descriptions:** present and unique on all 26 pages, 51 to 154 characters. None is over 155.
- **Headings:** exactly one `<h1>` per page. No page skips a level (h1 to h2 to h3 to h4). The footer adds the same 4 `<h2>` headings to every page, which is normal.
- **Canonicals:** absolute, `https`, `www`, trailing slash, and equal to the page's own URL on all 25 real pages. The 404 page has no canonical, `og:url` or `twitter:url`. `og:url` matches the canonical everywhere. No `localhost` or `127.0.0.1` anywhere in dist. The only `http://` strings are SVG namespaces.
- **Robots meta:** the 22 indexable pages are `index, follow`. `/404.html`, `/contact/submitting/`, `/contact/thanks/` and `/pay-online/success/` are `noindex, nofollow`.
- **robots.txt:** allows everything and points to `https://www.belgarum-property.co.uk/sitemap-index.xml`.
- **Sitemaps:** `sitemap-index.xml` and `sitemap-0.xml` are valid XML. `sitemap-0.xml` lists exactly the 22 indexable pages, all `https`, `www`, with a trailing slash. The 3 noindex pages are filtered out in `apps/web/astro.config.mjs`, and the 404 page is not a route.
- **Open Graph and Twitter:** `og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `og:site_name`, `twitter:card`, `twitter:title`, `twitter:description` and `twitter:image` are on every page, with `og:locale` `en_GB`, `og:image:width` 1200, `og:image:height` 630 and `og:image:alt`. The replacement share image must stay 1200 by 630. The image URL is absolute and the file exists (its content is the must-fix item above).
- **Structured data:** every `application/ld+json` block parses as JSON. LocalBusiness and WebSite are on every page. LocalBusiness has name, `legalName`, `foundingDate`, `sameAs` (the Facebook, Instagram and LinkedIn profiles from the footer), URL, address, phone, email, area served and opening hours that match `docs/content/facts.md` and the footer. Each service page has Service, BreadcrumbList and FAQPage. Each audience page has BreadcrumbList and FAQPage. `/faqs/` has FAQPage with 12 questions: the 9 questions that a topic page already marks up are left out of its schema, so no question is marked up twice. All 72 marked-up questions and every answer paragraph appear word for word in the visible page text. The breadcrumbs are schema only, with no visible trail, which Google accepts.
- **Images:** every `<img>` has an `alt` attribute and `width` and `height`. All are WebP. Hero images have descriptive alt text, `srcset`, `fetchpriority="high"` and `loading="eager"`. Card images and the home hero background have empty alt, which is right because the card title next to them carries the meaning. Below-the-fold images are lazy-loaded.
- **Document basics:** `lang="en-GB"`, `charset` UTF-8 and a `width=device-width` viewport on every page. `favicon.svg` and `apple_touch_icon.png` exist in dist (the touch icon content is a must-fix item).
- **llms.txt:** at `/llms.txt`. All 18 links are absolute `https` `www` URLs with a trailing slash, and every one is a page in dist and in the sitemap.
- **Internal links:** no broken internal links and no internal links without a trailing slash. Every indexable page is linked from the header or the footer of every page, so there are no orphan pages. Only the 4 noindex pages have no inbound links, which is expected (they are reached by form submission and the Stripe return).
- **Audience pages:** each links to 4 to 6 service pages through `ServiceLinks`.
- **Service pages:** each has a "Related services" section with 3 service cards, from the `related` field in each `apps/web/src/content/services/*.json`. Every service page has at least 3 in-body links.
- **Old-site redirects:** the old WordPress site's REST API lists 9 published pages and 1 post. The 7 `[[redirects]]` in `apps/web/netlify.toml` cover every old page whose path the new site does not serve; `/` and `/services/` exist on the new site. The only post is the default WordPress "hello-world" post, which needs no redirect.
- **Keywords:** each page's title, H1 and URL target the working keyword in `docs/content/page-map.md`. "Block management" leads the titles of the home page, `/services/` and `/services/block-and-estate-management/`, but each adds a different qualifier (Winchester, services, Hampshire), so the overlap is acceptable.

## Assumptions

- The audit reads the build in `apps/web/dist` as it was during this audit. It did not run a build or a server, so it checks the HTML, not live HTTP status codes or response headers.
- Netlify matches a redirect `from` path with or without the trailing slash, so `/our-team` also catches `/our-team/`. The deploy preview test in `docs/launch/checklist.md` confirms this.
- The FAQ match normalises whitespace, HTML entities and curly apostrophes before comparing schema text with page text.
