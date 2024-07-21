import { SupabaseClient } from "@supabase/supabase-js";

import { PushController } from "../_shared/Controllers/push/index.ts";
import { createSupabaseClient } from "../_shared/Infrastructure/database/index.ts";

Deno.serve(async (req) => {
  const ctx: { supabaseClient?: SupabaseClient; user?: any } = {};
  const supabaseClient = createSupabaseClient(req);
  ctx.supabaseClient = supabaseClient;

  const response = await supabaseClient.auth.getUser();
  const userId = response.data.user?.id;

  if (userId) {
    const response = await supabaseClient
      .from("users")
      .select()
      .eq("id", userId);

    const users = response.data;
    if (users?.length) {
      ctx.user = users[0];
    }
  }

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

    await controller.push(req, ctx);
    return new Response();
  }

  if (req.method === "POST" && resource === "/pushToPartner") {
    const controller = new PushController(supabaseClient);

    await controller.pushToPartner(req, ctx);
    return new Response();
  }

  return new Response("no matching route", {
    status: 404,
    statusText: "Not Found",
  });
});
