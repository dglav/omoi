import { SupabaseDatabaseError } from "../error";
import { supabase } from "../index";

export const deletePostGroupEmoji = async (
  userId: string,
  postGroupId: string,
) => {
  const { error } = await supabase
    .from("post_group_emojis")
    .delete()
    .match({ user_id: userId, post_group_id: postGroupId });

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return !error ? "success" : "failure";
};
