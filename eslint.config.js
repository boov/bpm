import eslintPluginAstro from "eslint-plugin-astro";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Global ignores
  {
    ignores: ["**/dist/**", "**/.astro/**", "**/*.d.ts"]
  },

  // TypeScript files
  {
    files: ["**/*.ts", "**/*.js", "**/*.mjs"],
    extends: [...tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/ban-ts-comment": "off"
    }
  },

  // Astro files
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.astro"],
    rules: {}
  },

  // Import sorting (all source files)
  {
    files: ["**/*.ts", "**/*.js", "**/*.mjs", "**/*.astro"],
    plugins: {
      "simple-import-sort": simpleImportSort
    },
    rules: {
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn"
    }
  }
);
