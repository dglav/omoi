import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "../../providers/AuthProvider";
import { upsertPostGroupEmoji } from "../../services/supabase/database/post_group_emojis/upsertPostGroupEmoji";

type mutationParams = {
  postGroupId: string;
  emoji: string;
};

export const useUpsertGroupPostEmoji = () => {
  const queryClient = useQueryClient();
  const { session } = useSession();
  const userId = session?.user.id;

  const mutation = useMutation({
    mutationFn: ({ postGroupId, emoji }: mutationParams) => {
      if (!userId) {
        throw new Error("User is not authenticated");
      }
      return upsertPostGroupEmoji({ userId, postGroupId, emoji });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["postGroupEmojis", variables.postGroupId],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
};
