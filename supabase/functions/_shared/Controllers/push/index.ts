import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.43.4";

import { PushNotification } from "../../Infrastructure/expo/PushNotification.ts";

export class PushController {
  constructor(private supabase: SupabaseClient) {}

  async push(req: Request, ctx: any) {
    const { title, body } = await req.json();
    const { user } = ctx;

    console.log({ user });

    if (
      !title ||
      typeof title !== "string" ||
      !body ||
      typeof body !== "string"
    ) {
      throw new Error("バリデーションに失敗した");
    }

    const expoPushToken = user.expo_push_token;

    if (!expoPushToken) {
      return;
    }

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
      return new Response("push request failed");
    }
  }

  async pushToPartner(req: Request, ctx: any) {
    const { title, body } = await req.json();
    const { user } = ctx;

    if (
      !title ||
      typeof title !== "string" ||
      !body ||
      typeof body !== "string"
    ) {
      throw new Error("バリデーションに失敗した");
    }

    let partner;

    const response = await this.supabase
      .from("users")
      .select()
      .eq("id", user.partner_user_id);

    const users = response.data;
    if (users) {
      partner = users[0];
    }

    console.log({ user, partner });

    const expoPushToken = partner.expo_push_token;

    if (!expoPushToken) {
      return;
    }

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
      return new Response("push request failed");
    }
  }
}
