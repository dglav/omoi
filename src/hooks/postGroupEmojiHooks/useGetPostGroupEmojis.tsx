import { useQuery } from "@tanstack/react-query";

import { useSession } from "../../providers/AuthProvider";
import { getPostGroupEmojis } from "../../services/supabase/database/post_group_emojis/getPostGroupEmojis";

export type PostGroupEmoji = {
  created_at: string;
  emoji: string;
  post_group_id: string;
  user_id: string;
};

export const useGetPostGroupEmojis = (
  postGroupId?: string,
): {
  data: { postGroupEmojis: PostGroupEmoji[] } | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const { session } = useSession();

  const userId = session?.user.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["postGroupEmojis", postGroupId],
    queryFn: () => {
      if (!userId) {
        throw new Error("user is not authenticated");
      }

      if (!postGroupId) {
        throw new Error("post group id is not specified");
      }

      return getPostGroupEmojis({ postGroupId });
    },
    refetchInterval: 1000 * 10,
  });

  return { data, isLoading, isError };
};
