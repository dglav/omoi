import { UserEntity } from "./types";
import { SupabaseDatabaseError } from "../error";
import { supabase } from "../index";

export const updateUser = async (
  userId: string,
  userData: Partial<Omit<UserEntity, "id">>,
) => {
  const { data: users, error } = await supabase
    .from("users")
    .update(userData)
    .eq("id", userId)
    .select();

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return users[0];
};
