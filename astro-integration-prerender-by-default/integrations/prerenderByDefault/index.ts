import type { AstroIntegration } from "astro";
import type { Config, ValidationResult } from "./types";
import { isValidAstroConfig } from "./isValidAstroConfig";
import { log } from "./log";

import { injectVitePlugin } from "./injectVitePlugin";

let resolveValidationResult: (value: ValidationResult) => void;
let validationResultPromise = new Promise<ValidationResult>((resolve) =>
{
  resolveValidationResult = resolve;
});

/**
 * The goal of our custom integration is to flip the default hybrid rendering behaviour of Astro.
 * By default, with an output: server in our configuration, all pages are assumed to be server-rendered, 
 * and we must explicitly add `export const prerender = true` to our static pages.
 * We want to achieve a different behaviour for cases when we have more static pages, i.e.,
 * - By default, with output: server in our configuration, render all pages statically at build time, i.e., prerender by default.
 * - Add `export const prerender = false` to render a page server-side explicitly.
 */
export default function prerenderByDefault(config: Config): AstroIntegration {
  return {
    name: "astro-prerender-by-default",
    hooks: {
      "astro:config:setup"(options) {
        options.updateConfig({
          vite: {
            plugins: [injectVitePlugin(config, validationResultPromise)],
          },
        });
      },
      
      "astro:config:done"(options) {
        // get the 'silent' integration config property, default to false.
        const silent = config?.silent ?? false;

        // validate the resolved project configuration
        const validationResult = isValidAstroConfig(options.config);

        // resolve the validation promise
        resolveValidationResult(validationResult);

        /**
         * Leverage Typescript exhaustive check to handle all
         * validation types and log messages where appropriate
         */
        switch (validationResult.type) {
          case "invalid_adapter_config":
            log({
              silent,
              message: `Adapter not set for hybrid rendering. Skipping`,
            });
            return;

          case "invalid_output_config":
            log({
              silent,
              message: `Config output not set to "server". Skipping`,
            });
            return;

          case "success":
            return;

          default:
            const _exhaustiveCheck: never = validationResult;
            return _exhaustiveCheck;
        }
      },
    },
  };
}
