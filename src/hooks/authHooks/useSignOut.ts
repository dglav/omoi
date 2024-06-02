import { useQueryClient } from "@tanstack/react-query";

import { signOut } from "../../services/supabase/auth/signOut";

export const useSignOut = () => {
  const queryClient = useQueryClient();

  const handleSignOut = () => {
    signOut();
    queryClient.clear();
  };

  return { signOut: handleSignOut };
};
