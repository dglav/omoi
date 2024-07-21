import type { SupabaseClient } from "@supabase/supabase-js";
export class ReminderRepository {
  constructor(private supabase: SupabaseClient) {}

  async getAllAtTime(hour: number, minute: number) {
    const response = await this.supabase
      .from("reminders")
      .select()
      .eq("hour", hour)
      .eq("minute", minute);

    console.log("Reminders: ", response);

    return response.data ?? [];
  }
}
