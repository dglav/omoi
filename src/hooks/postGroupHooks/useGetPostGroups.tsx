import { useQuery } from "@tanstack/react-query";

import { useSession } from "../../providers/SessionProvider";
import { getPostGroups } from "../../services/supabase/post_groups/getPostGroups";

type Props = {
  user: "me" | "partner";
  options?: {
    limit?: number;
    laterThan?: Date;
  };
};

export const useGetPostGroups = ({ user, options }: Props) => {
  const { session } = useSession();

  const userId = user === "me" ? session?.user.id : "session?.user.partnerId";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["postGroups", userId, options?.limit, options?.laterThan],
    queryFn: () => {
      if (!userId) {
        throw new Error("user is not authenticated");
      }

      const input: Parameters<typeof getPostGroups>[0] = { userId };

      if (options?.limit) {
        input["limit"] = options.limit;
      }

      if (options?.laterThan) {
        input["laterThan"] = options.laterThan;
      }

      return getPostGroups(input);
    },
  });

  return { data: data ?? [], isLoading, isError };
};
