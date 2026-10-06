# Google Business Profile setup

Action for someone with access to the business Google account at [business.google.com](https://business.google.com). This cannot be done from the codebase. Keep all details identical to the website (NAP consistency is a local ranking factor). Values below match the site's LocalBusiness schema and `docs/content/facts.md`.

## Core details

| Field            | Value                                                           |
| ---------------- | --------------------------------------------------------------- |
| Business name    | Belgarum Property Management                                    |
| Primary category | Property management company                                     |
| Phone            | +44 800 298 0069                                                |
| Email            | management@bpmanagement.org                                     |
| Address          | Old Manor Nursery, Kilham Lane, Winchester, Hampshire, SO22 5QD |
| Opening hours    | Monday to Thursday, 09:00 to 17:00; Friday, 09:00 to 16:30      |
| Service areas    | Hampshire, Sussex, Dorset, London, Home Counties                |
| Website          | https://www.belgarum-property.co.uk                             |

## Services to add (match the website's service pages)

- Block and estate management
- Service charge budgets
- Service charge accounts
- Company secretarial
- Repairs and maintenance
- Major works
- Section 20 consultation
- Fire and building safety

Add "Leasehold sale packs" when that page goes live. Add "Buildings insurance" only if that page goes live (it is on hold in `docs/content/page-map.md`).

## Checklist

- [ ] Claim and verify the listing
- [ ] Set the primary category above. Do not add "Real estate agency": BPM does no estate agency
- [ ] Confirm NAP (name, address, phone) matches the website exactly
- [ ] Set opening hours
- [ ] Add the service areas
- [ ] Add the services above under the GBP "Services" section
- [ ] Upload logo and premises photos (no stock or placeholder images)
- [ ] Write a business description (reuse approved website copy once available)
- [ ] Request reviews from existing clients
- [ ] Keep details in sync with the website whenever either changes

## Notes

- The website already exposes matching structured data (`LocalBusiness`) in `apps/web/src/components/global/Schema.astro`. If any business detail changes, update both the GBP listing and that component.
