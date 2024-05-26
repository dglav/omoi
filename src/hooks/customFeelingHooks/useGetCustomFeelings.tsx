import { useQuery } from "@tanstack/react-query";

import { useSession } from "../../providers/AuthProvider";
import { getCustomFeelings } from "../../services/supabase/database/custom_feelings/getCustomFeelings";

export const useGetCustomFeelings = () => {
  const { session } = useSession();

  const userId = session?.user.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["customFeelings"],
    queryFn: async () => {
      return getCustomFeelings({ userId: userId! });
    },
    enabled: !!userId,
  });

  return { data, isLoading, isError };
};
