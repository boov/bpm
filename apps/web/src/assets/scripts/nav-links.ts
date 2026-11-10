import { getAudiences, getServices, getTestimonials } from "@helpers";

export type NavLink = {
  label: string;
  href?: string;
  children?: NavLink[];
};

export const getNavLinks = async (): Promise<NavLink[]> => {
  const [services, audiences, testimonials] = await Promise.all([getServices(), getAudiences(), getTestimonials()]);

  return [
    {
      label: "Services",
      href: "/services/",
      children: services.map(service => ({ label: service.data.title, href: `/services/${service.id}/` }))
    },
    {
      label: "Who we work with",
      href: "/who-we-work-with/",
      children: audiences.map(audience => ({ label: audience.data.title, href: `/who-we-work-with/${audience.id}/` }))
    },
    { label: "About", href: "/about/" },
    ...(testimonials.length > 0 ? [{ label: "Testimonials", href: "/testimonials/" }] : []),
    { label: "FAQs", href: "/faqs/" }
  ];
};
