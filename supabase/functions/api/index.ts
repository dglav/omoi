import { PushController } from "./_shared/Controllers/push/index.ts";

Deno.serve(async (req) => {
  const match = req.url.match("(?<=api).*");

  if (!match) {
    return new Response("no matching route", {
      status: 404,
      statusText: "Not Found",
    });
  }

  const resource = match[0];

  if (req.method === "POST" && resource === "/push") {
    const controller = new PushController();

    return controller.push(req);
  }

  return new Response("no matching route", {
    status: 404,
    statusText: "Not Found",
  });
});
