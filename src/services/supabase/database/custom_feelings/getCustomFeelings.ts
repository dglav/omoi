import { fromSupabase } from "./converter";
import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

type Params = {
  userId: string;
};

export const getCustomFeelings = async ({ userId }: Params) => {
  const { data: customFeelings, error } = await supabase
    .from("custom_feelings")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  const convertedFeelings = customFeelings.map((customFeeling) => {
    return fromSupabase(customFeeling);
  });

  return convertedFeelings;
};
