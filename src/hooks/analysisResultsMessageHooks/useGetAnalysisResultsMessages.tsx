import { useQuery } from "@tanstack/react-query";

import { getAnalysisResultsWeeklyMessages } from "../../services/supabase/database/analysis_weekly_messages/getAnalysisResultsWeeklyMessages";
import { ChatMessage } from "../../domain/ChatMessage";

type Props = {
  analyzedUserId: string;
  startDate: Date;
  endDate: Date;
};

export const useGetAnalysisResultsMessages = ({
  analyzedUserId,
  startDate,
  endDate,
}: Props): {
  messages: ChatMessage[];
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "analysisResultsMessages",
      analyzedUserId,
      startDate,
      endDate,
    ],
    queryFn: () => {
      return getAnalysisResultsWeeklyMessages({
        analyzedUserId,
        startDate,
        endDate,
      });
    },
    refetchInterval: 10000,
  });

  return { messages: data?.messages ?? [], isLoading, isError };
};
