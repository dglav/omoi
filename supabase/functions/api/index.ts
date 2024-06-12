import { PushController } from "../_shared/Controllers/push/index.ts";
import { createSupabaseClient } from "../_shared/Infrastructure/database/index.ts";

Deno.serve(async (req) => {
  const supabaseClient = createSupabaseClient(req);

  const match = req.url.match("(?<=api).*");

  if (!match) {
    return new Response("no matching route", {
      status: 404,
      statusText: "Not Found",
    });
  }

  const resource = match[0];

  if (req.method === "POST" && resource === "/push") {
    const controller = new PushController(supabaseClient);

    await controller.push(req);
    return new Response();
  }

  if (req.method === "POST" && resource === "/pushToPartner") {
    const controller = new PushController(supabaseClient);

    await controller.pushToPartner(req);
    return new Response();
  }

  return new Response("no matching route", {
    status: 404,
    statusText: "Not Found",
  });
});
