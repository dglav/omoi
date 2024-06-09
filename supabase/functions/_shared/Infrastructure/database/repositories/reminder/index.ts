import type { SupabaseClient } from "https://esm.sh/v135/@supabase/supabase-js@2.43.4/dist/module/index.js";

export class ReminderRepository {
  constructor(private supabase: SupabaseClient) {}

  getAllAtTime(hour: number, minute: number) {
    return this.supabase.from("reminders").select().match({
      hour,
      minute,
    });
  }
}
