import { useQuery } from "@tanstack/react-query";

import { getPostGroups } from "../../services/supabase/database/post_groups/getPostGroups";
import { useGetUser } from "../userHooks/useGetUser";

type Props = {
  who: "me" | "partner";
  options?: {
    limit?: number;
    laterThan?: Date;
  };
};

export const useGetPostGroups = ({ who, options }: Props) => {
  const { user } = useGetUser();

  const userId = who === "me" ? user?.id : user?.partner_user_id;

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
