import { useMutation, useQueryClient } from "@tanstack/react-query";

import { upsertAnalysisResultsEmoji } from "../../services/supabase/database/analysis_results_emojis/upsertAnalysisResultsEmoji";
import { useNotifyPartner } from "../pushNotificationHooks/useNotifyPartner";
import { useGetUser } from "../userHooks/useGetUser";

type Params = {
  user: "me" | "partner";
};

type mutationParams = {
  startDate: Date;
  endDate: Date;
  emoji: string;
};

export const useUpsertAnalysisResultsEmoji = ({ user }: Params) => {
  const queryClient = useQueryClient();
  const { mutate: notifyPartner } = useNotifyPartner();

  const { user: authenticatedUser } = useGetUser();
  const authenticatedUserId = authenticatedUser?.id;
  const partnerUserId = authenticatedUser?.partner_user_id;
  const userId = user === "me" ? authenticatedUserId : partnerUserId;

  const mutation = useMutation({
    mutationFn: ({ startDate, endDate, emoji }: mutationParams) => {
      if (!userId) {
        throw new Error("ユーザーが存在しない");
      }

      return upsertAnalysisResultsEmoji({ startDate, endDate, emoji, userId });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "analysisResultsEmojis",
          userId,
          variables.startDate,
          variables.endDate,
        ],
      });

      notifyPartner({
        title: "パートナーが分析にリアクションしました",
        body: "パートナーのリアクションをチェックしよう",
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
};
