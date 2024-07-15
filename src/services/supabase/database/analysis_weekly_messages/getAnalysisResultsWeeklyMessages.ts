import { format, parse } from "@formkit/tempo";

import { supabase } from "../..";
import { SupabaseDatabaseError } from "../../error";

type Message = {
  id: string;
  authorId: string;
  message: string;
  createdAt: Date;
};

type Props = {
  startDate: Date;
  endDate: Date;
  analyzedUserId: string;
};

export const getAnalysisResultsWeeklyMessages = async ({
  startDate,
  endDate,
  analyzedUserId,
}: Props): Promise<{ messages: Message[] }> => {
  const { data: messages, error } = await supabase
    .from("analysis_results_weekly_messages")
    .select("*")
    .match({
      start_date: format(startDate, "YYYY/MM/DD"),
      end_date: format(endDate, "YYYY/MM/DD"),
      analyzed_user_id: analyzedUserId,
    });

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  const convertedMessages: Message[] = messages.map((message) => ({
    id: message.id,
    message: message.message,
    authorId: message.author_id,
    createdAt: parse(message.created_at),
  }));

  return { messages: convertedMessages };
};
