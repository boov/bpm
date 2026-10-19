# Link check

**No problems.** No broken internal links, missing assets, broken fragments, sitemap errors or bad redirect targets. The 404 page has no canonical, `og:url` or `twitter:url` tag, because `/404/` is not a real URL.

The check covers the production build in `apps/web/dist` (26 HTML pages, 2,239 references), the sitemaps, and the 7 `[[redirects]]` entries in `apps/web/netlify.toml`.

## Results by check

| Check                                                                                                                         | Result                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Internal references (`a[href]`, `link[href]`, `script[src]`, `img[src]`, `srcset`, `form[action]`, meta URLs, inline `url()`) | All resolve.                                                                                |
| Internal page links without a trailing slash                                                                                  | None.                                                                                       |
| Internal links on `http://`                                                                                                   | None.                                                                                       |
| `#fragment` links                                                                                                             | None in the build, so nothing to check.                                                     |
| `sitemap-0.xml` URLs exist in dist                                                                                            | All 22 exist. `sitemap-index.xml` points at `sitemap-0.xml`, which exists.                  |
| Excluded pages in the sitemap                                                                                                 | None. `/contact/thanks/`, `/contact/submitting/` and `/pay-online/success/` are not listed. |
| Pages missing from the sitemap                                                                                                | None. Every page except `404.html` and the 3 excluded pages is listed.                      |
| `[[redirects]]` targets exist in dist                                                                                         | All 7 exist and end with a slash. No redirect source is also a real page.                   |
| `robots.txt` and `llms.txt` site URLs                                                                                         | All exist in dist.                                                                          |

## External links

These were not fetched. Click each one to confirm it works.

| URL                                                              | Type                 | Pages                    |
| ---------------------------------------------------------------- | -------------------- | ------------------------ |
| `https://www.facebook.com/belgarumpropertymanagementltd`         | Link                 | 23 pages (footer)        |
| `https://www.instagram.com/belgarumpropertymanagementltd`        | Link                 | 23 pages (footer)        |
| `https://www.linkedin.com/company/belgarumpropertymanagementltd` | Link                 | 23 pages (footer)        |
| `https://www.tpos.co.uk`                                         | Link                 | `/complaints-procedure/` |
| `https://ico.org.uk`                                             | Link                 | `/privacy-policy/`       |
| `https://buy.stripe.com/test_bJe00l2zdgIPedCcTU9EI01`            | Form action          | `/pay-online/`           |
| `https://use.typekit.net/glq6gsv.css`                            | Preloaded stylesheet | All 26 pages             |
| `https://use.typekit.net`                                        | Preconnect           | All 26 pages             |
| `https://p.typekit.net`                                          | Preconnect           | All 26 pages             |

The pay online form in this build points at a Stripe **test** link. The live link must come from `STRIPE_PAYMENT_URL` in Netlify (see [checklist.md](checklist.md)). This test link differs from the fallback in `PaymentForm.astro`, so the local build reads `STRIPE_PAYMENT_URL` from a local env file.

## Assumptions

- Only `www.belgarum-property.co.uk` counts as internal. A link to `belgarum-property.co.uk` without `www` would be listed as external. There are none.
- `mailto:`, `tel:` and `data:` URLs are skipped.
- A URL ending in `/` maps to `index.html` in that folder. A URL without a trailing slash must match a file exactly. If it only matches a folder, it counts as a redirect problem.
- The sitemap filter in `apps/web/astro.config.mjs` excludes `/contact/thanks/`, `/contact/submitting/` and `/pay-online/success/`. `404.html` is not a page route, so its absence from the sitemap is expected.
- Redirects are read from `apps/web/netlify.toml` only. There is no `_redirects` file in dist.
