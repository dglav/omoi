import { useQuery } from "@tanstack/react-query";
import { getAnalysisResultsEmojis } from "../../services/supabase/database/analysis_results_emojis/getAnalysisResultsEmojis";
import { useGetUser } from "../userHooks/useGetUser";

type Params = {
  user: "me" | "partner";
  startDate: Date;
  endDate: Date;
};

export const useGetAnalysisResultsEmojis = (
  { user, startDate, endDate }: Params,
) => {
  const { user: authenticatedUser } = useGetUser();
  const authenticatedUserId = authenticatedUser?.id;
  const partnerUserId = authenticatedUser?.partner_user_id;

  const userId = user === "me" ? authenticatedUserId : partnerUserId;

  const { data: analysisResultsEmojis, isLoading } = useQuery({
    queryKey: ["analysisResultsEmojis", userId, startDate, endDate],
    queryFn: () => {
      if (!userId) {
        return [];
      }

      return getAnalysisResultsEmojis({ userId, startDate, endDate });
    },
    enabled: !!userId,
  });

  return { analysisResultsEmojis, isLoading };
};
