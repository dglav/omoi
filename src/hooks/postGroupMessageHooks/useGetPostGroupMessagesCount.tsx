import { useQuery } from "@tanstack/react-query";

import { useSession } from "../../providers/AuthProvider";
import { getPostGroupMessageCount } from "../../services/supabase/post_group_messages/getPostGroupMessageCount";

export const useGetPostGroupMessageCount = ({
  postGroupId,
}: {
  postGroupId?: string;
}) => {
  const { session } = useSession();

  const userId = session?.user.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["postGroupMessages", postGroupId, "count"],
    queryFn: () => {
      if (!userId) {
        throw new Error("user is not authenticated");
      }

      if (!postGroupId) {
        throw new Error("postGroupId is not specified");
      }

      return getPostGroupMessageCount({ postGroupId });
    },
    enabled: !!postGroupId,
    refetchInterval: 15000,
  });

  return { data, isLoading, isError };
};
