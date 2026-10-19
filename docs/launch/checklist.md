# Launch checklist

Work left before the site goes live at `https://www.belgarum-property.co.uk`. Reports from the automated checks are in this folder.

## Blocks launch: needs the client

| Item                                               | Where                                                                                                                | Status                                                         |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Retention periods for personal data (UK GDPR)      | Privacy policy has no retention section. Client question 14 in [client-questions.md](../content/client-questions.md) | Draft wording for approval: [legal-drafts.md](legal-drafts.md) |
| Complaint acknowledgement and final response times | Complaints procedure says only "as quickly as we can". Client question 7                                             | Draft wording for approval: [legal-drafts.md](legal-drafts.md) |

## Blocks launch: needs artwork

`apps/web/public/images/social_share.png` and `schema_logo.png` are plain teal placeholders, and `apple_touch_icon.png` shows "MB". Details: [seo.md](seo.md).

## Launch day: manual steps in Netlify and DNS

1. Set `STRIPE_PAYMENT_URL` to the live Stripe Payment Link (it holds the test link now).
2. In Stripe, set the Payment Link's after-payment redirect to `https://www.belgarum-property.co.uk/pay-online/success/`.
3. Set `GOOGLE_TAG_MANAGER_CONTAINER` in Netlify.
4. Point DNS at Netlify and add the Google Search Console TXT record.
5. In Netlify domain settings, redirect `belgarum-property.co.uk` to `https://www.belgarum-property.co.uk`.

## Check on a Netlify deploy

1. The build uses pnpm 12.9.1 (from `packageManager`) and passes. The Lighthouse plugin runs and reports.
2. Visual check of every page template after the Astro 7 upgrade. Vite 8 minifies and reorders CSS differently from Vite 7.
3. Contact form: Netlify detects `contact_form` on a production deploy. Send one test submission and confirm the notification email arrives.
4. Cookie consent: before consent, the page makes no Google Tag Manager requests. After accepting analytics, GTM loads. The footer "Cookie settings" button reopens the banner.
5. Pay online: the button opens the live Stripe link, and a payment returns to `/pay-online/success/`.

## After the DNS switch

1. Each `[[redirects]]` entry in `apps/web/netlify.toml` returns 301 to the right page.
2. `https://belgarum-property.co.uk` redirects to `https://www.belgarum-property.co.uk`.
3. Submit `https://www.belgarum-property.co.uk/sitemap-index.xml` in Google Search Console.

## Automated checks

| Check                                                                               | Report                               |
| ----------------------------------------------------------------------------------- | ------------------------------------ |
| Broken internal links and assets in the build                                       | [links.md](links.md)                 |
| SEO audit: titles, descriptions, canonicals, structured data, sitemap, `robots.txt` | [seo.md](seo.md)                     |
| Accessibility: Lighthouse, keyboard use, contrast                                   | [accessibility.md](accessibility.md) |
