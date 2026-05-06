import { z } from "astro/zod";

const data = [
  {
    title: "Do you have a cut off of the size of development you'll take on?",
    group: "Our Services",
    answer: [
      "BPM have a vast portfolio ranging from blocks of flats with 4 unitholders to a high rise with 22 floors, we pride ourselves on having a versatile team able to care for all sized developments in our management."
    ]
  }
] satisfies Question[];

const schema = () =>
  z.object({
    title: z.string(),
    group: z.string(),
    answer: z.array(z.string())
  });

export default { data, schema };

export type Question = z.infer<ReturnType<typeof schema>>;
