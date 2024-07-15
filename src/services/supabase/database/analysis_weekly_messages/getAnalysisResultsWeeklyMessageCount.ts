import { format } from "@formkit/tempo";
import { supabase } from "../..";
import { SupabaseDatabaseError } from "../../error";

type Props = {
  startDate: Date;
  endDate: Date;
  analyzedUserId: string;
};

export const getAnalysisResultsWeeklyMessageCount = async (
  { startDate, endDate, analyzedUserId }: Props,
) => {
  const { count, error } = await supabase
    .from("analysis_results_weekly_messages")
    .select("*", { count: "exact", head: true })
    .match({
      start_date: format(startDate, "YYYY/MM/DD"),
      end_date: format(endDate, "YYYY/MM/DD"),
      analyzed_user_id: analyzedUserId,
    });

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return { count };
};
