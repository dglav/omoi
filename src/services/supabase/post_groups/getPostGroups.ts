import { SupabaseDatabaseError } from "../error";
import { supabase } from "../index";

type Params = {
  userId: string;
  limit: number;
};

export const getPostGroups = async ({ userId, limit }: Params) => {
  const { data: postGroups, error } = await supabase
    .from("post_groups")
    .select("id,postGroupDate:date")
    .match({ author_id: userId })
    .order("date", { ascending: false })
    .limit(limit);

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  const mergedPostGroupPromises = postGroups.map(async (postGroup) => {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .match({ post_group_id: postGroup.id })
      .order("date", { ascending: false });

    if (error) {
      throw new SupabaseDatabaseError(error);
    }

    const convertedPosts = posts.map((post) => {
      return { ...post, date: new Date(post.date) };
    });

    return { ...postGroup, posts: convertedPosts };
  });

  const mergedPostGroups = (await Promise.all(mergedPostGroupPromises)).filter(
    (postGroup) => postGroup.posts.length >= 1,
  );

  return mergedPostGroups;
};
