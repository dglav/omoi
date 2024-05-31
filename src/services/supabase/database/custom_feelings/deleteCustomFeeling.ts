import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

export const deleteCustomFeeling = async (id: string) => {
  const { error } = await supabase
    .from("custom_feelings")
    .delete()
    .eq("id", id);

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return !error ? "success" : "failure";
};
