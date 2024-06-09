import type { SupabaseClient } from "https://esm.sh/v135/@supabase/supabase-js@2.43.4/dist/module/index.js";

export class UserRepository {
  constructor(private supabase: SupabaseClient) {}

  getUsersFromIdList(userIds: string[]) {
    return this.supabase.from("users").select().in("id", userIds);
  }
}
