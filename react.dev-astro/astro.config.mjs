import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

import tailwind from "@astrojs/tailwind";

import AutoImport from "astro-auto-import";

// https://astro.build/config
export default defineConfig({
  integrations: [
    // Pass AutoImport in the integrations array
    AutoImport({
      imports: [
        /**
         * Generates:
         * import Intro from './src/components/Intro.astro';
         */
        "./src/components/Intro.astro",
        "./src/components/Note.astro",
        /**
         * Generates:
         * import { YouTube } from 'astro-embed';
         */
        { "astro-embed": ["YouTube"] },
      ],
    }),
    react(),
    mdx(),
    tailwind(),
  ],
});