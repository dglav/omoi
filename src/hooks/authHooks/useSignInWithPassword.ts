import { signInWithPassword } from "../../services/supabase/auth/signInWithPassword";

export const useSignInWithPassword = () => {
  return { signInWithPassword };
};
