import { useQuery } from "@tanstack/react-query";

import { useSession } from "../../providers/AuthProvider";
import { getPostGroupMessages } from "../../services/supabase/database/post_group_messages/getPostGroupMessages";

export const useGetPostGroupMessages = ({
  postGroupId,
}: {
  postGroupId?: string;
}) => {
  const { session } = useSession();

  const userId = session?.user.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["postGroupMessages", postGroupId],
    queryFn: () => {
      if (!userId) {
        throw new Error("user is not authenticated");
      }

      if (!postGroupId) {
        throw new Error("postGroupId is not specified");
      }

      return getPostGroupMessages({ postGroupId });
    },
    enabled: !!postGroupId,
    refetchInterval: 15000,
  });

  return { data, isLoading, isError };
};
