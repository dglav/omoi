import { SupabaseDatabaseError } from "../error";
import { supabase } from "../index";

type Params = {
  id: string;
};

export const getPost = async ({ id }: Params) => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .match({ id });

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  const post = posts[0];

  return { ...post, date: new Date(post.date) };
};
