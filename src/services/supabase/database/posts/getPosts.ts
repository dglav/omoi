import { fromSupabase, Post } from "./converter";
import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

type Params = {
  where?: {
    startDate?: Date;
    endDate?: Date;
  }
};

export const getPosts = async ({ where }: Params): Promise<Post[]> => {
  let query = supabase
    .from("posts")
    .select("*")

  if (where?.startDate) {
    query = query.gte('date', where.startDate.toISOString())

  }

  if (where?.endDate) {
    query = query.lt('date', where.endDate.toISOString())
  }


  const { data: posts, error } = await query;

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return posts.map(post => fromSupabase(post));
};
