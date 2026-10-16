---
url: /cookie-policy
status: draft
audience: All
keyword: (none)
meta_title: "Cookie policy" # 13 characters; 44 with the layout suffix
meta_description: "Which cookies the Belgarum Property Management website uses, what they do, and how to accept or refuse them." # 108 characters
---

## Heading

Cookie policy

## Intro

This policy explains which cookies this website uses and how you can control them.

## What cookies are

Cookies are small files that a website stores on your device. Some are needed for the website to work. Others help us understand how the website is used.

## Cookies we use

### Strictly necessary cookies

These cookies are needed for the website to work, or to remember your cookie choices. They do not need your consent.

| Cookie      | Set by       | Purpose                       | How long |
| ----------- | ------------ | ----------------------------- | -------- |
| `cc_cookie` | This website | Remembers your cookie choices | 6 months |

### Analytics cookies

We use these cookies only if you agree. They tell us how visitors use the website, such as which pages they visit, so we can improve it.

| Cookie           | Set by           | Purpose                                   | How long |
| ---------------- | ---------------- | ----------------------------------------- | -------- |
| `_ga`            | Google Analytics | Tells one visitor apart from another      | 2 years  |
| `_ga_RCT0LF6KVP` | Google Analytics | Keeps track of your visit to this website | 2 years  |

## Payments

When you pay online, you go to a payment page run by Stripe. Stripe sets its own cookies on that page, for security and to prevent fraud. Stripe's cookie policy explains them.

## How to control cookies

When you first visit this website, a banner asks whether you accept analytics cookies. You can change your choice at any time using the "Cookie settings" link at the foot of each page. If you withdraw your consent, we delete the analytics cookies.

You can also block or delete cookies in your browser settings. If you block strictly necessary cookies, parts of the website may not work.

## More information

Read our [privacy policy](/privacy-policy) to find out how we use personal information. If you have a question about cookies, email management@bpmanagement.org.

---

**Facts used:**

| Claim on this page | `facts.md` row                                 | Status  |
| ------------------ | ---------------------------------------------- | ------- |
| Stripe payments    | Ways of working: Online card payments (Stripe) | Sourced |
| Email              | Company: Email                                 | Sourced |

Checked in the code: apart from `cc_cookie`, the site's own code sets no cookies. `GTM.astro` sets Google Consent Mode to "denied" before Google Tag Manager (container `GTM-MTGCBTKZ`) loads. `CookieConsent.astro` runs `vanilla-cookieconsent`, which sets `cc_cookie` (182 days, the library default) and deletes `_ga` cookies when consent is withdrawn. The only tag in the container is the Google tag for GA4 property `G-RCT0LF6KVP`, which needs `analytics_storage` consent and sets `_ga` and `_ga_RCT0LF6KVP` (2 years each).
