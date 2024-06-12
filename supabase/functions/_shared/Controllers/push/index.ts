import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.43.4";
import { PushNotification } from "../../Infrastructure/expo/PushNotification.ts";

export class PushController {
  constructor(private supabase: SupabaseClient) {}

  async push(req: Request) {
    const { title, body } = await req.json();

    if (
      !title ||
      typeof title !== "string" ||
      !body ||
      typeof body !== "string"
    ) {
      throw new Error("バリデーションに失敗した");
    }

    const expoPushToken = "ExponentPushToken[xSfk6KKbOlXjgWziKnFYgf]";

    try {
      const pushNotification = new PushNotification();

      const res = await pushNotification.push({
        expoPushToken,
        title,
        body,
      });

      return new Response(JSON.stringify(res), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
      return new Response("request failed");
    }
  }

  async pushToPartner(req: Request) {
    const { title, body } = await req.json();
    console.log({ title, body });
    console.log("credentials: ", req.credentials);
    console.log("headers: ", req.headers);

    if (
      !title ||
      typeof title !== "string" ||
      !body ||
      typeof body !== "string"
    ) {
      throw new Error("バリデーションに失敗した");
    }

    // const me = this.supabase.from("users").select().eq("id");

    // try {
    //   const pushNotification = new PushNotification();

    //   const res = await pushNotification.push({
    //     expoPushToken,
    //     title,
    //     body,
    //   });

    //   return new Response(JSON.stringify(res), {
    //     headers: { "Content-Type": "application/json" },
    //   });
    // } catch (error) {
    //   console.error(error);
    //   return new Response("request failed");
    // }
    //
    return new Response();
  }
}
