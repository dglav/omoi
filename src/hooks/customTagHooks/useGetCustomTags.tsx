import { useQuery } from "@tanstack/react-query";

import { useSession } from "../../providers/AuthProvider";
import { getCustomTags } from "../../services/supabase/database/custom_tags/getCustomTags";

export const useGetCustomTags = () => {
  const { session } = useSession();

  const userId = session?.user.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["customTags"],
    queryFn: async () => {
      return getCustomTags({ userId: userId! });
    },
    enabled: !!userId,
  });

  return { data, isLoading, isError };
};
