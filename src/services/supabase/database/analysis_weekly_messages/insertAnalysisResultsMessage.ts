import { format } from "@formkit/tempo";
import { supabase } from "../..";
import { SupabaseDatabaseError } from "../../error";
import { TablesInsert } from "../../../../../types/supabase";

type Props = {
  startDate: Date;
  endDate: Date;
  analyzedUserId: string;
  message: string;
};

export const insertAnalysisResultsMessage = async ({
  startDate,
  endDate,
  analyzedUserId,
  message,
}: Props) => {
  const createMessageDTO: TablesInsert<"analysis_results_weekly_messages"> = {
    start_date: format(startDate, "YYYY/MM/DD"),
    end_date: format(endDate, "YYYY/MM/DD"),
    analyzed_user_id: analyzedUserId,
    message,
  };

  const { data, error } = await supabase
    .from("analysis_weekly_messages")
    .insert([createMessageDTO])
    .select();

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return data;
};
