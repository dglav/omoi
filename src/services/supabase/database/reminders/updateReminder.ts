import { fromSupabase, toUpdateDTO } from "./converter";
import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

type Params = {
  id: string;
  hour: number;
  minute: number;
};

export const updateReminder = async (reminder: Params) => {
  const { data: customFeelings, error } = await supabase
    .from("reminders")
    .update(toUpdateDTO(reminder))
    .eq("id", reminder.id)
    .select();

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return fromSupabase(customFeelings[0]);
};
