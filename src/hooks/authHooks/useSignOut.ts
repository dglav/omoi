import { signOut } from "../../services/supabase/auth/signOut";

export const useSignOut = () => {
  return { signOut };
};
