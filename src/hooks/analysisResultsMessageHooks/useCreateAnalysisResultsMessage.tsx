import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNotifyPartner } from "../pushNotificationHooks/useNotifyPartner";
import { insertAnalysisResultsMessage } from "../../services/supabase/database/analysis_weekly_messages/insertAnalysisResultsMessage";

type mutationParams = {
  message: string;
};

type Props = {
  analyzedUserId: string;
  startDate: Date;
  endDate: Date;
  onSuccess?: () => void;
};

export const useCreateAnalysisResultsMessage = (
  { analyzedUserId, startDate, endDate, onSuccess }: Props,
) => {
  const queryClient = useQueryClient();

  const { mutate: notifyPartner } = useNotifyPartner();

  const mutation = useMutation({
    mutationFn: (
      { message }: mutationParams,
    ) => {
      return insertAnalysisResultsMessage({
        analyzedUserId,
        startDate,
        endDate,
        message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "analysisResultsMessages",
          analyzedUserId,
          startDate,
          endDate,
        ],
      });

      notifyPartner({
        title: "パートナーが分析にコメントしました",
        body: "コメントの内容を確認してみよう",
      });

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
};
