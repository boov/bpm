---
url: /pay-online
status: draft
audience: Leaseholders
keyword: (none)
meta_title: "Pay your service charge" # 23 characters; 54 with the layout suffix
meta_description: "Pay your service charge to Belgarum Property Management online by debit or credit card. Stripe takes your payment securely." # 123 characters
---

## Hero

### Heading

Pay your service charge

### Lead

Pay online by debit or credit card. Stripe takes your payment securely.

## How to pay

1. Enter the amount you want to pay. Use the amount on your service charge demand.
2. Enter your email address.
3. Select "Pay your service charge". A secure Stripe payment page opens in a new tab.
4. Enter your card details on the Stripe page to complete the payment.

`[NEEDS: payment reference]`

## Form

| Element       | Copy                                                   |
| ------------- | ------------------------------------------------------ |
| Amount label  | Amount to pay (£)                                      |
| Email label   | Email address                                          |
| Email hint    | For your payment confirmation                          |
| Submit button | Pay your service charge                                |
| Stripe note   | Payments by Stripe                                     |
| Amount error  | Enter the amount to pay, for example 250.50            |
| Email error   | Enter your email address, for example name@example.com |

## Help

### Heading

Questions about your demand?

### Text

If you're not sure how much to pay, or you think your demand is wrong, contact your property manager before you pay. Call 0800 298 0069 or email management@bpmanagement.org.

---

**Facts used:**

| Claim on this page           | `facts.md` row                                         | Status  |
| ---------------------------- | ------------------------------------------------------ | ------- |
| Online card payments, Stripe | Ways of working: Online card payments (Stripe)         | Sourced |
| Phone; email                 | Company: Phone; Email                                  | Sourced |
| Property manager as contact  | Ways of working: Dedicated property manager per client | Sourced |

How the form works (checked in `PaymentForm.astro`): the form takes an amount and an email address, then opens a Stripe payment link in a new tab.

**Gaps:**

- `[NEEDS: payment reference]` How a card payment is matched to the right flat. The form has no reference field, so the page does not ask for one. The current page asks for a "reference number from your invoice", but there is nowhere to enter it.
- `[NEEDS: fees]` Whether a card fee applies.

Build notes (not copy):

- Consider adding a reference field (flat address or demand number) to the form, so each payment can be matched.
- The email hint promises a confirmation. Check that the Stripe payment link sends receipts before going live. If it does not, change the hint to "So we can contact you about your payment".
