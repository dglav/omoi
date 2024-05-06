import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "../../providers/SessionProvider";
import { editPost } from "../../services/supabase/posts/editPost";

type mutationParams = {
  post: {
    id: string;
    condition: "average" | "reallyBad" | "bad" | "good" | "reallyGood";
    feelings: string[];
    tags: string[];
    note: string;
    date: Date;
  };
};

export const useEditPost = () => {
  const queryClient = useQueryClient();
  const { session } = useSession();
  const userId = session?.user.id;

  const mutation = useMutation({
    mutationFn: ({ post }: mutationParams) => {
      if (!userId) {
        throw new Error("User is not authenticated");
      }
      return editPost({ authorId: userId, ...post });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["postGroups"] });
      queryClient.invalidateQueries({ queryKey: ["post", variables.post.id] });
    },
  });

  return mutation;
};
