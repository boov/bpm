import { getAudiences, getServices } from "@helpers";

export type NavLink = {
  label: string;
  href?: string;
  activePath?: string;
  allLabel?: string;
  children?: NavLink[];
};

export const getNavLinks = async (): Promise<NavLink[]> => {
  const [services, audiences] = await Promise.all([getServices(), getAudiences()]);

  return [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "/services",
      allLabel: "All services",
      children: services.map(service => ({ label: service.data.title, href: `/services/${service.id}` }))
    },
    {
      label: "Who we work with",
      activePath: "/who-we-work-with",
      children: audiences.map(audience => ({ label: audience.data.title, href: `/who-we-work-with/${audience.id}` }))
    },
    { label: "About", href: "/about" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" }
  ];
};
