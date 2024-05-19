import { supabase } from "..";

export const signOut = () => {
  supabase.auth.signOut();
};
