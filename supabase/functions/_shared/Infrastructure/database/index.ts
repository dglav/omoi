import { HonoRequest } from "hono";
import { createClient } from "jsr:@supabase/supabase-js@^2.44.4";

export const createSupabaseClient = (req: HonoRequest) =>
  createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: { headers: { Authorization: req.header("Authorization")! } },
    },
  );
