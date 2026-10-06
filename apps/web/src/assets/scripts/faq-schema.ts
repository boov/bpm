import { stripInline } from "./inline-markdown.ts";

export type Faq = { question: string; answer: string[] };

export const faqPageSchema = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer.map(stripInline).join("\n\n") }
  }))
});
