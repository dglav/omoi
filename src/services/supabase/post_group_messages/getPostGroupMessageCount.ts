import { supabase } from "..";
import { SupabaseDatabaseError } from "../error";

type Props = {
  postGroupId: string;
};

export const getPostGroupMessageCount = async ({ postGroupId }: Props) => {
  const { count, error } = await supabase
    .from("post_group_messages")
    .select("*", { count: "exact", head: true })
    .match({ post_group_id: postGroupId });

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return { count };
};
