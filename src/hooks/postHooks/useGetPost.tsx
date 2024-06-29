import { useQuery } from "@tanstack/react-query";

import { useSession } from "../../providers/AuthProvider";
import { getPost } from "../../services/supabase/database/posts/getPost";

export const useGetPost = (id?: string) => {
  const { session } = useSession();

  const userId = session?.user.id;

  const { data, isLoading, isError, status } = useQuery({
    queryKey: ["post", id],
    queryFn: () => {
      if (!userId) {
        throw new Error("user is not authenticated");
      }

      if (!id) {
        throw new Error("post id is not specified");
      }

      return getPost({ id, userId });
    },
    enabled: !!id,
    staleTime: Infinity,
  });

  return { data, isLoading, isError, status };
};
