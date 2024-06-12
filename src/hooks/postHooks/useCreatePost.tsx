import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "../../providers/AuthProvider";
import { createPost } from "../../services/supabase/database/posts/createPost";
import { useNotifyPartner } from "../pushNotificationHooks/useNotifyPartner";

type mutationParams = {
  post: {
    condition: "average" | "reallyBad" | "bad" | "good" | "reallyGood";
    feelings: string[];
    tags: string[];
    note: string;
    isPrivate: boolean;
    date: Date;
  };
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { session } = useSession();

  const { mutate: notifyPartner } = useNotifyPartner();

  const userId = session?.user.id;

  const mutation = useMutation({
    mutationFn: ({ post }: mutationParams) => {
      if (!userId) {
        throw new Error("User is not authenticated");
      }
      return createPost({ authorId: userId, ...post });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postGroups"] });

      notifyPartner({
        title: "パートナーがジャーナルを投稿しました",
        body: "共有された記録を確認してリアクションしましょう！",
      });
    },
    onError: (error): void => {
      console.error(error);
    },
  });

  return mutation;
};
