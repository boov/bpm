import type { SchemaContext } from "astro/content/config";
import { z } from "astro/zod";

const data = [
  { name: "Alan Gregory", role: "Company Director", since: 2011, group: "directors" },
  { name: "Olivia Gregory", role: "Operations Director", since: 2015, group: "directors" },
  { name: "Ryan Ashurst", role: "Senior Property and Team Management Leader", since: 2015, group: "property-managers" },
  { name: "Rob Barker", role: "Property Manager", since: 2011, group: "property-managers" },
  { name: "Jane Webber", role: "Property Manager", since: 2024, group: "property-managers" },
  { name: "Anna Gibbons", role: "Support Property Manager", since: 2024, group: "property-managers" },
  { name: "Joanne Savage", role: "Support Property Manager", since: 2020, group: "property-managers" },
  { name: "Chloe Dixon", role: "Support Property Manager", since: 2025, group: "property-managers" },
  { name: "Peter Colman", role: "Block Accounts and Bookkeeping", since: 2014, group: "accounts" },
  { name: "Nicola Culhane", role: "Company Bookkeeper Consultant", since: 2009, group: "accounts" },
  { name: "Andrea Scott", role: "Senior Administrator", since: 2014, group: "administration" },
  { name: "Chantelle Adams", role: "Administrator", since: 2020, group: "administration" },
  { name: "Marium Pirzada", role: "Administrator", since: 2024, group: "administration" }
] satisfies Person[];

const schema = ({ image }: SchemaContext) =>
  z.object({
    status: z.enum(["draft", "published"]).default("published").optional(),
    headshot: z.optional(image()),
    name: z.string(),
    role: z.string(),
    since: z.number().int(),
    group: z.enum(["directors", "property-managers", "accounts", "administration"])
  });

export default { data, schema };

export type Person = z.infer<ReturnType<typeof schema>>;
