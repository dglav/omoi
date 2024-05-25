import { supabase } from "..";

export const getSession = () => {
  return supabase.auth.getSession();
};
