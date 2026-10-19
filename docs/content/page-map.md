# Page map

Every page on the new site, with its job. Use it as the writing checklist. Audience names are defined in `audiences.md`, and call to action labels in `tone-of-voice.md`. The working keyword is a judgement from the competitor research, not from search volume data. Keywords are search terms. The copy uses the terms in `glossary.md`, even where a keyword differs. Where the glossary allows it, the copy mentions the search term once as another name (for example "leasehold sale pack, sometimes called a management pack").

## Main pages

| Page                    | Purpose                                | Audience                                                          | Working keyword                         | CTA                                   |
| ----------------------- | -------------------------------------- | ----------------------------------------------------------------- | --------------------------------------- | ------------------------------------- |
| `/`                     | Say who BPM is and route each audience | All                                                               | block management Winchester / Hampshire | See how we can help you; Get in touch |
| `/about`                | History, team, memberships             | RMC and RTM directors, Freeholders                                |                                         | Request a management proposal         |
| `/services`             | Overview of all services               | RMC and RTM directors, Freeholders, Developers, Private landlords | block management services               | Request a management proposal         |
| `/faqs`                 | Answer common questions                | Leaseholders, RMC and RTM directors                               |                                         | Contact your property manager         |
| `/contact`              | Contact details and enquiry form       | All                                                               |                                         | Send your enquiry                     |
| `/pay-online`           | Pay a service charge by card           | Leaseholders                                                      |                                         | Pay your service charge               |
| `/complaints-procedure` | How to complain; TPO redress           | Leaseholders, RMC and RTM directors, Freeholders                  |                                         |                                       |
| `/privacy-policy`       | Legal                                  | All                                                               |                                         |                                       |
| `/cookie-policy`        | Legal                                  | All                                                               |                                         |                                       |

## Services

| Page                                    | Purpose                                          | Audience                                              | Working keyword                     | CTA                           |
| --------------------------------------- | ------------------------------------------------ | ----------------------------------------------------- | ----------------------------------- | ----------------------------- |
| `/services/block-and-estate-management` | Hub: full management, including site inspections | RMC and RTM directors, Freeholders, Private landlords | block management; estate management | Request a management proposal |
| `/services/service-charge-budgets`      | How budgets and reserve funds are set            | RMC and RTM directors, Leaseholders                   | service charge budget               | Request a management proposal |
| `/services/service-charge-accounts`     | Collection, arrears, year end accounts           | RMC and RTM directors, Leaseholders                   | service charge accounts             | Request a management proposal |
| `/services/company-secretarial`         | Company secretary role for RMCs and RTMs         | RMC and RTM directors                                 | RMC company secretary               | Request a management proposal |
| `/services/repairs-and-maintenance`     | Day-to-day repairs, contractors                  | All                                                   | block repairs and maintenance       | Contact your property manager |
| `/services/major-works`                 | Planning and running large projects              | RMC and RTM directors, Leaseholders                   | major works managing agent          | Request a management proposal |
| `/services/section-20-consultation`     | The Section 20 process, explained                | Leaseholders, RMC and RTM directors                   | Section 20 consultation             | Contact your property manager |
| `/services/fire-and-building-safety`    | Fire, health and safety, Building Safety Act     | RMC and RTM directors, Freeholders, Developers        | fire safety block of flats          | Request a management proposal |
| `/services/leasehold-sale-packs`        | How to order a pack, cost, turnaround            | Sellers' solicitors, Leaseholders                     | leasehold management pack; LPE1     | Order a leasehold sale pack   |
| `/services/buildings-insurance`         | Insurance and claims                             | RMC and RTM directors, Freeholders                    |                                     | Request a management proposal |

Buildings insurance is on hold until BPM confirms its insurance role (question 3 in `client-questions.md`).

## Who we work with

| Page                                                  | Purpose                                 | Audience                       | Working keyword                            | CTA                                |
| ----------------------------------------------------- | --------------------------------------- | ------------------------------ | ------------------------------------------ | ---------------------------------- |
| `/who-we-work-with/rmc-and-rtm-directors`             | What BPM takes off a volunteer board    | RMC and RTM directors          | managing agent for RMC; RTM managing agent | Request a management proposal      |
| `/who-we-work-with/freeholders-and-private-landlords` | Compliance, reporting, asset protection | Freeholders, Private landlords | freeholder property management             | Request a management proposal      |
| `/who-we-work-with/developers`                        | From planning to handover               | Developers                     | new build development management           | Talk to us about a new development |

## Utility pages

`/404`, `/contact/thanks`, `/contact/submitting`, `/pay-online/success`. Short copy only.

## Redirects from the live site

The redirects are `[[redirects]]` blocks in `apps/web/netlify.toml`. They return 301 on Netlify only; `pnpm dev` does not apply them. The live site uses `belgarum-property.co.uk` without `www`. Redirect that host to `https://www.belgarum-property.co.uk` in Netlify domain settings. This step is manual.

| Live URL                 | New URL                                               |
| ------------------------ | ----------------------------------------------------- |
| `/services/developers/`  | `/who-we-work-with/developers`                        |
| `/services/residential/` | `/who-we-work-with/rmc-and-rtm-directors`             |
| `/services/freeholders/` | `/who-we-work-with/freeholders-and-private-landlords` |
| `/our-team/`             | `/about`                                              |
| `/about-us/`             | `/about`                                              |
| `/about-us/links/`       | `/about`                                              |
| `/contact-us/`           | `/contact`                                            |

`/services/` needs no redirect: the new site serves the same path. Test it on a deploy preview.

## Field limits

- **Meta title:** 65 characters max. The site layout adds " - Belgarum Property Management" (31 characters) to each page title, except on the home page, so a `meta_title` field is 34 characters max. Search engines cut titles by width, not by a character count: if a title is cut, the end of the brand suffix goes first and the keyword at the start stays.
- **Meta description and hero lead (`description`):** 155 characters max.

## Home page template

Sections, in order:

1. **Hero:** an eyebrow line (the strapline in `messaging.md`), an H1 that speaks to the reader, a lead of 155 characters max, two calls to action ("See how we can help you" and "Get in touch") and the compact trust line (see "Trust strip" in `messaging.md`).
2. **Audience routes:** 3 cards, one for each "Who we work with" page. Each card has a title, one sentence (25 words max) and a link.
3. **Intro:** a heading and 60 to 100 words on what BPM does and where, for readers and for search.
4. **Resident support:** links to pay your service charge, contact your property manager, leasehold sale packs and the complaints procedure, with the phone number and office hours.
5. **Services grid:** one card for each live service page: title and the service `description`.
6. **Trust strip:** the shared block below.
7. **Call to action band:** heading, one sentence, "Get in touch".

## Shared blocks

Service and audience pages show one short trust strip above the call to action band. The home page, the block and estate management page and the three audience pages also show the compact trust line under the hero, so the proof sits next to the first claim. The contents of both are under "Trust strip" in `messaging.md`.

## Location pages

Leave these until later. If added, write one real Winchester and Hampshire page with local detail. Do not create template pages for each town.
