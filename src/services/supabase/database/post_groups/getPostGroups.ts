import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";
import { getPostsByGroupId } from "../posts/getPostsByGroupId";

type Params = {
  userId: string;
  limit?: number;
  laterThan?: Date;
  filterPrivate?: boolean;
};

export const getPostGroups = async ({
  userId,
  limit,
  laterThan,
  filterPrivate,
}: Params) => {
  const query = supabase
    .from("post_groups")
    .select("id,postGroupDate:date")
    .match({ author_id: userId })
    .order("date", { ascending: false });

  if (laterThan) {
    query.gt("date", laterThan.toISOString());
  }

  if (limit) {
    query.limit(limit);
  }

  const { data: postGroups, error } = await query;
  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  const mergedPostGroupPromises = postGroups.map(async (postGroup) => {
    const posts = await getPostsByGroupId({
      userId,
      postGroupId: postGroup.id,
      filterPrivate,
    });

    return { ...postGroup, posts };
  });

  const mergedPostGroups = (await Promise.all(mergedPostGroupPromises)).filter(
    (postGroup) => postGroup.posts.length >= 1,
  );

  return mergedPostGroups;
};
