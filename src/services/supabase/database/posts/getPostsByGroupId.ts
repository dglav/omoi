import { fromSupabase, Post } from "./converter";
import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";
import { getCustomFeelings } from "../custom_feelings/getCustomFeelings";

type Params = {
  userId: string;
  postGroupId: string;
  filterPrivate?: boolean;
};

export const getPostsByGroupId = async (
  { userId, postGroupId, filterPrivate }: Params,
): Promise<Post[]> => {
  const query = supabase
    .from("posts")
    .select("*")
    .match({
      post_group_id: postGroupId,
    })
    .order("date", { ascending: false });

  if (filterPrivate) {
    query.is("is_private", false);
  }

  const { data: posts, error } = await query;

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  const allCustomFeelings = await getCustomFeelings({ userId });
  const allCustomFeelingsMap = allCustomFeelings.reduce<Map<string, any>>(
    (map, currentFeeling) => {
      return map.set(currentFeeling.id, currentFeeling);
    },
    new Map(),
  );

  return posts.map((post) => fromSupabase(post, allCustomFeelingsMap));
};
