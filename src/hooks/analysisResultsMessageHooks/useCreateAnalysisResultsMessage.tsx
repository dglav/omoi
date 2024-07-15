import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "../../providers/AuthProvider";
import { insertPostGroupMessage } from "../../services/supabase/database/post_group_messages/insertPostGroupMessages";
import { useNotifyPartner } from "../pushNotificationHooks/useNotifyPartner";
import { insertAnalysisResultsMessage } from "../../services/supabase/database/analysis_weekly_messages/insertAnalysisResultsMessage";

type mutationParams = {
  analyzedUserId: string;
  startDate: Date;
  endDate: Date;
  message: string;
};

type Props = {
  onSuccess?: () => void;
};

export const useCreateAnalysisResultsMessage = ({ onSuccess }: Props) => {
  const queryClient = useQueryClient();

  const { mutate: notifyPartner } = useNotifyPartner();

  const mutation = useMutation({
    mutationFn: (
      { analyzedUserId, startDate, endDate, message }: mutationParams,
    ) => {
      return insertAnalysisResultsMessage({
        analyzedUserId,
        startDate,
        endDate,
        message,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "analysisResultsMessages",
          variables.analyzedUserId,
          variables.startDate,
          variables.endDate,
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
