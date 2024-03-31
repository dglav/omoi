import { SupabaseDatabaseError } from "../error";
import { supabase } from "../index";

export const getUser = async (userId: string) => {
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .match({ id: userId });

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return users[0];
};
