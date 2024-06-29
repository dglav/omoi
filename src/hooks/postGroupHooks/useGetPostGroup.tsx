import { useQuery } from "@tanstack/react-query";

import { useSession } from "../../providers/AuthProvider";
import { getPostGroup } from "../../services/supabase/database/post_groups/getPostGroup";

export const useGetPostGroup = (date: string) => {
  const { session } = useSession();

  const userId = session?.user.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["postGroup", date],
    queryFn: () => {
      if (!userId) {
        throw new Error("user is not authenticated");
      }
      return getPostGroup({ userId, date });
    },
    refetchInterval: 1000 * 10,
  });

  return { data, isLoading, isError };
};
