import { fromSupabase, Post } from "./converter";
import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";
import { getCustomFeelings } from "../custom_feelings/getCustomFeelings";

type Params = {
  id: string;
  userId: string;
};

export const getPost = async ({ id, userId }: Params): Promise<Post> => {
  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select("*")
    .match({ id });

  if (postsError) {
    throw new SupabaseDatabaseError(postsError);
  }

  const post = posts[0];

  const allCustomFeelings = await getCustomFeelings({ userId });
  const allCustomFeelingsMap = allCustomFeelings.reduce<Map<string, any>>(
    (map, currentFeeling) => {
      return map.set(currentFeeling.id, currentFeeling);
    },
    new Map(),
  );

  return fromSupabase(post, allCustomFeelingsMap);
};
