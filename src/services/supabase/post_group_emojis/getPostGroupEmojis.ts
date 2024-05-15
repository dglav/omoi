import { SupabaseDatabaseError } from "../error";
import { supabase } from "../index";

type Params = {
  postGroupId: string;
};

export const getPostGroupEmojis = async ({ postGroupId }: Params) => {
  const { data: postGroupEmojis, error } = await supabase
    .from("post_group_emojis")
    .select("*")
    .eq("post_group_id", postGroupId);

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return { postGroupEmojis };
};
