import { useQuery } from "@tanstack/react-query";

import { getAnalysisResultsWeeklyMessageCount } from "../../services/supabase/database/analysis_weekly_messages/getAnalysisResultsWeeklyMessageCount";

type Props = {
  analyzedUserId?: string;
  startDate: Date;
  endDate: Date;
};

export const useGetAnalysisResultsMessageCount = ({
  analyzedUserId,
  startDate,
  endDate,
}: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "analysisResultsMessages",
      analyzedUserId,
      startDate,
      endDate,
      "count",
    ],
    queryFn: () => {
      return getAnalysisResultsWeeklyMessageCount({
        analyzedUserId: analyzedUserId!,
        startDate,
        endDate,
      });
    },
    enabled: !!analyzedUserId,
    refetchInterval: 10000,
  });

  return { data, isLoading, isError };
};
