import { z } from "astro:content";

const data = [
  {
    title: "Occaecat duis pariatur culpa eiusmod.",
    group: "Our Services",
    answer: [
      "Excepteur in cillum ipsum laborum deserunt et dolor labore. Reprehenderit aliqua voluptate est nisi eu veniam nulla amet fugiat veniam. Aliquip occaecat et culpa commodo. Minim exercitation voluptate ex id sunt qui minim ea enim duis. Laboris exercitation commodo aliqua ex commodo nulla magna excepteur nostrud elit esse ad deserunt non ut. Proident reprehenderit magna minim id irure ipsum est proident tempor aliqua laboris exercitation."
    ]
  },
  {
    title: "Aute in duis ad occaecat excepteur sit magna quis duis ea cillum mollit.",
    group: "Our Services",
    answer: [
      "Velit amet ex ea. Aute nulla adipisicing laborum laborum tempor ex ullamco. Consectetur ut nostrud mollit mollit. Ea et officia voluptate cupidatat esse ex. Dolore veniam sit consequat commodo. Fugiat sint dolore fugiat id cupidatat labore.",
      "Excepteur in cillum ipsum laborum deserunt et dolor labore. Reprehenderit aliqua voluptate est nisi eu veniam nulla amet fugiat veniam. Aliquip occaecat et culpa commodo. Minim exercitation voluptate ex id sunt qui minim ea enim duis. Laboris exercitation commodo aliqua ex commodo nulla magna excepteur nostrud elit esse ad deserunt non ut. Proident reprehenderit magna minim id irure ipsum est proident tempor aliqua laboris exercitation."
    ]
  },
  {
    title: "Veniam deserunt commodo reprehenderit dolor cillum et in est.",
    group: "Payment and Terms",
    answer: [
      "Excepteur in cillum ipsum laborum deserunt et dolor labore. Reprehenderit aliqua voluptate est nisi eu veniam nulla amet fugiat veniam. Aliquip occaecat et culpa commodo. Minim exercitation voluptate ex id sunt qui minim ea enim duis. Laboris exercitation commodo aliqua ex commodo nulla magna excepteur nostrud elit esse ad deserunt non ut. Proident reprehenderit magna minim id irure ipsum est proident tempor aliqua laboris exercitation."
    ]
  },
  {
    title: "Nulla laboris labore magna quis fugiat eiusmod commodo eu ut commodo ex laborum excepteur laboris.",
    group: "Payment and Terms",
    answer: [
      "Velit amet ex ea. Aute nulla adipisicing laborum laborum tempor ex ullamco. Consectetur ut nostrud mollit mollit. Ea et officia voluptate cupidatat esse ex. Dolore veniam sit consequat commodo. Fugiat sint dolore fugiat id cupidatat labore.",
      "Excepteur in cillum ipsum laborum deserunt et dolor labore. Reprehenderit aliqua voluptate est nisi eu veniam nulla amet fugiat veniam. Aliquip occaecat et culpa commodo. Minim exercitation voluptate ex id sunt qui minim ea enim duis. Laboris exercitation commodo aliqua ex commodo nulla magna excepteur nostrud elit esse ad deserunt non ut. Proident reprehenderit magna minim id irure ipsum est proident tempor aliqua laboris exercitation."
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
