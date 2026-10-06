import assert from "node:assert/strict";
import { test } from "node:test";

import { faqPageSchema } from "./faq-schema.ts";

test("builds FAQPage schema with plain-text answers", () => {
  const schema = faqPageSchema([{ question: "How do I pay?", answer: ["You can [pay online](/pay-online).", "Use the amount on your demand."] }]);
  assert.deepEqual(schema, {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I pay?",
        acceptedAnswer: { "@type": "Answer", text: "You can pay online.\n\nUse the amount on your demand." }
      }
    ]
  });
});
