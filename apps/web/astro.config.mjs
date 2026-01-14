// @ts-nocheck
import compress from "astro-compress";
import metaTags from "astro-meta-tags";
import pageInsight from "astro-page-insight";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: import.meta.env.DEV ? "http://localhost:8080" : "https://www.belgarum-property.co.uk",
  image: {
    domains: ["picsum.photos"]
  },
  prefetch: {
    prefetchAll: true
  },
  redirects: {},
  server: { port: 8080 },
  integrations: [
    compress({
      CSS: false,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true
    }),
    metaTags(),
    pageInsight(),
    sitemap({
      filter: page => !["https://www.belgarum-property.co.uk/contact/thanks/", "https://www.belgarum-property.co.uk/contact/submitting/"].some(url => page.startsWith(url))
    })
  ],
  devToolbar: {
    enabled: true
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
