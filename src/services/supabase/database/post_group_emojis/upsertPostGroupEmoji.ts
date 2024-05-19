import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

type Params = {
  emoji: string;
  postGroupId: string;
  userId: string;
};

export const upsertPostGroupEmoji = async ({
  emoji,
  postGroupId,
  userId,
}: Params) => {
  const { data, error } = await supabase
    .from("post_group_emojis")
    .upsert({ emoji, post_group_id: postGroupId, user_id: userId })
    .select();

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return { data };
};
