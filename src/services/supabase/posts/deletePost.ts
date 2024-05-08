import { SupabaseDatabaseError } from "../error";
import { supabase } from "../index";

export const deletePost = async (id: string) => {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return !error ? "success" : "failure";
};
