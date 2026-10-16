# Written copy

Website copy for Belgarum Property Management. The rules for this copy are the groundwork documents in `docs/content/`. Page purposes, audiences and keywords are in `page-map.md`.

Status values match `page-map.md`: not started, draft, review, approved, on hold.

Meta titles: the site layout adds " - Belgarum Property Management" (31 characters) to each page title, except on the home page. The copy does not include the suffix. A `meta_title` of 34 characters or fewer keeps the full title within 65 characters. Search engines cut titles by width, not by a character count, so if a title is cut, the end of the brand suffix goes first and the keyword at the start stays.

## Files

| File                                                    | URL                                                   | Status |
| ------------------------------------------------------- | ----------------------------------------------------- | ------ |
| `global/header.md`                                      | (all pages)                                           | draft  |
| `global/footer.md`                                      | (all pages)                                           | draft  |
| `global/cta-band.md`                                    | (shared block)                                        | draft  |
| `global/trust-strip.md`                                 | (shared block)                                        | draft  |
| `services/block-and-estate-management.md`               | `/services/block-and-estate-management`               | draft  |
| `services/service-charge-budgets.md`                    | `/services/service-charge-budgets`                    | draft  |
| `services/service-charge-accounts.md`                   | `/services/service-charge-accounts`                   | draft  |
| `services/company-secretarial.md`                       | `/services/company-secretarial`                       | draft  |
| `services/repairs-and-maintenance.md`                   | `/services/repairs-and-maintenance`                   | draft  |
| `services/major-works.md`                               | `/services/major-works`                               | draft  |
| `services/section-20-consultation.md`                   | `/services/section-20-consultation`                   | draft  |
| `services/fire-and-building-safety.md`                  | `/services/fire-and-building-safety`                  | draft  |
| `services/leasehold-sale-packs.md`                      | `/services/leasehold-sale-packs`                      | draft  |
| `who-we-work-with/rmc-and-rtm-directors.md`             | `/who-we-work-with/rmc-and-rtm-directors`             | draft  |
| `who-we-work-with/freeholders-and-private-landlords.md` | `/who-we-work-with/freeholders-and-private-landlords` | draft  |
| `who-we-work-with/developers.md`                        | `/who-we-work-with/developers`                        | draft  |
| `pages/home.md`                                         | `/`                                                   | draft  |
| `pages/services.md`                                     | `/services`                                           | draft  |
| `pages/about.md`                                        | `/about`                                              | draft  |
| `pages/faqs.md`                                         | `/faqs`                                               | draft  |
| `pages/contact.md`                                      | `/contact`                                            | draft  |
| `pages/pay-online.md`                                   | `/pay-online`                                         | draft  |
| `pages/complaints-procedure.md`                         | `/complaints-procedure`                               | draft  |
| `pages/privacy-policy.md`                               | `/privacy-policy`                                     | draft  |
| `pages/cookie-policy.md`                                | `/cookie-policy`                                      | draft  |
| `utility/404.md`                                        | `/404`                                                | draft  |
| `utility/contact-thanks.md`                             | `/contact/thanks`                                     | draft  |
| `utility/contact-submitting.md`                         | `/contact/submitting`                                 | draft  |
| `utility/payment-success.md`                            | `/pay-online/success`                                 | draft  |
| `utility/payment-failed.md`                             | `/pay-online/failed`                                  | draft  |

## Gaps

A gap is content left out because there is no source. Each written page lists its gaps at the end, as a `[NEEDS: …]` tag. The facts behind each gap are in `facts.md`, and the client questions are in `client-questions.md`.

To list every gap and the pages it affects:

```bash
rg -n "\[NEEDS:" docs/content/written
```

Use only the tags below, so the search finds every page. Add a new tag to this table before using it.

| Tag                                     | Missing                                                                     |
| --------------------------------------- | --------------------------------------------------------------------------- |
| `[NEEDS: case studies]`                 | Named developments or projects BPM approves for publication                 |
| `[NEEDS: client money protection (Q1)]` | Whether BPM has client money protection cover                               |
| `[NEEDS: out-of-hours line (Q1)]`       | Whether BPM has an out-of-hours emergency line                              |
| `[NEEDS: team photos (Q2)]`             | Current team list and headshots                                             |
| `[NEEDS: insurance role (Q3)]`          | Whether BPM arranges buildings insurance, and commission                    |
| `[NEEDS: VAT number (Q4)]`              | VAT registration and number                                                 |
| `[NEEDS: sale pack ordering (Q5)]`      | How to order a leasehold sale pack                                          |
| `[NEEDS: sale pack cost (Q5)]`          | What a leasehold sale pack costs                                            |
| `[NEEDS: sale pack turnaround (Q5)]`    | How long a leasehold sale pack takes                                        |
| `[NEEDS: repair reporting (Q6)]`        | How leaseholders report a repair                                            |
| `[NEEDS: response times (Q7)]`          | Reply times from BPM's Code of Conduct                                      |
| `[NEEDS: switching process (Q8)]`       | How a building signs up or moves from another agent                         |
| `[NEEDS: inspection frequency]`         | How often site inspections happen                                           |
| `[NEEDS: major works supervision]`      | Who supervises major works on site, and how progress is reported            |
| `[NEEDS: accounts certification]`       | Whether an independent accountant checks or certifies the year end accounts |
| `[NEEDS: RTM company secretary]`        | Whether BPM acts as company secretary for RTM companies                     |
| `[NEEDS: building safety role]`         | What BPM does for higher-risk buildings under the Building Safety Act 2022  |
| `[NEEDS: developer services]`           | What BPM does for developers beyond planning-stage involvement              |
| `[NEEDS: fees]`                         | Management fees and administration charges                                  |
| `[NEEDS: complaint timescales]`         | Timescales in BPM's complaints procedure                                    |
| `[NEEDS: payment reference]`            | How an online card payment is matched to the right flat                     |
| `[NEEDS: cookie list]`                  | The cookies set by the consent tool and each tag in Google Tag Manager      |
| `[NEEDS: privacy details]`              | ICO registration number, retention periods, and any client privacy notice   |
