import { fromSupabase, Post } from "./converter";
import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

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

  return posts.map((post) => fromSupabase(post));
};
