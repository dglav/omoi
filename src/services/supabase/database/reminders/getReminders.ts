import { fromSupabase } from "./converter";
import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

type Params = {
  userId: string;
};

export const getReminders = async ({ userId }: Params) => {
  const { data: reminders, error } = await supabase
    .from("reminders")
    .select("*")
    .order("created_at")
    .eq("user_id", userId);

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return reminders.map((reminder) => {
    return fromSupabase(reminder);
  });
};
