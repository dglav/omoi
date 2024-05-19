import { signUp as signUpWithSupabase } from "../services/supabase/signUp";
import { AuthError } from "../utils/errors";

export const useSignUp = () => {
  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { data, error } = await signUpWithSupabase({ email, password });

    if (error) {
      throw new AuthError(error);
    }

    return { data };
  };

  return { signUp };
};
