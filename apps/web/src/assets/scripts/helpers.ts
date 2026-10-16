import { getCollection } from "astro:content";

export const getPersonnel = async () => (await getCollection("personnel")).filter(person => person.data.status === "published");

export const getQuestions = async () => (await getCollection("questions")).sort((a, b) => a.data.order - b.data.order);

export const getQuestionsByGroup = async () => {
  const groups = new Map<string, Awaited<ReturnType<typeof getQuestions>>>();
  for (const question of await getQuestions()) groups.set(question.data.group, [...(groups.get(question.data.group) ?? []), question]);
  return [...groups.entries()];
};

export const getServices = async () =>
  (await getCollection("services")).filter(service => service.data.status === "published").sort((a, b) => a.data.order.valueOf() - b.data.order.valueOf());

export const getAudiences = async () => (await getCollection("audiences")).filter(audience => audience.data.status === "published").sort((a, b) => a.data.order - b.data.order);
