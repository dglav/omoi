import { useQuery } from "@tanstack/react-query";

import { useSession } from "../../providers/SessionProvider";
import { getPostGroupEmojis } from "../../services/supabase/post_group_emojis/getPostGroupEmojis";

export type PostGroupEmoji = {
  created_at: string;
  emoji: string;
  id: number;
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
  });

  return { data, isLoading, isError };
};
