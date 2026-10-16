import { z } from "astro/zod";

const data = [
  {
    title: "How do I pay my service charge?",
    group: "Paying your service charge",
    answer: [
      "You can [pay your service charge](/pay-online/) online by debit or credit card. Enter the amount on your service charge demand. If you have a question about your demand, contact your property manager."
    ]
  },
  {
    title: "Why has my service charge gone up?",
    group: "Paying your service charge",
    answer: [
      "The service charge follows the building's costs. If insurance, energy, contracts or repairs cost more, or the building needs to save more for future works, the service charge goes up. Your property manager can take you through the budget. Read more about [service charge budgets](/services/service-charge-budgets/)."
    ]
  },
  {
    title: "What is a reserve fund?",
    group: "Paying your service charge",
    answer: [
      "A reserve fund is money collected and saved for large future costs, such as a new roof. It is sometimes called a sinking fund. Saving each year means a smaller bill when the work is due."
    ]
  },
  {
    title: "What is a balancing charge?",
    group: "Paying your service charge",
    answer: [
      "If the year's spending was more than the budget, each leaseholder pays a balancing charge for their share of the difference. If spending was less, each leaseholder gets a balancing credit. Read more about [service charge accounts](/services/service-charge-accounts/)."
    ]
  },
  {
    title: "Where is my service charge money held?",
    group: "Paying your service charge",
    answer: [
      "In a designated trust account for your block or estate. The law says service charge money is held on trust for the leaseholders. It is kept separate from our own money."
    ]
  },
  {
    title: "Can I see the invoices behind my service charge?",
    group: "Paying your service charge",
    answer: [
      "Yes. You can ask in writing for a summary of the costs behind your service charge. Within 6 months of getting it, you can ask to inspect the invoices and receipts. Ask your property manager."
    ]
  },
  {
    title: "Who is my property manager?",
    group: "Repairs and your building",
    answer: [
      "Each building we manage has a dedicated property manager. If you don't know who looks after your building, call us on [0800 298 0069](tel:+448002980069) or email [management@bpmanagement.org](mailto:management@bpmanagement.org), and tell us your address."
    ]
  },
  {
    title: "How do I report a repair?",
    group: "Repairs and your building",
    answer: [
      "Contact your property manager by phone on [0800 298 0069](tel:+448002980069) or by email at [management@bpmanagement.org](mailto:management@bpmanagement.org). Tell them the address, what the problem is and where it is. Photos help. If you rent your flat, report repairs inside the flat to your landlord or letting agent."
    ]
  },
  {
    title: "What should I do in an emergency?",
    group: "Repairs and your building",
    answer: ["If there is a risk to life, such as a fire, call 999. If you smell gas, call the National Gas Emergency number on [0800 111 999](tel:+44800111999)."]
  },
  {
    title: "Who is responsible for repairs inside my flat?",
    group: "Repairs and your building",
    answer: [
      "Your lease sets this out. Usually, the leaseholder repairs the inside of their own flat. Whoever manages the building usually repairs the structure, the roof and the communal areas. That can be the freeholder (the owner of the building and the land), a resident management company (RMC) or a right to manage (RTM) company. Read more about [repairs and maintenance](/services/repairs-and-maintenance/)."
    ]
  },
  {
    title: "What is Section 20 consultation?",
    group: "Section 20 and major works",
    answer: [
      "If major works will cost any one leaseholder more than £250, the law says leaseholders must be consulted first. This is Section 20 consultation. Leaseholders are told about the works, can comment and can nominate a contractor. Read how [Section 20 consultation](/services/section-20-consultation/) works."
    ]
  },
  {
    title: "I have received a Section 20 notice. What should I do?",
    group: "Section 20 and major works",
    answer: [
      "Note the date the consultation period ends, and send any comments or contractor nominations in writing before then. Read [what Section 20 consultation involves](/services/section-20-consultation/)."
    ]
  },
  {
    title: "When do I pay for major works?",
    group: "Section 20 and major works",
    answer: [
      "That depends on your lease. Some or all of the cost may come from the reserve fund. Any extra is usually charged to leaseholders, in the shares the lease sets out. Read more about [major works](/services/major-works/)."
    ]
  },
  {
    title: "How do I get a leasehold sale pack?",
    group: "Selling your flat",
    answer: [
      "Your solicitor usually orders it from us. Tell them we manage your building, and give them our address for solicitor enquiries: [solicitorenquiries@bpmanagement.org](mailto:solicitorenquiries@bpmanagement.org). Read more about [leasehold sale packs](/services/leasehold-sale-packs/)."
    ]
  },
  {
    title: "How much does a leasehold sale pack cost, and how long does it take?",
    group: "Selling your flat",
    answer: ["The seller usually pays the fee. Depending on the lease, it may count as an administration charge."]
  },
  {
    title: "How do I make a complaint?",
    group: "Complaints",
    answer: [
      "Email [management@bpmanagement.org](mailto:management@bpmanagement.org) or write to our office, and tell us what went wrong. If you're still unhappy after our final response, you can take your complaint to The Property Ombudsman (TPO). You can also go to TPO if 8 weeks have passed since you first complained. [Read our complaints procedure](/complaints-procedure/)."
    ]
  },
  {
    title: "Do you have a minimum or maximum size of development?",
    group: "Working with us",
    answer: ["There's no set maximum. The developments we manage today range from blocks of 4 flats to a 22-floor high-rise."]
  },
  {
    title: "Which areas do you cover?",
    group: "Working with us",
    answer: ["Hampshire, Sussex, Dorset, London and the Home Counties. Our office is in Winchester, close to the M3."]
  },
  {
    title: "What is the difference between an RMC and an RTM company?",
    group: "Working with us",
    answer: [
      "An RMC is a company, usually owned by the leaseholders, that is responsible under the leases for managing the building or estate. An RTM company is set up by leaseholders to take over the management of their building from the freeholder, using a legal right. The freeholder still owns the building. Read [how we work with RMC and RTM directors](/who-we-work-with/rmc-and-rtm-directors/)."
    ]
  },
  {
    title: "How do we change managing agent?",
    group: "Working with us",
    answer: [
      "Check your current management agreement for its notice period. The board then decides when to give notice. Read [how we work with RMC and RTM directors](/who-we-work-with/rmc-and-rtm-directors/), or [request a management proposal](/contact/?type=new-management)."
    ]
  },
  {
    title: "Do you sell or let property?",
    group: "Working with us",
    answer: ["No. Block and estate management is all we do."]
  }
] satisfies Question[];

const schema = () =>
  z.object({
    title: z.string(),
    group: z.string(),
    answer: z.array(z.string()),
    order: z.number().default(0)
  });

export default { data, schema };

export type Question = z.input<ReturnType<typeof schema>>;
