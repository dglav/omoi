import { SupabaseDatabaseError } from "../error";
import { supabase } from "../index";

type Props = {
  authorId: string;
  condition: "average" | "reallyBad" | "bad" | "good" | "reallyGood";
  feelings: string[];
  tags: string[];
  note: string;
  date: Date;
};

export const createPost = async ({
  authorId,
  condition,
  feelings,
  tags,
  note,
  date,
}: Props) => {
  const { data, error } = await supabase.rpc("create_new_post", {
    author_id: authorId,
    condition,
    feelings,
    tags,
    note,
    date: date.toISOString(),
  });

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return data;
};
