import { extendTailwindMerge } from "tailwind-merge";

const spacing = ["1c", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "11c", "12c", "13c", "14c", "15c", "16c"];

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: [...spacing]
    },
    classGroups: {
      "font-size": [{ text: ["h0", "h1", "h2", "h3", "h4", "h5", "h6", "h7"] }],
      "font-family": [{ font: ["title"] }],
      "grid-cols": [{ "grid-cols": ["container"] }]
    }
  }
});

const twSort = (value: any) => value;

export default twMerge;

export { twMerge, twSort };
