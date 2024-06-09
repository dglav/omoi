import type { SupabaseClient } from "https://esm.sh/v135/@supabase/supabase-js@2.43.4/dist/module/index.js";

import { ReminderRepository } from "../../Infrastructure/database/repositories/reminder/index.ts";
import { UserRepository } from "../../Infrastructure/database/repositories/user/index.ts";
import { PushNotification } from "../../Infrastructure/expo/PushNotification.ts";

export class ReminderController {
  constructor(private supabase: SupabaseClient) {}

  async pushIfScheduled(time: Date) {
    const reminderRepository = new ReminderRepository(this.supabase);
    // get all reminders that are set for the appropriate time frame
    const hour = time.getHours();
    const minute = time.getMinutes();
    const reminders = await reminderRepository.getAllAtTime(hour, minute);

    if (reminders.error) {
      throw reminders.error;
    }

    if (!reminders.count) {
      return;
    }

    // get the user data for each reminder
    const userIds = reminders.data.map((reminder) => reminder.userId);

    if (!userIds.length) {
      return;
    }

    const userRepository = new UserRepository(this.supabase);
    const users = await userRepository.getUsersFromIdList(userIds);

    if (users.error) {
      throw users.error;
    }

    if (!users.count) {
      return;
    }

    const pushTokens = users.data.map((user) => user.expo_push_token);

    if (!pushTokens.length) {
      console.log("Scheduled a notification but there are no push tokens set");
      return;
    }

    // push to each user
    const pusher = new PushNotification();

    const pushPromises = pushTokens.map((pushToken) => {
      pusher.create({
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
