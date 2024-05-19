import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "../../providers/AuthProvider";
import { deletePostGroupEmoji } from "../../services/supabase/post_group_emojis/deletePostGroupEmoji";

type mutationParams = {
  postGroupId: string;
};

export const useDeletePostGroupEmoji = () => {
  const queryClient = useQueryClient();
  const { session } = useSession();
  const userId = session?.user.id;

  const mutation = useMutation({
    mutationFn: ({ postGroupId }: mutationParams) => {
      if (!userId) {
        throw new Error("User is not authenticated");
      }
      return deletePostGroupEmoji(userId, postGroupId);
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
