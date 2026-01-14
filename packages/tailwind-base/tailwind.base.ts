/** @type {import("tailwindcss").Config} */

import { designSystem, magicTypography } from "@bpm/design-system";

export default {
  content: ["../"],
  plugins: [designSystem],
  theme: {
    fontSize: {
      ...magicTypography(
        {
          h0: 7,
          h1: 6,
          h2: 5,
          h3: 4,
          h4: 3,
          h5: 2,
          h6: 1,
          h7: 0
        },
        1.25,
        [1.05, 1.45]
      ),
      ...magicTypography(
        {
          "9xl": 10,
          "8xl": 9,
          "7xl": 8,
          "6xl": 7,
          "5xl": 6,
          "4xl": 5,
          "3xl": 4,
          "2xl": 3,
          xl: 2,
          lg: 1,
          base: 0,
          sm: -1,
          xs: -2
        },
        1.15,
        [1.1, 1.65]
      )
    }
  }
};
