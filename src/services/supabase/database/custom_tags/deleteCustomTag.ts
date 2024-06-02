import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

export const deleteCustomTag = async (id: string) => {
  const { error } = await supabase.from("custom_tags").delete().eq("id", id);

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return !error ? "success" : "failure";
};
