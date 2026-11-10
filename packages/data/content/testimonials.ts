import type { SchemaContext } from "astro/content/config";
import { z } from "astro/zod";

const data: Testimonial[] = [
  {
    quote: "Our property manager knows the building inside out and always picks up the phone. The board finally feels on top of the accounts.",
    name: "Jane Smith",
    avatar: "@assets/images/testimonials/sample-js.jpg",
    role: "RMC director",
    development: "Winchester",
    permissionDate: "2026-11-10"
  },
  {
    quote: "Clear, calm and organised. Exactly what a volunteer board needs.",
    name: "Sarah Jones",
    role: "RTM company director",
    development: "Southampton",
    permissionDate: "2026-11-10"
  },
  {
    quote: "Handing our blocks to Belgarum took the day-to-day work off our hands. Reporting is regular and easy to follow.",
    name: "David Brown",
    avatar: "@assets/images/testimonials/sample-db.jpg",
    role: "Freeholder",
    permissionDate: "2026-11-10"
  },
  {
    quote:
      "Our year-end accounts now arrive on time, and the property manager walks the board through every line before we sign them off. When we needed a Section 20 consultation for new windows, they explained each notice, kept leaseholders informed and made sure nothing was missed. It is the first time in years the board has felt properly supported.",
    name: "Priya Patel",
    avatar: "@assets/images/testimonials/sample-pp.jpg",
    role: "RMC company secretary",
    development: "Eastleigh",
    permissionDate: "2026-11-10"
  },
  {
    quote: "Responsive, honest and good value.",
    name: "Mark Taylor",
    avatar: "@assets/images/testimonials/sample-mt.jpg",
    role: "Private landlord",
    development: "Basingstoke",
    permissionDate: "2026-11-10"
  },
  {
    quote:
      "We moved to Belgarum after a difficult few years with our previous agent. The handover was smooth, the arrears were chased promptly, and the reserve fund is finally being built up properly. Leaseholders have noticed the difference too.",
    name: "Helen Clarke",
    role: "RMC director",
    development: "Romsey",
    permissionDate: "2026-11-10"
  },
  {
    quote: "They got involved early in planning the management of our new development, which saved us problems at handover.",
    name: "Raj Kumar",
    avatar: "@assets/images/testimonials/sample-rk.jpg",
    role: "Development director",
    permissionDate: "2026-11-10"
  },
  {
    quote:
      "Fire risk assessments, insurance renewals and contractor checks all happen without us having to ask. As directors we can see what is due and when, and we get a straight answer whenever we ring the office.",
    name: "Tom Evans",
    role: "RTM company director",
    development: "Chichester",
    permissionDate: "2026-11-10"
  }
];

const schema = ({ image }: SchemaContext) =>
  z.object({
    status: z.enum(["draft", "published"]).default("published").optional(),
    avatar: z.optional(image()),
    quote: z.string(),
    name: z.string(),
    role: z.string(),
    development: z.string().optional(),
    permissionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
  });

export default { data, schema };

type Testimonial = Omit<z.input<ReturnType<typeof schema>>, "avatar"> & { avatar?: string };
