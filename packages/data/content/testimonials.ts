import { z } from "astro:content";

const data = [
  {
    author: "Robert Smith",
    note: "Director of Smith Properties Ltd.",
    content:
      "Laboris sunt aliquip eiusmod labore laboris labore occaecat. Non aliquip esse nostrud nisi mollit in exercitation sint. Non id fugiat tempor. Culpa sit nostrud nostrud ut nostrud nisi sunt fugiat dolor commodo. Ut tempor esse culpa commodo Lorem in cillum cillum eu irure dolor dolor velit cupidatat. Ullamco consectetur enim sit ad eiusmod."
  },
  {
    author: "Matthew Booth",
    note: "Matt Boov Web Design",
    content:
      "Proident adipisicing minim nulla nisi tempor ut voluptate deserunt pariatur in. Nisi aute id qui cupidatat et est fugiat esse fugiat aliquip officia ipsum. Non cupidatat labore nostrud Lorem adipisicing elit quis sint nisi consequat. Sit ea anim fugiat qui sunt consequat fugiat laboris fugiat enim magna ad officia cillum."
  }
] satisfies Testimonial[];

const schema = ({ image }) =>
  z.object({
    status: z.enum(["draft", "published"]).default("published").optional(),
    author: z.string(),
    note: z.string(),
    content: z.string(),
    avatar: z.optional(image())
  });

export default { data, schema };

export type Testimonial = z.infer<ReturnType<typeof schema>>;
