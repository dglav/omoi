import { fromSupabase, toCreateDTO } from "./converter";
import { supabase } from "../..";
import { SupabaseDatabaseError } from "../../error";

type Params = {
  hour: number;
  minute: number;
};

export const createReminder = async (
  // eslint-disable-next-line prettier/prettier
  reminder: Params,
) => {
  const payload = toCreateDTO(reminder);

  const { data, error } = await supabase
    .from("reminders")
    .insert(payload)
    .select();

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  if (!data.length) {
    throw new Error("Error in retrieving custom_feelings data");
  }

  return fromSupabase(data[0]);
};
