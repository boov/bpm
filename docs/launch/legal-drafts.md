# Legal drafts for client approval

Draft wording for 2 gaps that block launch: retention periods in the privacy policy (client question 14) and complaint timescales in the complaints procedure (client question 7). Neither page has been changed. The client approves or corrects each draft, then we paste it in.

This is a plain summary of the sources, not legal advice.

## 1. Privacy policy: how long we keep your information

### Status

Every period below is suggested, for the client to confirm. No source tells us how BPM stores enquiries, payments, call recordings or complaints today. Where a period depends on that practice, the questions at the end of this section say so.

| Information                                        | Suggested period                                                       | Main basis                                                                                          | Depends on BPM's practice?                                     |
| -------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Enquiries that do not lead to further work         | 12 months after our last contact                                       | ICO storage limitation guidance: no fixed legal period, so keep only as long as needed              | Yes: where enquiries are filed, and whether emails are deleted |
| Copies of contact form submissions held by Netlify | Deleted from Netlify within 3 months, once copied to BPM's own records | Netlify keeps submissions until the site owner deletes them, and recommends regular deletion        | Yes: who deletes them, and how often                           |
| Enquiries that lead to a management contract       | For as long as we manage the building, then 6 years                    | Limitation Act 1980, section 5 (6 years for contract claims); RICS code section 3.13                | Partly                                                         |
| Online payment records                             | 12 years from the payment                                              | RICS code section 7.3 (client money records: at least 12 years); HMRC (6 years for company records) | Yes: whether online payments are client money                  |
| Call recordings                                    | 90 days, or longer if the call is part of a complaint or claim         | ICO storage limitation guidance; no statute sets a period for training recordings                   | Yes: what the phone system allows                              |
| Analytics data in Google Analytics                 | 14 months (the Google Analytics setting)                               | Google Analytics data retention options: 2 or 14 months                                             | Yes: the setting in the Google Analytics property              |
| Complaint records                                  | 6 years after the complaint is closed                                  | Limitation Act 1980, section 5; TPO 12 month referral window                                        | Partly                                                         |

### Proposed wording

Paste this as a new section after "Who we share it with" and before "Your rights".

```markdown
## How long we keep your information

We keep your information only for as long as we need it. When we no longer need it, we delete it or make it anonymous.

| Information                                  | How long we keep it                                 |
| -------------------------------------------- | --------------------------------------------------- |
| Enquiries that do not lead to further work   | 12 months after our last contact with you           |
| Enquiries that lead to a management contract | For as long as we manage the building, then 6 years |
| Contact form submissions held by Netlify     | Up to 3 months, then we delete them from Netlify    |
| Online payment records                       | 12 years from the date of the payment               |
| Call recordings                              | 90 days                                             |
| Website analytics data                       | 14 months                                           |
| Complaint records                            | 6 years after we close the complaint                |

We keep payment records for 12 years because the law and our professional code require us to keep records of service charge money. We keep contract and complaint records for 6 years because a legal claim can be made up to 6 years after the event.

We may keep information for longer if it is part of a complaint, a dispute or a legal claim. We keep it until that matter has ended and no further claim can be made.

Stripe keeps its own records of your payment. Stripe's privacy policy explains how long it keeps them.
```

Notes on the wording:

- The "Who we share it with" section already names Netlify, Stripe and Google, so the draft does not explain them again.
- The analytics row covers the data held in Google Analytics. The cookie policy already says the `_ga` cookies last 2 years on your device. The two periods measure different things, so both can stand.
- The call recordings row says 90 days with no exception. The exception is covered by the paragraph about complaints, disputes and claims.
- If BPM confirms that online payments are not client money, change the payment row to "6 years after the end of our financial year" and change the first sentence of the second paragraph to: "We keep payment records for 6 years because the law requires us to keep financial records."

### Sources

All sources were read on 19 October 2026.

- **UK GDPR, Article 13(2)(a)**, [legislation.gov.uk/eur/2016/679/article/13](https://www.legislation.gov.uk/eur/2016/679/article/13). A privacy notice must give "the period for which the personal data will be stored, or if that is not possible, the criteria used to determine that period". This is why the section is required.
- **ICO, What privacy information should we provide?**, [ico.org.uk](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/). Says you must "Say how long you will keep the personal data for". If there is no fixed period, give the criteria used to decide it.
- **ICO, Principle (e): Storage limitation**, [ico.org.uk](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/). Article 5(1)(e) UK GDPR. "You must not keep personal data for longer than you need it." The law sets no fixed periods: the organisation must justify its own. You can keep data to defend possible legal claims, but should delete it once a claim can no longer arise. Records needed to meet legal requirements (such as tax and audit) can be kept for those periods. Small organisations doing low-risk processing may not need a written retention policy, but must still review and delete data.
- **GOV.UK, Running a limited company: company and accounting records**, [gov.uk/running-a-limited-company/company-and-accounting-records](https://www.gov.uk/running-a-limited-company/company-and-accounting-records). "You must keep records for 6 years from the end of the last company financial year they relate to", or longer in some cases (for example, a late Company Tax Return or an HMRC compliance check).
- **Limitation Act 1980, section 5**, [legislation.gov.uk/ukpga/1980/58/section/5](https://www.legislation.gov.uk/ukpga/1980/58/section/5). "An action founded on simple contract shall not be brought after the expiration of six years from the date on which the cause of action accrued." This is the basis for the 6 year periods.
- **RICS, Service charge residential management code, 4th edition (England)**, effective from 7 April 2026, [PDF on rics.org](https://www.rics.org/content/dam/ricsglobal/documents/standards/Service-Charge-Residential-Management-Code_4th-edition.pdf). Approved by the Secretary of State (SI 2026/298). TPO says its leasehold management members in England must follow this code (see the TPO consumer guide under section 2 below).
  - Section 3.13: keep records about the building "in accordance with data protection principles ... during the periods of statutory limitation of action".
  - Section 3.3: personal information must be "not kept for longer than is necessary".
  - Section 7.3: keep records of "all accounts, books, ledgers and records maintained in respect of all client money accounts and all bank or building society statements, for at least 12 years from the date of the last entry in those records". The glossary defines client money to include service charges.
- **TPO**: no separate TPO Code of Practice for Residential Leasehold Management was found. TPO's list of current codes (at [tpos.co.uk/members/codes-of-practice](https://www.tpos.co.uk/members/codes-of-practice)) has codes for letting, estate, buying and commercial agents only. The TPO documents read for section 2 set no retention period for complaint records. The only TPO time limit that affects retention is that a complaint can go to TPO up to 12 months after the final response.
- **Netlify, Form submissions**, [docs.netlify.com/manage/forms/submissions](https://docs.netlify.com/manage/forms/submissions/). The page gives no retention period. Site owners can delete submissions, and deletion is permanent. Netlify recommends: "If your form collects personally identifiable information (PII), we recommend that you actively manage the data by exporting form submissions and deleting them regularly."
- **Google Analytics Help, Data retention**, [support.google.com/analytics/answer/7667196](https://support.google.com/analytics/answer/7667196). User-level and event-level data can be kept for 2 months or 14 months (longer only for paid 360 properties). The setting does not affect standard aggregated reports.

### Questions for the client

1. Where do contact form enquiries go after they arrive: email only, a shared inbox, or a management system? Who deletes old ones?
2. Will someone at BPM (or we, as the web developer) delete submissions from Netlify every 3 months? If nobody will, we must state a longer period.
3. Is a payment made through the website service charge money that goes into a client money account? If yes, the 12 year period applies. If no, 6 years applies.
4. Does BPM keep its own record of each online payment (for example, in its accounts system), or only the Stripe record?
5. How long does your phone system keep call recordings? Can it delete them automatically after 90 days? Who can listen to them?
6. Who owns the Google Analytics property? We can set its data retention to 14 months if you agree.
7. How long do you keep complaint files now? Is 6 years after closing acceptable?
8. Do you already have a data retention policy, or periods set by your professional indemnity insurer? If so, those periods replace ours.
9. Question 15 still stands: do you have a separate privacy notice for clients and leaseholders of the buildings you manage? That notice, not the website one, would cover building and service charge records.

## 2. Complaints procedure: what happens next

### What TPO and the RICS code require

- No TPO Code of Practice for Residential Leasehold Management exists in TPO's current list. TPO says leasehold managing agents in England must follow the RICS Service Charge Residential Management Code.
- RICS code section 4.4 says the complaints procedure "should include a short series of steps and response times for its various stages". The current page has the steps but no response times, so it falls short of the code.
- TPO's Complaint Handling Toolkit for Residential Leasehold Management gives a model procedure: acknowledge within 3 working days, respond within 15 working days, a final review within 15 working days of the escalated complaint, and the whole process should take no longer than 8 weeks.
- The 8 week figure matches the existing "If you are still unhappy" section. No change is needed there.

### Proposed wording (option A: two stages, as in the TPO model)

Replace the whole "What happens next" section (the numbered list and the sentence "We will deal with your complaint as quickly as we can.") with this:

```markdown
## What happens next

1. We will acknowledge your complaint in writing within 3 working days.
2. We will look into it, and we may contact you for more information.
3. We will send you a written response within 15 working days of receiving your complaint.
4. If you are not happy with our response, please tell us. A senior member of staff who was not involved will review your complaint. They will send you our final response in writing within 15 working days of receiving your request.

Working days are Monday to Friday, not including bank holidays. If we need more time at any stage, we will tell you why and when you will hear from us. Our complaints process should take no longer than 8 weeks.
```

### Proposed wording (option B: one stage)

Use this only if BPM does not offer an internal review. It is simpler, but it is not the TPO model.

```markdown
## What happens next

1. We will acknowledge your complaint in writing within 3 working days.
2. We will look into it, and we may contact you for more information.
3. We will send you our final response in writing within 15 working days of receiving your complaint.

Working days are Monday to Friday, not including bank holidays. If we need more time, we will tell you why and when you will hear from us.
```

Notes on the wording:

- Both options keep "final response", the term the "If you are still unhappy" section and TPO use.
- The draft avoids contractions, as the tone of voice guide asks for the complaints procedure.
- "Senior member of staff" is a placeholder. If BPM names a role (for example, a director), use the role, not a person's name. The RICS code asks for complaints about staff to go to "a responsible principal".

### Sources

All sources were read on 19 October 2026.

- **TPO, Complaint Handling Toolkit, Residential Leasehold Management (TPOE93-1)**, [PDF on tpos.co.uk](https://www.tpos.co.uk/images/Complaints_Handling_Toolkits/TPOE93-1_Complaints_Handling_Toolkit_RLM.pdf). Template 1, the in-house complaints procedure, says: "The process should take no longer than 8 weeks." Stage 2, acknowledgement: "We aim to respond within 3 working days of receiving your complaint." Stage 3, investigation: "We aim to respond within 15 working days of receiving your complaint." Stage 4, final investigation: "We aim to respond within 15 working days of receiving your subsequent complaint." Stage 5a: refer to TPO "within 12 months of the date of our final viewpoint letter". The timeline on page 2 shows the same 3 and 15 working day steps. This is a template that TPO offers, not a rule in a code.
- **TPO, Guide for Consumers about Complaints concerning Leasehold, Estate and Commonhold Managing Agents (TPOE92)**, [PDF on tpos.co.uk](https://www.tpos.co.uk/images/documents/guidance/TPOE92_RLM_Consumer_Guide_A4.pdf). Page 1: agents managing for the property owner in England "must follow the RICS Code of Practice: Service Charge residential management Code". Page 7: a consumer can go to TPO if "the agent has not sent you their final response in writing and more than eight weeks has passed since you made your first complaint", and "within 12 months of the date of the agent's final response".
- **TPO, How it works**, [tpos.co.uk/consumers/how-it-works](https://www.tpos.co.uk/consumers/how-it-works/). Confirms the 8 week and 12 month rules. It also says a consumer must complain to the business "within 12 months of the event you want to complain about".
- **RICS, Service charge residential management code, 4th edition (England)**, section 4.4 Complaints, [PDF on rics.org](https://www.rics.org/content/dam/ricsglobal/documents/standards/Service-Charge-Residential-Management-Code_4th-edition.pdf). Managing agents "must have a formal written complaints handling procedure". It "should include a short series of steps and response times for its various stages", and should let complaints about staff go to "a responsible principal" and be "investigated quickly and fairly". It must name the redress scheme and tell leaseholders they can escalate.
- **TPO letting agents code (for comparison only)**: TPO's codes for letting and estate agents set 3 working days to acknowledge, 15 working days for the outcome and 15 working days for a review. These codes do not apply to BPM's leasehold management work. They show the same timescales are TPO's standard.

### Questions for the client

1. Your live site mentions a Code of Conduct with set reply times. What times does it give for complaints? If they differ from these, we will use yours.
2. Can you meet 3 working days to acknowledge and 15 working days to respond?
3. Do you offer a second, internal review by someone not involved (option A)? If not, we will use option B.
4. Who carries out that review? Give a role, such as "a director", not a name.

## Other issues found

- When a draft is pasted in, change the `updated` field in that page's front matter.
