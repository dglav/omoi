import { type AnalysisResultsEmoji, fromSupabase } from "./converter";
import { convertStartEndDateToDateSpan } from "./utils";
import { Tables } from "../../../../../types/supabase";
import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

type Params = {
  userId: string;
  startDate: Date;
  endDate: Date;
};

export const getAnalysisResultsEmojis = async ({
  userId,
  startDate,
  endDate,
}: Params): Promise<AnalysisResultsEmoji[]> => {
  let emojiEntities: Tables<"analysis_results_emojis">[] = [];
  const dateSpan = convertStartEndDateToDateSpan(startDate, endDate);

  const { data, error } = await supabase
    .from("analysis_results_emojis")
    .select("*")
    .eq("user_id", userId)
    .eq("date_span", dateSpan);

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  emojiEntities = data;

  return emojiEntities.map((emoji) => fromSupabase(emoji));
};
