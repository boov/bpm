import { callKeys } from "@assets/scripts/calls-to-action";
import { personnel as personnelContent, questions as questionsContent } from "@bpm/data";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, reference } from "astro:content";

const statusSchema = z.enum(["draft", "published"]).default("published");

const personnel = defineCollection({
  loader: async () => {
    return personnelContent.data.map(personnel => ({
      id: personnel.name.toLowerCase().replace(/\s+/g, "-"),
      ...personnel
    }));
  },
  schema: personnelContent.schema
});

const questions = defineCollection({
  loader: async () => {
    return questionsContent.data.map((question, index) => ({
      id: question.title.toLowerCase().replace(/\s+/g, "-"),
      order: index,
      ...question
    }));
  },
  schema: questionsContent.schema
});

const stepSchema = z.object({ title: z.string(), text: z.string() });
const faqSchema = z.object({ question: z.string(), answer: z.array(z.string()).min(1) });

const pageFields = {
  status: statusSchema,
  order: z.number().optional().default(0),
  title: z.string(),
  metaTitle: z.string().max(34),
  hero: z.object({ heading: z.string().optional(), note: z.string().optional() }).default({}),
  cta: z.enum(callKeys),
  description: z.string().max(155),
  intro: z.object({ heading: z.string(), paragraphs: z.array(z.string()).min(1) }),
  included: z.object({ heading: z.string(), items: z.array(z.string()).min(1) }),
  proof: z.array(z.string()).min(1),
  faqs: z.array(faqSchema).min(1)
};

const services = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/services" }),
  schema: ({ image }) =>
    z.object({
      ...pageFields,
      image: image(),
      imageAlt: z.string(),
      steps: z.array(stepSchema).min(1)
    })
});

const audiences = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/audiences" }),
  schema: ({ image }) =>
    z.object({
      ...pageFields,
      image: image(),
      imageAlt: z.string(),
      card: z.string(),
      icon: z.enum(["building-2", "hard-hat", "key-round"]),
      steps: z.array(stepSchema).default([]),
      services: z.array(reference("services")).min(1)
    })
});

export const collections = {
  personnel,
  questions,
  services,
  audiences
};
