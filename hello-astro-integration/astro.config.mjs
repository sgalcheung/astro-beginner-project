import { defineConfig } from "astro/config";
import astroHello from "./src/integrations/astro-hello";
import lifecycleLogs from "./src/integrations/lifecycle-logs";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  // 👀 invoke the imported astroHello function in the list
  integrations: [astroHello(), lifecycleLogs()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
