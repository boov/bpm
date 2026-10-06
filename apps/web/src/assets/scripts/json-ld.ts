export const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
