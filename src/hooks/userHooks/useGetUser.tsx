import { useQuery } from "@tanstack/react-query";

import { useSession } from "../../providers/AuthProvider";
import { getUser } from "../../services/supabase/user/getUser";

export const useGetUser = () => {
  const { session } = useSession();

  const userId = session?.user.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      return getUser(userId!);
    },
    enabled: !!userId,
  });

  return { user: data, isLoading, isError };
};
