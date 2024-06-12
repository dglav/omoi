import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "../../providers/AuthProvider";
import { insertPostGroupMessage } from "../../services/supabase/database/post_group_messages/insertPostGroupMessages";
import { useNotifyPartner } from "../pushNotificationHooks/useNotifyPartner";

type mutationParams = {
  postGroupId: string;
  message: string;
};

type Props = {
  onSuccess?: () => void;
};

export const useCreatePostGroupMessage = ({ onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const { session } = useSession();
  const userId = session?.user.id;

  const { mutate: notifyPartner } = useNotifyPartner();

  const mutation = useMutation({
    mutationFn: ({ postGroupId, message }: mutationParams) => {
      if (!userId) {
        throw new Error("User is not authenticated");
      }
      return insertPostGroupMessage({ userId, postGroupId, message });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["postGroupMessages", variables.postGroupId],
      });

      notifyPartner({
        title: "パートナーがコメントしました",
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
