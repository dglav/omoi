import { SupabaseClient } from "@supabase/supabase-js";
import { HTTPException } from "hono/http-exception";
import { Hono } from "npm:hono@^4.5.1";

import { PushController } from "../_shared/Controllers/push/index.ts";
import { createSupabaseClient } from "../_shared/Infrastructure/database/index.ts";

type Variables = {
  ctx: {
    supabaseClient: SupabaseClient;
    user: any;
  };
};

const app = new Hono<{ Variables: Variables }>().basePath("/api");

app.use("*", async (c, next) => {
  console.log("url: ", c.req.url);
  await next();
});

app.use("/push/*", async (c, next) => {
  const supabaseClient = createSupabaseClient(c.req);

  const authUserResponse = await supabaseClient.auth.getUser();
  const userId = authUserResponse.data.user?.id;

  if (!userId) {
    c.set("ctx", { supabaseClient, user: undefined });
    await next();
  }

  const userResponse = await supabaseClient
    .from("users")
    .select()
    .eq("id", userId);
  const users = userResponse.data;
  const user = users?.length ? users[0] : undefined;

  c.set("ctx", { supabaseClient, user });

  await next();
});

app.get("/", (c) => c.text("Hello Deno!"));

app.get("/hello", (c) => c.text("Hello. 以上。"));

app.post("/push/toRequestor", async (c) => {
  const ctx = c.get("ctx");
  const controller = new PushController(ctx.supabaseClient);

  await controller.push(c.req, ctx);
  return new Response();
});

app.post("/push/pushToPartner", async (c) => {
  const ctx = c.get("ctx");
  const controller = new PushController(ctx.supabaseClient);

  await controller.pushToPartner(c.req, ctx);
  return new Response();
});

app.notFound((c) => c.json({ message: `Not Found ${c.req.url}` }, 404));

Deno.serve({ port: 54321 }, app.fetch);

// Deno.serve({ port: 54321 }, async (req) => {
//   const ctx: { supabaseClient?: SupabaseClient; user?: any } = {};
//   const supabaseClient = createSupabaseClient(req);
//   ctx.supabaseClient = supabaseClient;
//
//   const response = await supabaseClient.auth.getUser();
//   const userId = response.data.user?.id;
//
//   if (userId) {
//     const response = await supabaseClient
//       .from("users")
//       .select()
//       .eq("id", userId);
//
//     const users = response.data;
//     if (users?.length) {
//       ctx.user = users[0];
//     }
//   }
//
//   const match = req.url.match("(?<=api).*");
//
//   if (!match) {
//     return new Response("no matching route", {
//       status: 404,
//       statusText: "Not Found",
//     });
//   }
//
//   const resource = match[0];
//
//   if (req.method === "GET" && resource === "") {
//     return new Response("root");
//   }
//
//   if (req.method === "POST" && resource === "/push") {
//     const controller = new PushController(supabaseClient);
//
//     await controller.push(req, ctx);
//     return new Response();
//   }
//
//   if (req.method === "POST" && resource === "/pushToPartner") {
//     const controller = new PushController(supabaseClient);
//
//     await controller.pushToPartner(req, ctx);
//     return new Response();
//   }
//
//   return new Response("no matching route", {
//     status: 404,
//     statusText: "Not Found",
//   });
// });
