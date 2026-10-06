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

| Cookie                 | Set by | Purpose                       | How long |
| ---------------------- | ------ | ----------------------------- | -------- |
| `[NEEDS: cookie list]` |        | Remembers your cookie choices |          |

### Analytics cookies

We use these cookies only if you agree. They tell us how visitors use the website, such as which pages they visit, so we can improve it.

| Cookie                 | Set by | Purpose | How long |
| ---------------------- | ------ | ------- | -------- |
| `[NEEDS: cookie list]` |        |         |          |

## Payments

When you pay online, you go to a payment page run by Stripe. Stripe sets its own cookies on that page, for security and to prevent fraud. Stripe's cookie policy explains them.

## How to control cookies

When you first visit this website, a banner asks whether you accept analytics cookies. You can change your choice at any time using the cookie settings link at the foot of each page.

You can also block or delete cookies in your browser settings. If you block strictly necessary cookies, parts of the website may not work.

## More information

Read our [privacy policy](/privacy-policy) to find out how we use personal information. If you have a question about cookies, email management@bpmanagement.org.

---

**Facts used:**

| Claim on this page | `facts.md` row                                 | Status  |
| ------------------ | ---------------------------------------------- | ------- |
| Stripe payments    | Ways of working: Online card payments (Stripe) | Sourced |
| Email              | Company: Email                                 | Sourced |

Checked in the code: the site's own code sets no cookies. Google Tag Manager (`GTM.astro`) loads when `GOOGLE_TAG_MANAGER_CONTAINER` is set, and any analytics or consent tool runs through it. No container ID is in the repository, and the live site loads no analytics or consent tool. The cookie tables need the tags in the Tag Manager container.

**Gaps:**

- `[NEEDS: cookie list]` The cookies set by the consent tool (for example CookieYes) and by each analytics tag in Google Tag Manager, with how long each lasts.

Build notes (not copy):

- The "How to control cookies" section assumes a consent banner and a "cookie settings" link in the footer. Neither is in the code yet. Add both, or change this section.
- `Base.astro` loads Google Tag Manager on every page with no consent check. Analytics cookies need consent before they are set, under PECR. The consent tool must block analytics tags until the visitor agrees.
