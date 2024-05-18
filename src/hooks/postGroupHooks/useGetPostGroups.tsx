import { useQuery } from "@tanstack/react-query";

import { useSession } from "../../providers/SessionProvider";
import { getPostGroups } from "../../services/supabase/post_groups/getPostGroups";

type Props = {
  limit?: number;
  laterThan?: Date;
};

export const useGetPostGroups = ({ limit, laterThan }: Props) => {
  const { session } = useSession();

  const userId = session?.user.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["postGroups", limit, laterThan],
    queryFn: () => {
      if (!userId) {
        throw new Error("user is not authenticated");
      }
      return getPostGroups({
        userId,
        limit,
        laterThan,
      });
    },
  });

  return { data: data ?? [], isLoading, isError };
};
