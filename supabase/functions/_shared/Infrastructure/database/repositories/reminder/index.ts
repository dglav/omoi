import type { SupabaseClient } from "https://esm.sh/v135/@supabase/supabase-js@2.43.4/dist/module/index.js";
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
