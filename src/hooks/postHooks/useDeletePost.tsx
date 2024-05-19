import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "../../providers/AuthProvider";
import { deletePost } from "../../services/supabase/posts/deletePost";

type mutationParams = {
  id: string;
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const { session } = useSession();
  const userId = session?.user.id;

  const mutation = useMutation({
    mutationFn: ({ id }: mutationParams) => {
      if (!userId) {
        throw new Error("User is not authenticated");
      }
      return deletePost(id);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["postGroups"] });
      queryClient.invalidateQueries({ queryKey: ["post", variables.id] });
    },
  });

  return mutation;
};
