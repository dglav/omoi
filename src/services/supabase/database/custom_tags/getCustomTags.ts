import { fromSupabase } from "./converter";
import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

type Params = {
  userId: string;
};

export const getCustomTags = async ({ userId }: Params) => {
  const { data: customTags, error } = await supabase
    .from("custom_tags")
    .select("*")
    .order("created_at")
    .eq("user_id", userId);

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  const convertedTags = customTags.map((customTag) => {
    return fromSupabase(customTag);
  });

  return convertedTags;
};
