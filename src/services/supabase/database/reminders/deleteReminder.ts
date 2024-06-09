import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

export const deleteReminder = async (id: string) => {
  const { error } = await supabase.from("reminders").delete().eq("id", id);

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return !error ? "success" : "failure";
};
