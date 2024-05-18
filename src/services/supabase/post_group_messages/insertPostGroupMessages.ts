import { supabase } from "..";
import { SupabaseDatabaseError } from "../error";

type Props = {
  userId: string;
  postGroupId: string;
  message: string;
};

export const insertPostGroupMessage = async ({
  userId,
  postGroupId,
  message,
}: Props) => {
  const { data, error } = await supabase
    .from("post_group_messages")
    .insert([{ user_id: userId, post_group_id: postGroupId, message }])
    .select();

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return data;
};
