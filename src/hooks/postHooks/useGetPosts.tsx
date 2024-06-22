import { useQuery } from "@tanstack/react-query";

import { useSession } from "../../providers/AuthProvider";
import { getPosts } from "../../services/supabase/database/posts/getPosts";

type Props = {
  where?: {
    startDate?: Date;
    endDate?: Date;
  }
}

export const useGetPosts = ({ where }: Props) => {
  const { session } = useSession();

  const userId = session?.user.id;

  const { data, isLoading, isError, status } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      if (!userId) {
        throw new Error("user is not authenticated");
      }

      return getPosts({ where });
    },
    staleTime: Infinity,
  });

  return { data, isLoading, isError, status };
};
