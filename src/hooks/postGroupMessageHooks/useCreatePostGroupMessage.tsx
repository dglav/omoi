import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "../../providers/SessionProvider";
import { insertPostGroupMessage } from "../../services/supabase/post_group_messages/insertPostGroupMessages";

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
