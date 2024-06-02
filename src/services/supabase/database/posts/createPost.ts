import { SupabaseDatabaseError } from "../../error";
import { supabase } from "../../index";

type Props = {
  authorId: string;
  condition: "average" | "reallyBad" | "bad" | "good" | "reallyGood";
  feelings: string[];
  tags: string[];
  note: string;
  isPrivate: boolean;
  date: Date;
};

export const createPost = async ({
  authorId,
  condition,
  feelings,
  tags,
  note,
  isPrivate,
  date,
}: Props) => {
  const { data, error } = await supabase.rpc("create_new_post_v2", {
    author_id: authorId,
    condition,
    feelings,
    tags,
    note,
    is_private: isPrivate,
    date: date.toISOString(),
  });

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  return data;
};
