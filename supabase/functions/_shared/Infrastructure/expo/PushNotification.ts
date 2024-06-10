type CreatePushNotificationInput = {
  expoPushToken: string;
  title: string;
  body: string;
};

export class PushNotification {
  push({ expoPushToken, title, body }: CreatePushNotificationInput) {
    return fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: expoPushToken,
        title,
        body,
      }),
    }).then((res) => res.json());
  }
}
