import { useQuery } from "@tanstack/react-query";

import { useSession } from "../../providers/AuthProvider";
import { getReminders } from "../../services/supabase/database/reminders/getReminders";

export const useGetReminders = () => {
  const { session } = useSession();

  const userId = session?.user.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["reminders"],
    queryFn: async () => {
      return getReminders({ userId: userId! });
    },
    enabled: !!userId,
  });

  return { data, isLoading, isError };
};
