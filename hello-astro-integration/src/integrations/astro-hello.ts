import type { AstroIntegration } from "astro";
import kleur from "kleur";

// The Intl.DateTimeFormat object enables language-sensitive
// date and time formatting.
const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
const logServerMessage = (message: string) => {
  // � Get a new date string using the dateTimeFormat object
  const date = dateTimeFormat.format(new Date());
  // log to console with kleur colours and formatting
  console.log(`${kleur.gray(date)} ${kleur
    .bold()
    .cyan("[astro-hello-integration]")} ${message}
 `);
};

// Introduce a default export function that returns the Astro
// integration object.
export default function helloIntegration(): AstroIntegration {
  return {
    name: "astro-hello",
    hooks: {
      "astro:config:setup": (options) => {
        // A callback function to inject a string of JavaScript content onto every page.
        options.injectScript("page", `import '/src/scripts/globalLog.js'`);

        logServerMessage("Injected script");
      },
    },
  };
}
