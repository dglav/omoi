import { useQuery } from "@tanstack/react-query";

import { getPosts } from "../../services/supabase/database/posts/getPosts";
import { useGetUser } from "../userHooks/useGetUser";

type Props = {
  who: "me" | "partner";
  where?: {
    startDate?: Date;
    endDate?: Date;
  };
};

export const useGetPosts = ({ who, where }: Props) => {
  const { user } = useGetUser();
  const userId = who === "me" ? user?.id : user?.partner_user_id;

  const { data, isLoading, isError, status, isFetching } = useQuery({
    queryKey: ["posts", userId, where?.startDate, where?.endDate],
    queryFn: () => {
      if (!userId) {
        return null;
      }

      const input: Parameters<typeof getPosts>[0] = { userId };

      if (where?.startDate) {
        input["startDate"] = where.startDate;
      }

      if (where?.endDate) {
        input["endDate"] = where.endDate;
      }

      if (who === "partner") {
        input["filterPrivate"] = true;
      }

      return getPosts(input);
    },
    enabled: !!user && !!userId,
    staleTime: 10 * 1000, // 10 seconds
  });

  return { data, isLoading, isError, status, isFetching };
};
