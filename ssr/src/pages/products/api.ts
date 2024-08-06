import type { APIRoute } from "astro";

// export const get: APIRoute = (ctx) => {
//   return {
//     body: JSON.stringify({
//       message: "Hello world",
//     }),
//   };
// };

// export const get: APIRoute = (ctx) => {
//   return new Response(
//     JSON.stringify({
//       message: "Hello world",
//     }),
//     {
//       status: 200,
//     }
//   );
// };

export const get: APIRoute = (ctx) => {
  // check for an Authorization header on the request
  const auth = ctx.request.headers.get("Authorization");
  // The user is unauthorised to get this resource
  if (!auth) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  return new Response(JSON.stringify({ message: "Hello world" }), {
    status: 200,
  });
};