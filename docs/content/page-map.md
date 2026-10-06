# Page map

Every page on the new site, with its job. Use it as the writing checklist. Audience names are defined in `audiences.md`, and call to action labels in `tone-of-voice.md`. The working keyword is a judgement from the competitor research, not from search volume data. Keywords are search terms. The copy uses the terms in `glossary.md`, even where a keyword differs. Where the glossary allows it, the copy mentions the search term once as another name (for example "leasehold sale pack, sometimes called a management pack").

Status values: not started, draft, review, approved, on hold.

## Main pages

| Page                    | Purpose                                | Audience                                                          | Working keyword                         | CTA                                                    | Status |
| ----------------------- | -------------------------------------- | ----------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------ | ------ |
| `/`                     | Say who BPM is and route each audience | All                                                               | block management Winchester / Hampshire | Request a management proposal; Pay your service charge | draft  |
| `/about`                | History, team, memberships             | RMC and RTM directors, Freeholders                                |                                         | Request a management proposal                          | draft  |
| `/services`             | Overview of all services               | RMC and RTM directors, Freeholders, Developers, Private landlords | block management services               | Request a management proposal                          | draft  |
| `/faqs`                 | Answer common questions                | Leaseholders, RMC and RTM directors                               |                                         | Contact your property manager                          | draft  |
| `/contact`              | Contact details and enquiry form       | All                                                               |                                         | Send your enquiry                                      | draft  |
| `/pay-online`           | Pay a service charge by card           | Leaseholders                                                      |                                         | Pay your service charge                                | draft  |
| `/complaints-procedure` | How to complain; TPO redress           | Leaseholders, RMC and RTM directors, Freeholders                  |                                         |                                                        | draft  |
| `/privacy-policy`       | Legal                                  | All                                                               |                                         |                                                        | draft  |
| `/cookie-policy`        | Legal                                  | All                                                               |                                         |                                                        | draft  |

## Services

| Page                                    | Purpose                                          | Audience                                              | Working keyword                     | CTA                           | Status  |
| --------------------------------------- | ------------------------------------------------ | ----------------------------------------------------- | ----------------------------------- | ----------------------------- | ------- |
| `/services/block-and-estate-management` | Hub: full management, including site inspections | RMC and RTM directors, Freeholders, Private landlords | block management; estate management | Request a management proposal | draft   |
| `/services/service-charge-budgets`      | How budgets and reserve funds are set            | RMC and RTM directors, Leaseholders                   | service charge budget               | Request a management proposal | draft   |
| `/services/service-charge-accounts`     | Collection, arrears, year end accounts           | RMC and RTM directors, Leaseholders                   | service charge accounts             | Request a management proposal | draft   |
| `/services/company-secretarial`         | Company secretary role for RMCs and RTMs         | RMC and RTM directors                                 | RMC company secretary               | Request a management proposal | draft   |
| `/services/repairs-and-maintenance`     | Day-to-day repairs, contractors                  | All                                                   | block repairs and maintenance       | Contact your property manager | draft   |
| `/services/major-works`                 | Planning and running large projects              | RMC and RTM directors, Leaseholders                   | major works managing agent          | Request a management proposal | draft   |
| `/services/section-20-consultation`     | The Section 20 process, explained                | Leaseholders, RMC and RTM directors                   | Section 20 consultation             | Contact your property manager | draft   |
| `/services/fire-and-building-safety`    | Fire, health and safety, Building Safety Act     | RMC and RTM directors, Freeholders, Developers        | fire safety block of flats          | Request a management proposal | draft   |
| `/services/leasehold-sale-packs`        | How to order a pack, cost, turnaround            | Sellers' solicitors, Leaseholders                     | leasehold management pack; LPE1     | Order a leasehold sale pack   | draft   |
| `/services/buildings-insurance`         | Insurance and claims                             | RMC and RTM directors, Freeholders                    |                                     | Request a management proposal | on hold |

The leasehold sale packs page is written with placeholders for the ordering route, cost and turnaround until BPM gives them (question 6 in `client-questions.md`). Buildings insurance is on hold until BPM confirms its insurance role (question 4).

## Who we work with

| Page                                                  | Purpose                                 | Audience                       | Working keyword                            | CTA                                | Status |
| ----------------------------------------------------- | --------------------------------------- | ------------------------------ | ------------------------------------------ | ---------------------------------- | ------ |
| `/who-we-work-with/rmc-and-rtm-directors`             | What BPM takes off a volunteer board    | RMC and RTM directors          | managing agent for RMC; RTM managing agent | Request a management proposal      | draft  |
| `/who-we-work-with/freeholders-and-private-landlords` | Compliance, reporting, asset protection | Freeholders, Private landlords | freeholder property management             | Request a management proposal      | draft  |
| `/who-we-work-with/developers`                        | From planning to handover               | Developers                     | new build development management           | Talk to us about a new development | draft  |

## Utility pages

`/404`, `/contact/thanks`, `/contact/submitting`, `/pay-online/success`, `/pay-online/failed`. Short copy only. Status: draft.

## Redirects from the live site

The redirects are `[[redirects]]` blocks in `apps/web/netlify.toml`. They return 301 on Netlify only; `npm run dev` does not apply them. The live site uses `belgarum-property.co.uk` without `www`. Redirect that host to `https://www.belgarum-property.co.uk` in Netlify domain settings. This step is manual.

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

- **Meta title:** 65 characters max, including the layout suffix (see `written/README.md`). A `meta_title` field is 34 characters max.
- **Meta description and hero lead (`description`):** 155 characters max.

## Home page template

Sections, in order:

1. **Hero:** an eyebrow line (the strapline in `messaging.md`), an H1 that speaks to the reader, a lead of 155 characters max, two calls to action ("Request a management proposal" and "Pay your service charge") and the compact trust line (`written/global/trust-strip.md`).
2. **Audience routes:** 3 cards, one for each "Who we work with" page. Each card has a title, one sentence (25 words max) and a link.
3. **Intro:** a heading and 60 to 100 words on what BPM does and where, for readers and for search.
4. **Resident support:** links to pay your service charge, contact your property manager, leasehold sale packs and the complaints procedure, with the phone number and office hours.
5. **Services grid:** one card for each live service page: title and the service `description`.
6. **Trust strip:** the shared block below.
7. **Call to action band:** heading, one sentence, "Request a management proposal".

Fields:

| Field              | Type                    | Used for                       |
| ------------------ | ----------------------- | ------------------------------ |
| `title`            | string                  | Meta title, 65 characters max  |
| `description`      | string                  | Meta description and hero lead |
| `hero.eyebrow`     | string                  | Eyebrow line above the H1      |
| `hero.heading`     | string                  | H1                             |
| `audiences`        | { title, text, href }[] | Audience route cards (3)       |
| `intro.heading`    | string                  | Intro heading                  |
| `intro.paragraphs` | string[]                | Intro, 60 to 100 words         |
| `support.heading`  | string                  | Resident support heading       |
| `support.links`    | { label, href }[]       | Resident support links         |
| `services.heading` | string                  | Services grid heading          |
| `cta.heading`      | string                  | Call to action band heading    |
| `cta.text`         | string                  | Call to action band sentence   |

## Content fields

### Services (`apps/web/src/content/services/*.json`)

| Field              | Type                                                         | Used for                                                                                    |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `title`            | string                                                       | H1 (unless `hero.heading` is set), menus, cards                                             |
| `hero.heading`     | string, optional                                             | H1, when it should differ from the menu label                                               |
| `metaTitle`        | string                                                       | The `meta_title`, 34 characters max                                                         |
| `hero.note`        | string, optional                                             | Short note under the hero lead                                                              |
| `hero.trustLine`   | boolean                                                      | Show the compact trust line under the hero                                                  |
| `cta`              | `proposal`, `development`, `residents`, `sale-pack` or `pay` | Call to action shown on the page                                                            |
| `description`      | string                                                       | Meta description and hero lead                                                              |
| `image`            | image                                                        | Hero image                                                                                  |
| `order`            | number                                                       | Sort order                                                                                  |
| `intro.heading`    | string                                                       | Intro heading                                                                               |
| `intro.paragraphs` | string[]                                                     | Intro, 60 to 100 words                                                                      |
| `included.heading` | string                                                       | "What's included" heading                                                                   |
| `included.items`   | string[]                                                     | Bullet list                                                                                 |
| `steps`            | { title, text }[]                                            | "How it works", 3 to 5 steps                                                                |
| `proof`            | string[]                                                     | "Why BPM" points, from `facts.md` only                                                      |
| `faqs`             | { question, answer: string[] }[]                             | Aim for 3 to 5 FAQs; a few more is fine where the page needs them. Output as FAQPage schema |
| `related`          | service slug[]                                               | 2 or 3 related service links                                                                |

Section headings on service pages are "How it works", "Why BPM", "Common questions" and "Related services" ("Services for you" on audience pages).

### Audiences (`audiences` collection, `apps/web/src/content/audiences/*.json`)

Route: `/who-we-work-with/[slug]`. Same fields as services, except `steps` is optional, and `services` (a list of 3 to 5 service slugs) is used in place of `related`. Audiences add `card` (string, the card text on the home and services pages).

### Shared blocks on service pages

Remove the repeated Features and About blocks from service pages. Keep one short shared trust strip above the call to action band. Its contents are under "Trust strip" in `messaging.md`.

The home page, the block and estate management page and the three audience pages also show the compact trust line under the hero, so the proof sits next to the first claim. Its contents are in `written/global/trust-strip.md`.

## Writing inputs not yet sourced

The block and estate management page can describe what the live site supports (see "Ways of working" in `facts.md`). These have no source, so leave them out until the client answers:

- How often site inspections happen (only a LinkedIn post mentions quarterly visits)
- How a new building signs up, or moves from another agent (question 9)
- The repair reporting route (question 7)
- Insurance arrangements and commission (question 4)
- Approved photos of buildings and the team (question 3)
