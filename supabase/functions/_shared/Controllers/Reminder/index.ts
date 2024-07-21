import type { SupabaseClient } from "@supabase/supabase-js";

import { ReminderRepository } from "../../Infrastructure/database/repositories/reminder/index.ts";
import { UserRepository } from "../../Infrastructure/database/repositories/user/index.ts";
import { PushNotification } from "../../Infrastructure/expo/PushNotification.ts";

export class ReminderController {
  constructor(private supabase: SupabaseClient) {}

  async pushIfScheduled(time: Date) {
    const reminderRepository = new ReminderRepository(this.supabase);
    // get all reminders that are set for the appropriate time frame
    const hour =
      time.getHours() + 9 > 23 ? time.getHours() + 9 - 24 : time.getHours() + 9;
    const minute = time.getMinutes();
    const reminders = await reminderRepository.getAllAtTime(hour, minute);

    if (!reminders.length) {
      return;
    }

    // get the user data for each reminder
    const userIds = reminders.map((reminder) => reminder.user_id);

    const userRepository = new UserRepository(this.supabase);
    const users = await userRepository.getUsersFromIdList(userIds);

    if (users.length === 0) {
      return;
    }

    const pushTokens = users.map((user) => user.expo_push_token);

    if (!pushTokens.length) {
      return;
    }

    // push to each user
    const pusher = new PushNotification();

    const pushPromises = pushTokens.map((pushToken) => {
      console.log("push to: ", pushToken);
      pusher.push({
        expoPushToken: pushToken,
        title: "感情を記録しよう！",
        body: "omoiの時間です！感情を記録しましょう！",
      });
    });

    const results = await Promise.allSettled(pushPromises);

    results.forEach(
      (result) =>
        result.status === "rejected" &&
        console.error("push failed reason: ", result.reason),
    );
  }
}
