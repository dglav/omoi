import { fromSupabase, Post } from "./converter";
import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";
import { getCustomFeelings } from "../custom_feelings/getCustomFeelings";

type Params = {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  filterPrivate?: boolean;
};

export const getPosts = async (
  { userId, startDate, endDate, filterPrivate }: Params,
): Promise<Post[]> => {
  let query = supabase
    .from("posts")
    .select("*").eq("author_id", userId);

  if (startDate) {
    query = query.gte("date", startDate.toISOString());
  }

  if (endDate) {
    query = query.lt("date", endDate.toISOString());
  }

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
