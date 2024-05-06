import { useQuery } from "@tanstack/react-query";

import { useSession } from "../../providers/SessionProvider";
import { getPostGroups } from "../../services/supabase/post_groups/getPostGroups";

export const useGetPostGroups = () => {
  const { session } = useSession();

  const userId = session?.user.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["postGroups"],
    queryFn: () => {
      if (!userId) {
        throw new Error("user is not authenticated");
      }
      return getPostGroups({ userId, limit: 10 });
    },
  });

  return { data: data ?? [], isLoading, isError };
};
