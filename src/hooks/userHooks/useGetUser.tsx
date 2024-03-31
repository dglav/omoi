import { useQuery } from "@tanstack/react-query";

import { useSession } from "../../providers/SessionProvider";
import { getUser } from "../../services/supabase/user/getUser";

export const useGetUser = () => {
  const { session } = useSession();

  const userId = session?.user.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const user = await getUser(userId!);
      console.log(user);
      return user;
    },
    enabled: !!userId,
  });

  return { user: data, isLoading, isError };
};
