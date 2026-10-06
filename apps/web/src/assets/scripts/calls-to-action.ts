export const callKeys = ["proposal", "development", "residents", "sale-pack", "pay"] as const;

export type CallKey = (typeof callKeys)[number];
export type BandVariant = "proposal" | "development" | "residents";

export const calls: Record<CallKey, { label: string; href: string }> = {
  proposal: { label: "Request a management proposal", href: "/contact?type=new-management" },
  development: { label: "Talk to us about a new development", href: "/contact?type=new-development" },
  residents: { label: "Contact your property manager", href: "/contact" },
  "sale-pack": { label: "Order a leasehold sale pack", href: "#how-it-works" },
  pay: { label: "Pay your service charge", href: "/pay-online" }
};

export const bandFor = (key: CallKey): BandVariant => (key === "proposal" || key === "development" ? key : "residents");
