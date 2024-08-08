import type { Plugin } from "vite";
import type { Config, ValidationResult } from "./types";
import { getVitePlugin } from "./getVitePlugin";

export const injectVitePlugin = async (
  config: Config,
  validationResultPromise: Promise<ValidationResult>
): Promise<Plugin | null> => {
  // await the validation result promise before continuing
  const validationResult = await validationResultPromise;

  // exit if the validation result value is false
  if (!validationResult.value) {
    return null;
  }

  // Our prerender plugin to be fleshed out (TBD)
  //   const prerenderByDefaultPlugin = { name: "" };
  const prerenderByDefaultPlugin = getVitePlugin(config);

  return {
    // name follows the pattern vite-plugin-${framework}-${feature}
    name: "vite-plugin-astro-inject-default-prerender",
    configResolved: (options) => {
      // Grab the Vite plugins in the resolved config
      // and add our plugin as the first in the list
      (options.plugins as Plugin[]).unshift(prerenderByDefaultPlugin);
    },
  };
};
