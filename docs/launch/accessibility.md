# Accessibility audit

**Result: no WCAG 2.2 AA failures found by Lighthouse, keyboard and contrast checks. Screen readers and zoom are not tested (see "What I could not test").**

## Lighthouse accessibility scores

Production build served from `apps/web/dist`. Lighthouse navigation audits.

| Page                                       | Desktop | Mobile | Failed audits |
| ------------------------------------------ | ------- | ------ | ------------- |
| `/`                                        | 100     | 100    | none          |
| `/services/`                               | 100     | 100    | none          |
| `/services/block-and-estate-management/`   | 100     | 100    | none          |
| `/who-we-work-with/`                       | 100     | 100    | none          |
| `/who-we-work-with/rmc-and-rtm-directors/` | 100     | 100    | none          |
| `/about/`                                  | 100     | 100    | none          |
| `/faqs/`                                   | 100     | 100    | none          |
| `/contact/`                                | 100     | 100    | none          |
| `/pay-online/`                             | 100     | 100    | none          |
| `/privacy-policy/`                         | 100     | 100    | none          |
| `/complaints-procedure/`                   | 100     | 100    | none          |
| `/cookie-policy/`                          | 100     | 100    | none          |
| `/404.html`                                | 100     | 100    | none          |
| `/contact/thanks/`                         | 100     | 100    | none          |

Lighthouse did not see the cookie banner. See "What I could not test". Lighthouse does not check focus visibility, text over images or placeholder text.

## Token contrast reference

Measured from the computed theme tokens.

| Foreground                     | Background                          | Ratio        | AA normal text                |
| ------------------------------ | ----------------------------------- | ------------ | ----------------------------- |
| brand-text light `#433e3d`     | light background `#f6f0ee`          | 9.34         | Pass                          |
| brand-text light `#433e3d`     | light lowlight `#f1e8e4`            | 8.69         | Pass                          |
| brand-text light `#433e3d`     | white (cards)                       | 10.50        | Pass                          |
| brand-text dark `#f29573`      | dark background `#3c3d3e`           | 4.84         | Pass                          |
| brand-text dark `#f29573`      | dark lowlight `#2d2e2f`             | 6.06         | Pass                          |
| brand-text dark `#f29573`      | home hero photo, behind the eyebrow | 4.69 or more | Pass                          |
| brand fill `#f08760`           | light background `#f6f0ee`          | 2.24         | Not used for text             |
| foreground `#433e3d`           | light background                    | 9.33         | Pass                          |
| foreground-light `#706966`     | light background                    | 4.77         | Pass                          |
| foreground-light `#706966`     | light lowlight                      | 4.46         | Fail (not in use there today) |
| foreground `#b6b1af`           | dark background                     | 5.13         | Pass                          |
| foreground `#b6b1af`           | dark highlight `#4b4c4e`            | 4.05         | Fail (not in use there today) |
| action-foreground `#281a15`    | brand (solid buttons)               | 6.66         | Pass                          |
| placeholder (foreground-light) | white input                         | 5.38         | Pass                          |

## Should fix

- **Desktop dropdown loses focus on Escape.** All pages at `xl` and up. Tab into "Services", then into a child link, then press Escape. The menu closes and focus goes to `body`. Move focus back to the parent link. WCAG 2.4.3. `components/global/Banner.astro`.
- **`aria-haspopup="true"` on nav links.** All pages, desktop. This announces a menu, but the children are a plain list of links. Remove `aria-haspopup` and keep `aria-expanded`, or use a separate disclosure button. WCAG 4.1.2 (best practice). `components/global/Banner.astro`.
- **Form field borders are almost invisible.** `/contact/`, `/pay-online/`. White fields on a `#f6f0ee` page with a 5% black outline (1.12:1). The labels show where each field is, so this is borderline. A visible border helps people with low vision. WCAG 1.4.11. `components/Input.astro`, `Textarea.astro`, `Select.astro`.
- **Form field focus is faint.** Same pages. Focus shows a 20% black outline and a 20% opacity brand or red ring. It is visible on screen but low in contrast. WCAG 2.4.7 / 1.4.11. Same files.
- **Errors are only native browser bubbles.** `/contact/`, `/pay-online/`. Native validation works: Enter on "Send your enquiry" moves focus to the first empty field and shows the custom message ("Enter your name"). The message disappears on the next action and does not stay next to the field. Add inline error text linked with `aria-describedby` and set `aria-invalid`. WCAG 3.3.1 is met today. `pages/contact/ContactForm.astro`, `assets/scripts/validation-messages.ts`, `pages/pay-online/PaymentForm.astro`.
- **No "required" instruction.** `/contact/`. Required fields have `required`, and optional fields say "optional", but nothing on the page says that the other fields are required. Add one line above the form. WCAG 3.3.2 is met. `pages/contact/ContactForm.astro`.
- **Payment opens a new tab without warning.** `/pay-online/`. The form and button use `target="_blank"`. Say "opens in a new tab" in the button or near it. WCAG 3.2.5 (AAA advice). `components/pages/pay-online/PaymentForm.astro`.
- **No skip link.** All pages. Landmarks (`header`, `nav`, `main`, `footer`) meet 2.4.1. On `xl` screens the desktop dropdown has 9 service links, and a keyboard user tabs through all of them before reaching the page. A "Skip to content" link would help. WCAG 2.4.1. `layouts/Default.astro`.
- **Home page `h1` is inside the `header` landmark.** `/`. The hero (with the `h1`) sits in the banner, and `main` starts at "About us". Screen reader users who jump to `main` miss the `h1`. `pages/index.astro`, `layouts/Default.astro`.
- **FAQ questions are not headings.** `/faqs/` and every FAQ list. The buttons work well (see "Fine as is"). Wrapping each button in an `h3` lets screen reader users move between questions by heading. Add `aria-controls` too. `components/collection/question/Question.astro`.
- **Mobile sub-menu toggles are small.** Mobile menu, "Show Services pages" and "Show Who we work with pages" buttons are 19 by 19px. They pass 2.5.8 through the spacing exception, but they are hard to tap. `components/global/Gutter.astro`.
- **Two tokens fail if used in that place.** `foreground-light` on light `background-lowlight` is 4.46:1. Dark `foreground` on dark `background-highlight` is 4.05:1. Neither pair is in use today. Raise them so future use is safe. `assets/styles/main.css`.

## Fine as is

- **Page basics:** `lang="en-GB"`, unique titles, one `h1` per page, no skipped heading levels, `header` / `nav` (labelled) / `main` / `footer` on every page.
- **Brand text contrast:** text in the brand role (eyebrows, role labels, step numbers, links, outline buttons) uses `--color-theme-brand-text`, which each theme sets. In light sections it is `#433e3d`, the same dark grey as body text, so links rely on their underline to stand out. In dark sections it is the orange `#f29573`. In dark sections the hover shade (`--color-theme-brand-text-hover`) is lighter, with more contrast. In light sections the hover shade is a lighter grey, `#585250`, which still passes: 6.78:1 on the light background, 6.34:1 on light lowlight and 7.65:1 on white. The brand orange `#f08760` is used only for fills, dividers and icons.
- **Body text contrast:** light theme body text 9.33:1, dark theme body text 5.13:1, solid orange buttons with dark text 6.66:1, hero intro over the photo at least 4.5:1, hero `h1` at least 8.6:1.
- **Links in text:** all inline links are underlined, so colour is not the only cue (1.4.1).
- **Images and icons:** card and hero photos have `alt=""` and are decorative. Page hero photos have meaningful alt text ("Modern brick blocks of flats...", "Board of directors meeting..."). All 44 SVG icons on the home page are `aria-hidden` or have a title. The logo link is named "Belgarum Property Management". Social links have text names.
- **FAQ accordions:** native `button` elements with `aria-expanded` that changes between `false` and `true`. Enter and Space both toggle the answer. Collapsed answers are `display: none`. The default browser focus outline shows.
- **Cookie banner:** a `dialog` named "Cookies on this website" with its description. Focus stays inside the banner until a choice is made. "Accept all", "Reject all" and "Manage preferences" work by keyboard. All banner text and buttons are 6:1 or better. Escape does not close the first banner, which is correct because a choice is needed.
- **Cookie preferences:** a named `dialog`. Escape closes it and returns focus to the button that opened it ("Manage preferences" or the footer "Cookie settings"). Toggles are named checkboxes.
- **Mobile menu:** below the `xl` breakpoint, "Open menu" has `aria-controls="p_gutter"` and an `aria-expanded` state. The overlay is a named modal `dialog` with a solid background. Opening it moves focus to "Close menu" and makes the rest of the page `inert`, so Tab cycles through the menu only. Escape and "Close menu" close it and return focus to "Open menu". After a menu link loads a new page, the menu is closed. Logic: `assets/scripts/gutter.ts`.
- **Desktop dropdowns:** open on keyboard focus, `aria-expanded` updates, child links have a visible outline.
- **Buttons and cards:** `.button` links and buttons show a 2px `brand-text` outline 4px clear of the button on keyboard focus (9.34:1 on light, 4.84:1 on dark). Service cards, audience cards and resident support links show a 2px `brand-text` ring (10.50:1 against the white card, 9.34:1 against the page). The footer "Cookie settings" button shows a current-colour outline. A keyboard pass over 789 focus stops on 10 pages found no stop without a 3:1 indicator.
- **Plain links and other buttons:** visible outline on focus (`a` base rule or browser default). No positive `tabindex` anywhere. Tab order follows the visual order on desktop.
- **Form fields:** name, email and phone fields have `autocomplete` (`name`, `email`, `tel`) on `/contact/` and `/pay-online/`. Placeholder text uses `foreground-light` at full strength: 5.38:1 on the white field.
- **Contact form labels:** every visible field has a `<label for>`. Required fields use `required`. Optional fields say "optional" in the label. The hidden Netlify form is `hidden`, so it is not exposed.
- **390px width:** no horizontal scroll on any of the 11 pages. All tap targets pass 2.5.8 (size or spacing). Text buttons (`Button-Text.astro`, used on the 404 and contact thanks pages) have vertical padding, so they are about 30px tall.
- **Reduced motion:** `prefers-reduced-motion: reduce` turns off transitions, animations and smooth scroll (`main.css`).

## Assumptions

- I treated the brand subheadings and role labels as text that must meet 4.5:1. They are 12 to 16px bold, which is below the 18.66px bold "large text" size.
- I treated placeholder text as text covered by 1.4.3, as W3C does. Lighthouse and axe skip placeholders.
- I counted 2.4.1 as met, because the pages have landmarks. The skip link is under "Should fix".
- For text over the home hero photo I measured the rendered pixels behind the eyebrow text at 1440, 1024 and 390px wide.
- `vanilla-cookieconsent` hides the banner from automated browsers (`hideFromBots: true`). To test the banner I made the page report `navigator.webdriver` as `false`. Real visitors see the banner.

## What I could not test

- The cookie banner in Lighthouse. Because of `hideFromBots`, Lighthouse never saw it. I checked its contrast and keyboard use by hand.
- Screen readers (VoiceOver, NVDA). I checked the accessibility tree and ARIA states, not real announcements. This includes the native validation bubbles and the Astro `ClientRouter` page change announcement.
- 200% text zoom and 400% zoom reflow at 320px. I tested 390px only.
- Windows High Contrast / forced colours mode.
- Keyboard and focus checks on pages outside the 11 I tested by hand (other service and audience pages, `/complaints-procedure/`, `/cookie-policy/`, `/contact/thanks/`, `/pay-online/success/`). They use the same components as the tested pages.
- The Stripe payment page, which is a third-party site.
