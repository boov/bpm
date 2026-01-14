import { getCollection } from "astro:content";

export const toTelHref = (input?: string) => {
  if (!input) return undefined;

  const cleaned = input.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "");

  if (cleaned.startsWith("00")) return `tel:+${cleaned.slice(2)}`;
  if (cleaned.startsWith("0")) return `tel:+44${cleaned.slice(1)}`;
  return `tel:${cleaned}`;
};

export const dayOrdinal = (number: number): string => {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const getDateParts = (date: Date): [string, string, string] => {
  const [day, month, year] = date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
    .split(" ");

  return [day, month, year];
};

export const broadDateFormat = (date: Date): string => {
  const [day, month, year] = getDateParts(date);
  return `${month} ${year}`;
};

export const shortDateFormat = (date: Date): string => {
  const [day, month, year] = getDateParts(date);
  return `${day}${dayOrdinal(Number(day))} ${month}`;
};

export const longDateFormat = (date: Date): string => {
  const [day, month, year] = getDateParts(date);
  return `${day}${dayOrdinal(Number(day))} ${month} ${year}`;
};

export const getPersonnel = async () => await getCollection("personnel");

export const getQuestions = async () => (await getCollection("questions")).sort((a, b) => a.data.title.localeCompare(b.data.title));

export const getQuestionsByGroup = async () => {
  const posts = await getQuestions();
  return Object.entries(
    posts.reduce((acc: { [key: string]: any[] }, post) => {
      const group = post.data.group;
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(post);
      return acc;
    }, {})
  ).sort((a, b) => Number(b[0]) - Number(a[0]));
};

export const getServices = async () =>
  (await getCollection("services"))
    .filter(service => service.data.status === "published")
    .sort((a, b) => a.data.order.valueOf() - b.data.order.valueOf())
    .sort((a, b) => a.data.title.localeCompare(b.data.title));

export const getTestimonials = async () => await getCollection("testimonials");
