import { defineCollection, z } from "astro:content";
import { personnel as personnelContent, testimonials as testimonialsContent, questions as questionsContent } from "@bpm/data";
import { file, glob } from "astro/loaders";

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
    return questionsContent.data.map(question => ({
      id: question.title.toLowerCase().replace(/\s+/g, "-"),
      ...question
    }));
  },
  schema: questionsContent.schema
});

const services = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/services" }),
  schema: ({ image }) =>
    z.object({
      status: statusSchema,
      order: z.number().optional().default(0),
      title: z.string(),
      description: z.string(),
      cover: image()
    })
});

const testimonials = defineCollection({
  loader: async () => {
    return testimonialsContent.data.map(testimonial => ({
      id: testimonial.author.toLowerCase().replace(/\s+/g, "-"),
      ...testimonial
    }));
  },
  schema: testimonialsContent.schema
});

export const collections = {
  personnel,
  questions,
  services,
  testimonials
};
