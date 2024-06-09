import { PushNotification } from "../../Infrastructure/expo/PushNotification.ts";

export class PushController {
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

      const res = await pushNotification.create({
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
}
