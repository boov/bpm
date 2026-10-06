---
url: /pay-online/failed
status: draft
audience: Leaseholders
keyword: (none)
meta_title: "Payment not completed" # 21 characters; 52 with the layout suffix
meta_description: "Your payment wasn't completed. You can try again, or contact us if you need help." # 81 characters
---

## Heading

Payment not completed

## Text

Your payment wasn't completed. You can try again, or use a different card.

If money has left your account, contact your property manager on 0800 298 0069 before you try again.

## Links

| Label                         | Link          |
| ----------------------------- | ------------- |
| Try again                     | `/pay-online` |
| Contact your property manager | `/contact`    |

---

**Facts used:**

| Claim on this page | `facts.md` row | Status  |
| ------------------ | -------------- | ------- |
| Phone              | Company: Phone | Sourced |

**Gaps:** none.

Build note (not copy): the success page sends visitors here when Stripe returns any `redirect_status` other than "succeeded", which can include a payment that is still processing. The copy does not say "you have not been charged" for that reason.
