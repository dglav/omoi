import { supabase } from "..";

export const signInWithPassword = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return supabase.auth.signInWithPassword({ email, password });
};
