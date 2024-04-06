import { useMutation } from "@tanstack/react-query";

import { useSession } from "../../providers/SessionProvider";
import { createPost } from "../../services/supabase/posts/createPost";

type mutationParams = {
  post: {
    condition: string;
    feelings: string[];
    tags: string[];
    note: string;
    date: Date;
  };
};

export const useCreatePost = () => {
  const { session } = useSession();
  const userId = session?.user.id;

  const mutation = useMutation({
    mutationFn: ({ post }: mutationParams) => {
      if (!userId) {
        throw new Error("User is not authenticated");
      }
      return createPost({ authorId: userId, ...post });
    },
  });

  return mutation;
};
