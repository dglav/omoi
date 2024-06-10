import { ReminderController } from "../_shared/Controllers/Reminder/index.ts";
import { createSupabaseClient } from "../_shared/Infrastructure/database/index.ts";

Deno.serve(async (req) => {
  const supabaseClient = createSupabaseClient(req);

  try {
    const body = await req.json();
    const time = new Date(body.time);

    if (!time) {
      return new Response("エラー", {
        headers: {
          "content-type": "text/html",
        },
        status: 400,
        statusText: "timeがリクエストに入っていません",
      });
    }

    const controller = new ReminderController(supabaseClient);
    await controller.pushIfScheduled(time);

    return new Response("成功", {
      headers: {
        "content-type": "text/html",
      },
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("エラー", {
      headers: {
        "content-type": "text/html",
      },
      status: 500,
      statusText: error.message,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-reminders' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
