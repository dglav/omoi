import { useQuery } from "@tanstack/react-query";

import { useGetUser } from "./useGetUser";
import { getUser } from "../../services/supabase/database/user/getUser";

export const useGetPartner = () => {
  const { user } = useGetUser();

  const partnerId = user?.partner_user_id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", partnerId],
    queryFn: async () => {
      return getUser(partnerId!);
    },
    enabled: !!partnerId,
  });

  return { user: data, isLoading, isError };
};
