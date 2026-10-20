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

1. Invite the client to the Stripe account and finish its setup (directors, payout details). Until then the payment link stays in test mode.
2. Create the live Stripe Payment Link with its after-payment redirect set to `https://www.belgarum-property.co.uk/pay-online/success/`, then set `STRIPE_PAYMENT_URL` in Netlify to that link (it holds the test link now).
3. Point DNS at Netlify and add the Google Search Console TXT record. This needs access to the domain, which we do not have yet.
4. In Netlify domain settings, redirect `belgarum-property.co.uk` to `https://www.belgarum-property.co.uk`.

## Check on a Netlify deploy

1. Contact form: Netlify detects `contact_form` on a production deploy. Send one test submission and confirm the notification email arrives.
2. Cookie consent: before consent, the page makes no Google Tag Manager requests. After accepting analytics, GTM loads. The footer "Cookie settings" button reopens the banner.
3. Pay online: the button opens the live Stripe link, and a payment returns to `/pay-online/success/`.

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
