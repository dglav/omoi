import type { SupabaseClient } from "@supabase/supabase-js";

export class UserRepository {
  constructor(private supabase: SupabaseClient) {}

  async getAll() {
    const response = await this.supabase.from("users").select();

    console.log("all users: ", response);

    return response.data ?? [];
  }

  async getUsersFromIdList(userIds: string[]) {
    const response = await this.supabase
      .from("users")
      .select()
      .in("id", userIds);

    console.log("users from list", response);

    return response.data ?? [];
  }
}
