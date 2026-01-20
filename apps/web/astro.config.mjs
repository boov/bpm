// @ts-nocheck
import compress from "astro-compress";
import metaTags from "astro-meta-tags";
import pageInsight from "astro-page-insight";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: import.meta.env.DEV ? "http://localhost:4321" : "https://www.belgarum-property.co.uk",
  image: {
    domains: ["picsum.photos", "dummyimage.com"]
  },
  prefetch: {
    prefetchAll: true
  },
  redirects: {},
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
