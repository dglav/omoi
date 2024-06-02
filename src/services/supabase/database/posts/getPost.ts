import { fromSupabase, Post } from "./converter";
import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

type Params = {
  id: string;
};

export const getPost = async ({ id }: Params): Promise<Post> => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .match({ id });

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  const post = posts[0];

  return fromSupabase(post);
};
