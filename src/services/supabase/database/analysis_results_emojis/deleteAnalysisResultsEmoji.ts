import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

export const deleteAnalysisResultsEmoji = async (id: string) => {
  const { error } = await supabase.from("analysis_results_emojis").delete().eq(
    "id",
    id,
  );

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return !error ? "success" : "failure";
};
