import { convertStartEndDateToDateSpan } from "./utils";
import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

type Params = {
  emoji: string;
  startDate: Date;
  endDate: Date;
  userId: string;
};

export const upsertAnalysisResultsEmoji = async ({
  emoji,
  startDate,
  endDate,
  userId,
}: Params) => {
  const dateSpan = convertStartEndDateToDateSpan(startDate, endDate);

  const { data, error } = await supabase
    .from("analysis_results_emojis")
    .upsert({ emoji, date_span: dateSpan, user_id: userId })
    .select();

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return { data };
};
