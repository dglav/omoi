import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

type Params = {
  userId: string;
  date?: string;
};

export const getPostGroup = async ({ userId, date }: Params) => {
  const { data: postGroups, error: postGroupError } = await supabase
    .from("post_groups")
    .select("id,postGroupDate:date")
    .match({ author_id: userId, date })
    .order("date", { ascending: false })
    .limit(1);

  if (postGroupError) {
    throw new SupabaseDatabaseError(postGroupError);
  }

  const postGroup = postGroups[0];

  const { data: posts, error: postError } = await supabase
    .from("posts")
    .select("*")
    .match({ post_group_id: postGroup.id })
    .order("date", { ascending: false });

  if (postError) {
    throw new SupabaseDatabaseError(postError);
  }

  const convertedPosts = posts.map((post) => {
    return { ...post, date: new Date(post.date) };
  });

  return { ...postGroup, posts: convertedPosts };
};
