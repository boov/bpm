import { z } from "astro:content";

const data = [
  {
    name: "John Doe",
    role: "Director",
    contact: {
      email: "john@doe.co.uk",
      phone: "07890123456"
    }
  },
  {
    name: "Matthew Booth",
    role: "IT & Systems",
    contact: {
      email: "hello@boov.co.uk"
    }
  }
] satisfies Person[];

const schema = ({ image }) =>
  z.object({
    status: z.enum(["draft", "published"]).default("published").optional(),
    headshot: z.optional(image()),
    name: z.string(),
    role: z.string(),
    contact: z.object({
      email: z.string().optional(),
      phone: z.string().optional()
    })
  });

export default { data, schema };

export type Person = z.infer<ReturnType<typeof schema>>;
