import type { APIRoute } from "astro";

// Handle client GET requests
// https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes
// GET must be capital
// path /api/products/[id] eg, http://localhost:4321/api/products/astro-book-001
// query parameters /api/products/astro-book-001?version=2&publishedDate=2023-06-12
export const GET: APIRoute = async (ctx) => {
  // Get the product ID
  const productId = ctx.params.id;

  // retrieve relevant search parameters, aka URL query parameters
  const searchParams = ctx.url.searchParams;
  const version = searchParams.get("version");
  const publishedDate = searchParams.get("publishedDate");

  try {
    const response = await fetch("https://fakestoreapi.com/products/1");
    const data = await response.json();
    return new Response(
      JSON.stringify({
        ...data,
        // Add the ID in the response body
        id: productId,
        version,
        publishedDate,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "An error occurred.",
      }),
      {
        status: 500,
      }
    );
  }
};

/**
 * Handle "DELETE" requests
 * "delete" is a reserved word in Javascript. Hence, the function name "del"
 */
export const DELETE: APIRoute = async (ctx) => {
  const productId = ctx.params.id;
  try {
    const response = await fetch("https://fakestoreapi.com/products/1", {
      method: "DELETE",
    });
    const data = await response.json();
    return new Response(
      JSON.stringify({
        id: productId,
        message: "deleted",
        title: data.title,
      }),
      {
        status: 202,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "An error occurred",
      }),
      {
        status: 500,
      }
    );
  }
};

/**
 * Handle "POST" requests
 */
export const POST: APIRoute = async (ctx) => {
  // Get the POST body data
  const data = await ctx.request.json();
  return new Response(
    JSON.stringify({
      message: "Created",
      data,
    })
  );
};

/**
 * Handle ALL requests
 * This will match unhandled methods in our implementation, such as PATCH requests.
 */
export const ALL: APIRoute = async (ctx) => {
  // Get the request method
  const method = ctx.request.method;
  // Return a response
  return new Response(
    JSON.stringify({
      method,
      message: "Unsupported HTTP method",
    }),
    {
      status: 501, // unsupported
    }
  );
};
