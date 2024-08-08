import { defineConfig } from 'astro/config';
import prerenderByDefault from './integrations/prerenderByDefault';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [prerenderByDefault()],
  adapter: cloudflare()
});