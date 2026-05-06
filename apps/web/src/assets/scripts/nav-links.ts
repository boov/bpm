import { getServices } from "@helpers";

export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const getNavLinks = async (): Promise<NavLink[]> => {
  const services = await getServices();

  return [
    { label: "Home", href: "/" },
    {
      label: "Our Services",
      href: "/services",
      children: services.map(s => ({ label: s.data.title, href: `/services/${s.id}` }))
    },
    { label: "About Us", href: "/about" },
    { label: "FAQs", href: "/faqs" }
  ];
};
