const officeAddress = {
  street: "Old Manor Nursery, Kilham Lane",
  locality: "Winchester",
  region: "Hampshire",
  postcode: "SO22 5QD"
} as const;

const phoneE164 = "+448002980069";

// Rating and count are copied by hand from the Google profile; update both together.
const googleReviews: { url: string; rating: number | null; count: number | null } = {
  url: "https://g.page/r/CecX_dMXFD8vEAI",
  rating: 3.5,
  count: 27
};

export const site = {
  brand: "Belgarum Property Management",
  legalName: "Belgarum Property Management Limited",
  strapline: "Block and estate management since 1989",
  founded: "1989",
  phone: "0800 298 0069",
  phoneE164,
  phoneHref: `tel:${phoneE164}`,
  email: "management@bpmanagement.org",
  solicitorEmail: "solicitorenquiries@bpmanagement.org",
  officeAddress,
  office: Object.values(officeAddress).join(", "),
  areasServed: ["Hampshire", "Sussex", "Dorset", "London", "Home Counties"],
  hours: "Monday to Thursday, 9am to 5pm; Friday, 9am to 4.30pm",
  googleReviews,
  companyNumber: "07580603",
  registeredOffice: "Highland House, Mayflower Close, Chandlers Ford, Hampshire, SO53 4AR",
  social: {
    facebook: "https://www.facebook.com/belgarumpropertymanagementltd",
    instagram: "https://www.instagram.com/belgarumpropertymanagementltd",
    linkedin: "https://www.linkedin.com/company/belgarumpropertymanagementltd"
  }
} as const;
