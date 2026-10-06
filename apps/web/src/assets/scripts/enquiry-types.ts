export const enquiryTypes = [
  { value: "new-management", label: "New management for a building" },
  { value: "new-development", label: "A new development" },
  { value: "service-charge", label: "Service charge or accounts" },
  { value: "repairs", label: "Repairs and maintenance" },
  { value: "leasehold-sale-pack", label: "Leasehold sale pack" },
  { value: "fire-safety", label: "Fire and building safety" },
  { value: "section-20", label: "Section 20 or major works" },
  { value: "company-secretarial", label: "Company secretary" },
  { value: "complaint", label: "A complaint" },
  { value: "general", label: "Something else" }
] as const;

export type EnquiryType = (typeof enquiryTypes)[number]["value"];

export const presetEnquiryType = (search: string): EnquiryType | "" => {
  const type = new URLSearchParams(search).get("type");
  return enquiryTypes.find(entry => entry.value === type)?.value ?? "";
};

export const needsPropertyAddress = (type: string): boolean => type !== "" && type !== "new-development" && type !== "general";
